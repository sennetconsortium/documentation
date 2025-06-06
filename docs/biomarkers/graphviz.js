
// SimpleKnowledgeVisualizationTesting.html Version 1.0 Copyright 2023 DBMI, University of Pittsburgh, see repository at: https://github.com/dbmi-pitt/UMLS-Graph for license details.

// BEGIN Setup and Initialization
// set various visualization parameters and initiate the svg, zoom, etc.
var i = 0, j = 0, k = 0,
    duration = 100,
    current = d3.zoomIdentity;

var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var h = window.innerHeight  || document.documentElement.clientHeight  || document.body.clientHeight;

var svg = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h);

var zoom = svg.call(d3.zoom()
    .scaleExtent([1 / 20, 10])
    .on("zoom", zoomed));

var g = svg.append("g");

function zoomed() {
    current = d3.event.transform;
    //current.k = 1;
    g.attr("transform",current);
}

var relationships = [];
var array = [];
var nodes = [];
var links = [];

google.charts.load('current');
google.charts.setOnLoadCallback(init);

// handles passing ONLY sheet in URL e.g. https;//.....html?sheet=1yJUtmO-dsc4M-rP2UjuvyRN8PYyyAgvwG_dRVd9opio
let sheetInURL = false;
var param = decodeURIComponent(location.search.slice(1)).split('#')[0];
if (param.indexOf('sheet=') > -1)  {
    var sheet = param.split('sheet=')[1];
    sheetInURL = true;
};
if (sheetInURL == false) {
    console.log("No sheet variable in URL.")
};

function init() {
    var url = 'https://docs.google.com/spreadsheets/d/'+sheet+'/edit#gid=0'
    var query = new google.visualization.Query(url);
    query.setQuery('select *');
    query.send(processSheetsData);
}

function processSheetsData(response) {
    var data = response.getDataTable();
    var columns = data.getNumberOfColumns();
    var rows = data.getNumberOfRows();
    for (var r = 1; r < rows; r++) {
        var row = {};
        for (var c = 0; c < columns; c++) {
            row[data.getFormattedValue(0, c)] = data.getFormattedValue(r, c);
        }
        array.push(
            row
        );
    }

    // Going from wide to long format
    array.forEach(function(d) {
        let subject = d["Biomarker"];
        for (let prop in d) {
            if (prop != "Biomarker"){
                let predicate = prop;
                let objects = d[prop].split(",");
                objects.forEach(function(object){
                    if (object == "") {} else {
                        relationships.push({
                            Source: subject.trim(),
                            Predicate: predicate.trim(),
                            Target: object.trim()
                        });
                    }
                });
            }
        }
    });

    relationships.forEach(function(d){
        if (nodes.indexOf(d.Source.trim()) <0){
            //sorce node not there so add
            nodes.push(d.Source.trim())
        }
        if (d.Predicate.trim() == "Tissue") {
            if (nodes.indexOf(d.Target.trim()) <0){
                //target node not there so add
                nodes.push(d.Target.trim())
            }
            if (links.filter(function(itm){
                return itm.sourceName == d.Source.trim() && itm.targetName == d.Target.trim();
            }).length < 1){
                if (relationships.filter(function(o){
                    return o.Source.trim() == d.Source.trim() && o.Target.trim() == "Human";
                }).length > 0){
                    links.push({source:nodes.indexOf(d.Source.trim()), target:nodes.indexOf(d.Target.trim()), sourceName:d.Source.trim(),targetName:d.Target.trim(),color:'#FF00FF'});
                }
                if (relationships.filter(function(p){
                    return p.Source.trim() == d.Source.trim() && p.Target.trim() == "Mouse";
                }).length > 0){
                    links.push({source:nodes.indexOf(d.Source.trim()), target:nodes.indexOf(d.Target.trim()), sourceName:d.Source.trim(),targetName:d.Target.trim(),color:'#00FF00'});
                }
            }
        }
    });

    var relationshipsSourceMap = relationships.map(function(o) { return o.Source; });

    nodes = nodes.map(function(n){
        return {name:n, color:"", citation:[]}
    });

    function circleColor(d){
        switch(d) {
            case 'Resistance to apoptosis':
                return d3.rgb(78,115,189)
                break;
            case 'SASP/Inflammation':
                return d3.rgb(224,132,65)
                break;
            case 'Cell cycle arrest':
                return d3.rgb(126,172,86)
                break;
            case 'Cell surface markers':
                return d3.rgb(44,67,116)
                break;
            case 'Nuclear changes':
                return d3.rgb(99,99,99)
                break;
            case 'DDR':
                return d3.rgb(207,193,71)
                break;
            case 'Increased lysosomal content':
                return d3.rgb(165,165,165)
                break;
            case 'Metabolic adaptations':
                return d3.rgb(212,54,68)
                break;
            case 'Changes in morphology':
                return d3.rgb(106,154,203)
                break;
            default:
                return 'black'
        }
    }

    // Aggregate Citations and Hallmark
    relationships.forEach(function(d) {
        if (d.Predicate.trim() == "Senescence Hallmark") {
            nodes[nodes.findIndex(function(itm){
                return itm.name == d.Source.trim();})].color = circleColor(d.Target.trim());
        }
        if (d.Predicate.trim() == "Citation") {
            let temp = nodes[nodes.findIndex(function(itm){
                return itm.name == d.Source.trim();})].citation;
            if(temp.indexOf(d.Target.trim()) == -1){
                temp.push(d.Target.trim());
            }
        }
    })

    const graph = {nodes,links};

    var link = g.append("g")
        .selectAll()
        .data(graph.links)
        .enter()
        .append('line')
        .attr('stroke', function(d) {return d.color;})
        .attr('stroke-width', '1px')
        .attr("opacity",0.2);

    var node = g.append("g")
        .selectAll()
        .data(graph.nodes)
        .enter()
        .append('g');

    // Add drag capabilities
    var drag_handler = d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    drag_handler(node);

    // Add hover capabilities
    node.append("title")
        .text(function(d) { return d.name; });

    node.append('circle')
        .attr('r', function(d) { return d.citation.length/4 + 4; })
        .attr("opacity", function(d) { return (relationshipsSourceMap.indexOf(d.name) != -1) ? 1 : 0;} )
        .attr("fill", function(d) { return d.color; })
        .on("click", function(d){
            var url = "https://pubmed.ncbi.nlm.nih.gov/?term="+d.citation;
            //url += d.link_id;
            //$(location).attr('href', url);
            //window.location = url;
            window.open(url, '_blank');
        });

    node.append("text")
        .text(function(d) { return d.name; })
        .attr('stroke-width', '1px')
        .attr("font-family", "sans-serif")
        .attr("font-size", function(d) { return (relationshipsSourceMap.indexOf(d.name) == -1) ? "14px" : "0px";} )
        .style("text-anchor", "start");

    const simulation = d3.forceSimulation()
        .force('link', d3.forceLink().distance(50))
        .force('charge', d3.forceManyBody().strength(-250))
        .force('centerX', d3.forceX(w / 2))
        .force('centerY', d3.forceY(h / 2));

    simulation
        .nodes(graph.nodes)
        .on('tick', ticked);

    simulation
        .force('link')
        .links(graph.links);

    function ticked() {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node.attr('transform', function (d) {
            return 'translate(' + d.x + ', ' + d.y + ')';
        });
        //node.attr('cx', d => d.x)
        //.attr('cy', d => d.y);
    }

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        // Stop simulating with dragged item
        d3.select(this).classed("fixed", true);

        // Keep simulating with dragged item
        // if (!d3.event.active) simulation.alphaTarget(0);
        // d.fx = null;
        // d.fy = null;
    }

}
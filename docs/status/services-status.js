class ServicesStatus extends HTMLElement {

    constructor() {
        super()
        this.timeout = 10000
        this.counter = 0
        this.interval = null
        this.html = {}
    }

    getStatusEndpointsFixture() {
        return ([
            {
                Service: 'Ingest API',
                Status: false,
                Endpoint: 'https://ingest.api.sennetconsortium.org/status',
                'Github Repository': 'https://github.com/sennetconsortium/ingest-api',
                'Version Number': 'N/A',
                Build: 'N/A',
                Usage: 'N/A',
                Note: 'N/A'
            },
            {
                Service: 'Entity API',
                Status: false,
                Endpoint: 'https://entity.api.sennetconsortium.org/status',
                'Github Repository': 'https://github.com/sennetconsortium/entity-api',
                'Version Number': 'N/A',
                Build: 'N/A',
                Usage: 'N/A',
                Note: 'N/A'
            },
            {
                Service: 'Search API',
                Status: false,
                Endpoint: 'https://search.api.sennetconsortium.org/status',
                'Github Repository': 'https://github.com/sennetconsortium/search-api',
                'Version Number': 'N/A',
                Build: 'N/A',
                Usage: 'N/A',
                Note: 'N/A'
            },
            {
                Service: 'UUID API',
                Status: false,
                Endpoint: 'https://uuid.api.sennetconsortium.org/status',
                'Github Repository': 'https://github.com/x-atlas-consortia/uuid-api',
                'Version Number': 'N/A',
                Build: 'N/A',
                Usage: 'N/A',
                Note: 'N/A'
            }
        ])
    }

    getPingEndpointsFixture() {
        return ([
            {
                Service: 'Data Portal',
                Status: false,
                Endpoint: 'https://data.sennetconsortium.org/',
                'Github Repository': 'https://github.com/sennetconsortium/ingest-api',
                'Version Number': 'N/A',
                Build: 'N/A',
                Usage: 'N/A',
                Note: 'N/A'
            },
            {
                Service: 'Data Ingest Board',
                Status: false,
                Endpoint: 'https://ingest.board.sennetconsortium.org/',
                'Github Repository': 'https://github.com/sennetconsortium/ingest-api',
                'Version Number': 'N/A',
                Build: 'N/A',
                Usage: 'N/A',
                Note: 'N/A'
            },
            {
                Service: 'SenNet Consortium',
                Status: false,
                Endpoint: 'https://sennetconsortium.org/',
                'Github Repository': 'https://github.com/sennetconsortium/ingest-api',
                'Version Number': 'N/A',
                Build: 'N/A',
                Usage: 'N/A',
                Note: 'N/A'
            },
            {
                Service: 'Member Portal',
                Status: false,
                Endpoint: 'https://profile.sennetconsortium.org/',
                'Github Repository': 'https://github.com/sennetconsortium/ingest-api',
                'Version Number': 'N/A',
                Build: 'N/A',
                Usage: 'N/A',
                Note: 'N/A'
            },
        ])
    }

    pingItems() {
        return (
            {
                'Data Portal': 'favicon.ico',
                'Data Ingest Board': 'favicons/sennet-favicon.ico',
                'SenNet Consortium': 'wp-content/uploads/2021/10/Untitled3.png',
                'Member Portal': 'static/js/apps.min.js'
            }
        )
    }

    formatColumn(c, data) {
        if (c === 'Status') {
            const html = `<div class='c-status'><span class="c-status__beacon c-status__beacon--${data[c]}"></span> <span class='c-status__txt'>${data[c] ? 'Up' : 'Down'}</span></div>`
            return html
        } else if (c === 'Github Repository' || c === 'Endpoint') {
            const title = c === 'Github Repository' ? data.Service : data[c]
            return `<a href="${data[c]}" target='_blank'>${title} <i class="fa fa-external-link"></i></a>`
        }  else {
            return data[c];
        }
    }

    adjustHtml(data, html) {
        html += '<tr>'
        for (let c in data) {
            html += `<td>${this.formatColumn(c, data)}</td>`
        }
        html += '</tr>'
        return html
    }

    formatServicesColumn(d, row) {

        if (d?.services && Array.isArray(d?.services)) {
            row.Note = '<ul class="c-status c-status__servicesList">'
            for (let s of d.services) {
                row.Note += `<li><strong>${s.name}</strong>: <span>${s.status} <i class='c-status c-status__iconStatus c-status__iconStatus--${s.status} fa fa-${s.status ? 'check-circle' : 'times-circle'}'></i></span></li>`
            }
            row.Note += '</ul>'
        }

        if (d?.indexing && d.indexing.is_indexing) {
            let color = d.indexing.percent_complete < 79 ? 'warn' : 'good';
            row.Note += this.progressBar({percent: d.indexing.percent_complete, type: '<br><hr><strong>Indexing status:</strong>', description: 'Currently indexing...'}, color, 'c-progressBar--noMgn')

            if (this.interval == null) {
                this.interval = setInterval(()=> {
                    location.reload()
                }, 1000 * 60 * 5)
            }
        }

    }

    progressBar(r, color, cls = '') {
        let html = ''
        html += `<div class='c-usageInfo' title='${r.description}'>`

        html += `<span class='c-usageInfo__type'>${r.type}</span>`
        html += `<progress-bar class="c-progressBar ${cls}">`
        html += `<span class="c-progressBar__main bg--${color} js-progressBar__bar"  data-progress="${r.percent}"></span>`
        html += '</progress-bar>'
        html += `</div>`

        return html
    }

    formatUsageColumn(d, row) {
        let color
        if (d?.usage && Array.isArray(d?.usage)) {
            row.Usage = ''
            for (let r of d.usage) {
                color = r.percent_used < 50 ? 'good' : (r.percent_used > 79 ? 'err' : 'warn')
                row.Usage += this.progressBar({...r, percent: r.percent_used}, color)
            }
        }
    }

    /**
     * It is not possible to directly "ping" a URL using JavaScript in a browser environment due to security restrictions.
     * The traditional "ping" command uses ICMP (Internet Control Message Protocol), which browsers do not have direct access to.
     * The method simulates a ping-like functionality by making an HTTP request to the URL and measuring the response time.
     * @param row
     */
    pingURL(row) {
        const item = this.pingItems()[row.Service]
        const isJs = item.indexOf('.js') !== -1
        const ping = isJs ? document.createElement('script') : new Image()
        const startTime = Date.now();
        const _t = this
        ping.onload = () => {
            const endTime = Date.now();
            const latency = endTime - startTime
            if (isJs) {
                document.body.removeChild(ping)
            }
            _t.structureRow({ ok: true, latency, request: row.Endpoint }, row)
        };
        ping.onerror = (e) => {
            if (isJs) {
                document.body.removeChild(ping)
            }
            _t.structureRow({ ok: false, request: row.Endpoint }, row)
        };
        ping.src = row.Endpoint + item
        if (isJs) {
            document.body.append(ping)
        }
    }

    structureRow(d, row) {
        row['Version Number'] = d?.version || 'N/A'
        row['Build'] = d?.build || 'N/A'
        this.formatServicesColumn(d, row)
        row.Status = d.ok
        this.formatUsageColumn(d, row)
        this.html[row.Endpoint]  = this.adjustHtml(row, '')

        this.setAttribute('html', (new Date()).toLocaleDateString())
    }

    fetchData() {
        this.innerHTML = '<div class="c-spinner"></div>'

        const statusEndpointsFixtures = this.getStatusEndpointsFixture()
        const pingEndpointsFixtures = this.getPingEndpointsFixture()
        try {

            const statusEndpoints = []
            for (let f of statusEndpointsFixtures) {
                statusEndpoints.push(f.Endpoint)
            }

            const _t = this
            for (let e of statusEndpoints) {
                $.ajax({
                    url: e,
                    error: function(){
                        let i = statusEndpoints.indexOf(e)
                        _t.structureRow({ok: false},  statusEndpointsFixtures[i])
                    },
                    success: function(r){
                        let i = statusEndpoints.indexOf(e)
                        _t.structureRow({...r, ok: true},  statusEndpointsFixtures[i])
                    },
                    timeout: this.timeout // sets timeout to 3 seconds
                })
            }

            for (let row of pingEndpointsFixtures) {
                this.pingURL(row)
            }
        }
        catch(e) {
            console.error(e)
        }
    }

    /**
     * Determines which attributes to watch for triggering change notifications to attributeChangedCallback.
     * @returns {string[]}
     */
    static get observedAttributes() {
        return ['html']
    }

    buildHtml() {
        const cols = [
            {
                name: 'Service',
                width: '14%'
            },
            {
                name: 'Status',
                width: '7%'
            },
            {
                name: 'Endpoint',
                width: '27%'
            },
            {
                name: 'Github Repository',
                width: '14%'
            },
            {
                name: 'Version Number',
            },
            {
                name: 'Build',
            },
            {
                name: 'Usage',
                width: '17%'
            },
            {
                name: 'Note',
                width: '15%'
            }
        ]
        let heading = '<div class="c-table c-table--scrollable"><table><tr>'
        for (let c of cols) {
            let w = c.width ? `width='${c.width}'` : ''
            heading += `<th ${w}>${c.name}</th>`
        }
        heading += `</tr>`
        let tail = '</table></div>'
        let html = ''
        const endpoints = [...this.getStatusEndpointsFixture(), ...this.getPingEndpointsFixture()]
        for (let e of endpoints) {
            html += this.html[e.Endpoint] || this.structureRow({ok: false}, e)
        }
        this.innerHTML = heading + html + tail;
    }

    /**
     * Invoked when one of the custom element's attributes is added, removed, or changed.
     * @param property
     * @param oldValue
     * @param newValue
     */
    attributeChangedCallback(property, oldValue, newValue) {
        this.counter++
        if (this.counter >= (this.getPingEndpointsFixture().length + this.getStatusEndpointsFixture().length)) {
            this.buildHtml()
        }
    }

    /**
     * Runs when the element is connected to the DOM.
     */
    connectedCallback() {
        this.fetchData()
    }
}


customElements.define('services-status', ServicesStatus)
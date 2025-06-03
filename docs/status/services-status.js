class ServicesStatus extends HTMLElement {

    getStatusEndpointsFixture() {
        return ([
            {
                Service: 'ingest-api',
                Status: false,
                Endpoint: 'https://ingest.api.sennetconsortium.org/status',
                'Github Repository': 'https://github.com/sennetconsortium/ingest-api',
                'Version Number': 'N/A',
                Build: 'N/A',
                Note: 'N/A'
            },
            {
                Service: 'entity-api',
                Status: false,
                Endpoint: 'https://entity.api.sennetconsortium.org/status',
                'Github Repository': 'https://github.com/sennetconsortium/entity-api',
                'Version Number': 'N/A',
                Build: 'N/A',
                Note: 'N/A'
            },
            {
                Service: 'search-api',
                Status: false,
                Endpoint: 'https://search.api.sennetconsortium.org/status',
                'Github Repository': 'https://github.com/sennetconsortium/search-api',
                'Version Number': 'N/A',
                Build: 'N/A',
                Note: 'N/A'
            },
            {
                Service: 'uuid-api',
                Status: false,
                Endpoint: 'https://uuid.api.sennetconsortium.org/status',
                'Github Repository': 'https://github.com/x-atlas-consortia/uuid-api',
                'Version Number': 'N/A',
                Build: 'N/A',
                Note: 'N/A'
            }
        ])
    }

    getPingEndpointsFixture() {
        return ([
            {
                Service: 'portal-ui',
                Status: false,
                Endpoint: 'https://data.sennetconsortium.org/',
                'Github Repository': 'https://github.com/sennetconsortium/ingest-api',
                'Version Number': 'N/A',
                Build: 'N/A',
                Note: 'N/A'
            },
            {
                Service: 'data-ingest-board',
                Status: false,
                Endpoint: 'https://ingest.board.sennetconsortium.org/',
                'Github Repository': 'https://github.com/sennetconsortium/ingest-api',
                'Version Number': 'N/A',
                Build: 'N/A',
                Note: 'N/A'
            },
            {
                Service: 'main',
                Status: false,
                Endpoint: 'https://sennetconsortium.org/',
                'Github Repository': 'https://github.com/sennetconsortium/ingest-api',
                'Version Number': 'N/A',
                Build: 'N/A',
                Note: 'N/A'
            },
            {
                Service: 'members',
                Status: false,
                Endpoint: 'https://profile.sennetconsortium.org/',
                'Github Repository': 'https://github.com/sennetconsortium/ingest-api',
                'Version Number': 'N/A',
                Build: 'N/A',
                Note: 'N/A'
            },
        ])
    }

    formatColumn(c, data) {
        if (c === 'Status') {
            const html = `<div class='c-status'><span class="c-status__beacon c-status__beacon--${data[c]}"></span> <span class='c-status__txt'>${data[c] ? 'Up' : 'Down'}</span></div>`
            return html
        } else if (c === 'Github Repository') {
            return `<a href="${data[c]}">${data.Service} <i class="fa fa-external-link"></i></a>`
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

    fetchData() {
        const cols = [
            {
                name: 'Service',
            },
            {
                name:  'Status',
                width: '7%'
            },
            {
                name: 'Endpoint',
            },
            {
                name: 'Github Repository',
            },
            {
                name: 'Version Number',
            },
            {
                name: 'Build',
            },
            {
                name: 'Note',
                width: '15%'
            }
        ]

        const statusEndpointsFixtures = this.getStatusEndpointsFixture()
        const pingEndpointsFixtures = this.getPingEndpointsFixture()

        const statusEndpoints = []
        for (let f of statusEndpointsFixtures) {
            statusEndpoints.push(f.Endpoint)
        }

        const pingEndpoints = []
        for (let f of pingEndpointsFixtures) {
            pingEndpoints.push(f.Endpoint)
        }

        let promises = []
        for (let e of statusEndpoints) {
            promises.push(fetch(e))
        }

        let promises2 = []
        for (let e of pingEndpoints) {
            promises2.push(fetch(e, {
                method: "GET",
                mode: "no-cors",
                cache: "no-cache",
                referrerPolicy: "no-referrer"
            }))
        }

        const spinner = '<div class="c-spinner"></div>'
        let html = ''

        let heading = '<table><tr>'
        for (let c of cols) {
            let w = c.width ? `width='${c.width}'` : ''
            heading += `<th ${w}>${c.name}</th>`
        }
        heading += `</tr>`
        let tail = '</table>'

        const jsonPromises = []
        Promise.all(promises).then((values) => {
            let row

            for (let i = 0; i < values.length; i++) {
                row = statusEndpointsFixtures[i]
                row.Status = values[i].ok
                jsonPromises.push(values[i]?.json())
            }

            Promise.all([...jsonPromises, ...promises2]).then((list) => {
                for (let i = 0; i < list.length; i++) {
                    let d = list[i]

                    if (i < jsonPromises.length) {
                        row = statusEndpointsFixtures[i]
                        row['Version Number'] = d.version || 'N/A'
                        row['Build'] = d.build || 'N/A'
                        if (d.services && Array.isArray(d.services)) {
                            row.Note = '<ul class="c-status c-status__servicesList">'
                            for (let s of d.services) {
                                row.Note += `<li><strong>${s.name}</strong>: <span>${s.status} <i class="c-status c-status__iconStatus c-status__iconStatus--${s.status} fa fa-${s.status ? 'check-circle' : 'times-circle'}"></i></span></li>`
                            }
                            row.Note += '</ul>'
                        }
                    } else {
                        let j = i - jsonPromises.length;
                        row = pingEndpointsFixtures[j]
                        row.Status = values[j].ok
                    }
                    html = this.adjustHtml(row, html)
                }
                this.innerHTML = heading +  html + tail;
            })
        })

        this.innerHTML = spinner;
    }

    /**
     * Runs when the element is connected to the DOM.
     */
    connectedCallback() {
        this.fetchData()
    }

}

customElements.define('services-status', ServicesStatus)
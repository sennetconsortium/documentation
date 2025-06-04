class ServicesStatus extends HTMLElement {

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

    formatUsageColumn(data, html) {
        const d = data
        let color
        if (d.usage && Array.isArray(d.usage)) {
            color = s.percent_used < 50 ? 'good' : (s.percent_used > 79 ? 'err' : 'warn')
            row.Usage = `<progress-bar class="c-progressBar bg--${color}">`
            for (let s of d.usage) {
                row.Usage += `<span data-progress="${s.percent_used}"></span>`
            }
            row.Usage += '</progress-bar>'
        }
        return html
    }

    /**
     * It is not possible to directly "ping" a URL using JavaScript in a browser environment due to security restrictions.
     * The traditional "ping" command uses ICMP (Internet Control Message Protocol), which browsers do not have direct access to.
     * The method simulates a ping-like functionality by making an HTTP request to the URL and measuring the response time.
     * @param row
     * @returns {Promise<unknown>}
     */
    async pingURL(row) {
        return new Promise((resolve, reject) => {
            const item = this.pingItems()[row.Service]
            const isJs = item.indexOf('.js') !== -1
            const ping = isJs ? document.createElement('script') : new Image()
            const startTime = Date.now();
            ping.onload = () => {
                const endTime = Date.now();
                const latency = endTime - startTime
                if (isJs) {
                    document.body.removeChild(ping)
                }

                resolve({ ok: true, latency, request: row.Endpoint })
            };
            ping.onerror = (e) => {
                if (isJs) {
                    document.body.removeChild(ping)
                }
                resolve({ ok: false, e, latency: null, request: row.Endpoint })
            };
            ping.src = row.Endpoint + item
            if (isJs) {
                document.body.append(ping)
            }
        });
    }

    fetchData() {
        const cols = [
            {
                name: 'Service',
            },
            {
                name: 'Status',
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
                name: 'Usage',
            },
            {
                name: 'Note',
                width: '15%'
            }
        ]

        const statusEndpointsFixtures = this.getStatusEndpointsFixture()
        const pingEndpointsFixtures = this.getPingEndpointsFixture()
        try {

        const statusEndpoints = []
        for (let f of statusEndpointsFixtures) {
            statusEndpoints.push(f.Endpoint)
        }

        let promises = []
        for (let e of statusEndpoints) {
            promises.push(fetch(e).catch((err) => {
                console.log(err)
            }))
        }

        let promises2 = []
        for (let row of pingEndpointsFixtures) {
            promises2.push(this.pingURL(row))
        }

        const spinner = '<div class="c-spinner"></div>'
        let html = ''

        let heading = '<div class="c-table c-table--scrollable"><table><tr>'
        for (let c of cols) {
            let w = c.width ? `width='${c.width}'` : ''
            heading += `<th ${w}>${c.name}</th>`
        }
        heading += `</tr>`
        let tail = '</table></div>'

        const jsonPromises = []
        Promise.all(promises).then((values) => {
            let row
            let status

            for (let i = 0; i < values.length; i++) {
                status = values[i] || {ok: false, json: () => {}}
                row = statusEndpointsFixtures[i]
                row.Status = status.ok
                jsonPromises.push(status?.json())
            }

            Promise.all([...jsonPromises, ...promises2]).then((list) => {
                for (let i = 0; i < list.length; i++) {
                    let j = i < jsonPromises.length ? i : i - jsonPromises.length
                    let d = list[i]

                    if (i < jsonPromises.length) {
                        row = statusEndpointsFixtures[j]
                        row['Version Number'] = d?.version || 'N/A'
                        row['Build'] = d?.build || 'N/A'
                        if (d?.services && Array.isArray(d?.services)) {
                            row.Note = '<ul class="c-status c-status__servicesList">'
                            for (let s of d.services) {
                                row.Note += `<li><strong>${s.name}</strong>: <span>${s.status} <i class='c-status c-status__iconStatus c-status__iconStatus--${s.status} fa fa-${s.status ? 'check-circle' : 'times-circle'}'></i></span></li>`
                            }
                            row.Note += '</ul>'
                        }

                    } else {
                        row = pingEndpointsFixtures[j]
                        row.Status = d.ok
                    }
                    html = this.formatUsageColumn(row, html)
                    html = this.adjustHtml(row, html)
                }
                this.innerHTML = heading + html + tail;
            })
        })

        this.innerHTML = spinner;
        }
        catch(e) {
            console.error(e)
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
class GTM extends App {
    constructor(el, args) {
        super(el, args)
        this.event = 'view'
        this.pageView()
    }

    pageView() {
        this.gtm()
    }

    getPath() {
        const path = window.location.pathname + window.location.search
        return path.length > 70 ? window.location.pathname : path;
    }

    gtm(args = {}) {
        let data = {
            event: this.event,
            path: this.getPath(),
            ...args
        }
        if (App.isLocal()) console.log(data)
        dataLayer.push(data)
    }
}
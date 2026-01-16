class FileMeta extends App {
    constructor(el, args) {
        super(el, args)
        this.$ = {
            date: this.el.find('.js-fileMeta__date'),
            label: this.el.find('.js-fileMeta__label')
        }
        this.addDate()
    }

    toDate(lastMod) {
        let date = new Date(lastMod)
        let formattedDate = date.toLocaleDateString('en-US')
        let formattedTime = date.toLocaleTimeString('en-US')

        this.$.date.html(formattedDate + ' @ ' + formattedTime)
    }

    async addDate() {
        let lastMod = null
        try {
            let path = window.location.pathname
            if (path[path.length - 1] === '/') {
                path += 'index'
            }
            if (!path) return

            // Find file stat from search indicies
            let p = path
            for (let d of window.apps.searchData) {
                if ((p.toLowerCase() == d.path.toLowerCase()) && d.mod.length) {
                    this.toDate(d.mod)
                    this.$.label.addClass(this.classNames.active)
                    return
                }
            }

            // If not found, use the meta from the server
            let paths = []
            if (path.split('.').pop() === path) {
                paths = [`${path}.html`, `${path}.md`]
            }
            for (let p of paths) {
                if (this.$.date.html() && this.$.date.html().length) return
                let r = await Rest.get(p, 'text/plain')
                if (r.ok) {
                    lastMod = r.headers.get('last-modified')
                    this.toDate(lastMod)
                    this.$.label.addClass(this.classNames.active)
                } else {
                    this.$.label.removeClass(this.classNames.active)
                    App.log(`Error: ${r.status}`, r.statusText, { error: true })
                }
            }
        } catch (e) {
            App.log(this.app, e, { error: true })
        }
    }
}

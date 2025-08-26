class App {
    constructor(el, args) {
        this.el = $(el)
        this.app = args.app
        this.data = args.data
        this.keycodes = {
            enter: 'Enter',
            esc: 'Escape'
        }
        this.classNames = {
            active: 'is-active'
        }

        this.log(this.app, null, { color: 'orange' })
        this.msgs = this.getMsgs()
    }

    getMsgs() {
        return window.apps.locale
    }

    toCamelCase(input) {
        return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });
    }

    toId(val) {
        return val
            .toLowerCase()
            .replace(/[\W_]+/g, ' ')
            .trim()
            .replaceAll(' ', '-')
    }

    toUpperCaseFirst(val) {
        return val.charAt(0).toUpperCase() + val.slice(1)
    }

    handleKeydown(e, trigger) {
        this.currentTarget(e).trigger(trigger)
        this.currentTarget(e).focus()
    }

    onKeydownEnter(sel, cb, trigger = 'click') {
        this.el.on(
            'keydown',
            `${sel}`,
            ((e) => {
                if (this.isEnter(e)) {
                    cb ? cb(e) : this.handleKeydown(e, trigger)
                }
            }).bind(this)
        )
    }

    currentTarget(e) {
        return $(e.currentTarget)
    }

    isMobile() {
        return $(window).width() <= 1024
    }

    /**
     * Prevents bubbling of javascript event to parent
     * @param {*} e Javascript event
     */
    stop(e) {
        e.stopPropagation()
    }

    /**
     * Determines whether a keydown/keypress operation is of Enter/13
     * @param {object} e Event
     * @returns {boolean}
     */
    isEnter(e) {
        return e.code === this.keycodes.enter
    }

    isEsc(e) {
        return e.code === this.keycodes.esc
    }

    static isLocal() {
        return window.location.host.indexOf('localhost') !== -1
    }

    _t(msg) {
        return this.msgs[msg] || msg
    }

    autoBlobDownloader(data, filename, type = 'text/plain') {
        const a = document.createElement('a')
        const url = window.URL.createObjectURL(new Blob(data, {type}))
        a.href = url
        a.download = filename
        document.body.append(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(url)
    }

    static async loadLanguageFile() {
        try {
            if (window.apps.locale) return true
            const res = await Rest.get(`/lang/${LocalStore.getLanguage()}.json`)
            window.apps.locale = await res.json()
        } catch (e) {
            console.error(e)
        }
    }

    static async loadThemeConfig() {
        try {
            if (window.apps.theme) return true
            const res = await Rest.get(`/ui-config.json`)
            window.apps.theme = await res.json()
        } catch (e) {
            console.error(e)
        }
    }

    static applyStyles(args) {
        let css = ''
        $('img').each(function( i ) {
            let width = $(this).attr('width')
            if (width && parseInt(width) > 0) {
                let cls = `imgw--${i}`
                $(this).addClass(`${cls}`)
                width = parseInt(width).toString() === width ? width + 'px' : width
                css += `.${cls} {max-width: ${width};}`
            }
        })
        if (css.length) {
            $('body').append(`<style>${css}</style>`)
        }

        new CodeCopy(document, {app: 'codeCopy', ...args})

        $('pre').each(function( i ) {
            new Pre(this, {app: '<pre>', ...args})
        })


    }

    static applyTheme() {
        const path = window.location.pathname
        this.pathBase = path
        for (let section in window.apps.theme) {
            if (path.includes(section)) {
                const $page = $('.c-documentation')
                if (window.apps.theme[section].cssModifier) {
                    $page.addClass(`c-documentation--${window.apps.theme[section].cssModifier}`)
                }
                if (window.apps.theme[section].classNames) {
                    $page.addClass(window.apps.theme[section].classNames)
                }

            }
        }
        const format = (el) => {
            let html = $(el).html()
            $(el).html(markdown.default(html))
        }

        document.querySelectorAll('body details').forEach((el) => {
            format(el)
        })
        document.querySelectorAll('body mdit').forEach((el) => {
            format(el)
        })
    }

    static log(title, msg, ops = {}) {
        const fn = ops.fn || (ops.error ? 'error' : 'log')
        const color = ops.color || (ops.error ? 'red' : '#bada55')
        if (App.isLocal()) {
            console[fn](`%c ${title}`, `background: #222; color: ${color}`)
            if (msg) {
                console[fn](msg)
            }
        }
    }

    log(title, msg, ops = {}) {
        App.log(title, msg, ops)
    }
}

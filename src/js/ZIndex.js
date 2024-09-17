/**
 * JS functionality which enhance site functionality, not necessarily part of the core.
 * @param {string} source
 * @param {object} args
 * @returns
 */

function ZIndex(source, args = null) {
    App.log('Apps started ...')

    if (window.apps[source] !== undefined) {
        return
    }
    window.apps[source] = args

    App.applyTheme()

    let apps = {
        sidebar: Sidebar,
        breadcrumbs: Breadcrumbs,
        footer: Footer,
        fileMeta: FileMeta,
        header: Header,
        gtm: GTM
    }

    args = args || window.apps.init
    try {
        for (let app in apps) {
            document
                .querySelectorAll(`[class*='js-app--${app}'], [data-js-${app}]`)
                .forEach((el) => {
                    new apps[app](el, { app, ...args })
                })
        }

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
    } catch (e) {
        console.error(e)
    }
}

window.addEventListener('load', (event) => {
    App.log('SenNet Docs ...', null, { color: 'pink' })
    window.apps = window.apps || {}
    App.loadLanguageFile().then(
        ((m) => {
            App.loadThemeConfig().then(() => {
                ZIndex('init')
            })
        }).bind(this)
    )
})

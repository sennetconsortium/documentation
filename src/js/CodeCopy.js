class CodeCopy extends App {
    constructor(el, args) {
        super(el, args)
        this.sections = {}
        this.initCopy()
    }

    handleCopySource(e) {
        const $el = this.currentTarget(e)
        const _sections = $el.attr('data-js-copy').split(',')
        const text = []
        for (let s of _sections) {
            text.push(this.sections[s])
        }
        this.autoBlobDownloader([text.join('\n')], `${_sections.join('_')}.py`)
    }

    initCopy() {
        const t = this
        $('code').each(function( i ) {
            const s = $(this).attr('data-section')
            let code = $(this).text().trim()
            if (s) {
                let txt = t.sections[s] || ''
                t.sections[s] = `${txt}\n${code}`
            }
        })

        $('[data-js-copy]').on('click', (e)=>{
            this.stop(e)
            e.preventDefault()
            this.handleCopySource(e)
        })
    }
}
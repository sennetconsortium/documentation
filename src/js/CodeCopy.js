class CodeCopy extends App {
    constructor(el, args) {
        super(el, args)
        this.sections = {}
        this.sectionsJupyter = {}
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

    handleJupyterGeneration(e) {
        const $el = this.currentTarget(e)
        const _sections = $el.attr('data-js-jupyter').split(',')
        let cells = ''

        let i = 0;
        for (let s of _sections) {
            if (this.sectionsJupyter[s]) {
                cells += `{
                   "cell_type": "code",
                   "execution_count": null,
                   "id": "b91b4dab7cc822${i}b",
                   "metadata": {},
                   "outputs": [],
                   "source": [${this.sectionsJupyter[s].substring(0, this.sectionsJupyter[s].length - 1)}]
                  },`
                i++
            }

        }
        let template = `{
         "cells": [${cells.substring(0, cells.length - 1)}],
         "metadata": {
          "kernelspec": {
           "display_name": "Python 3 (ipykernel)",
           "language": "python",
           "name": "python3"
          },
          "language_info": {
           "codemirror_mode": {
            "name": "ipython",
            "version": 3
           },
           "file_extension": ".py",
           "mimetype": "text/x-python",
           "name": "python",
           "nbconvert_exporter": "python",
           "pygments_lexer": "ipython3",
           "version": "3.9.16"
          }
         },
         "nbformat": 4,
         "nbformat_minor": 5
        }`
        this.autoBlobDownloader([template], `${_sections.join('_')}.ipynb`)
    }

    initCopy() {
        const t = this
        $('code').each(function( i ) {
            const s = $(this).attr('data-section')
            let code = $(this).text().trim()
            if (s) {
                let txt = t.sections[s] || ''
                t.sections[s] = `${txt}\n${code}`

                let txt2 = t.sectionsJupyter[s] || ''
                t.sectionsJupyter[s] = `${txt2}${JSON.stringify(code+'\n')},`
            }
        })

        $('[data-js-copy]').on('click', (e)=>{
            this.stop(e)
            e.preventDefault()
            this.handleCopySource(e)
        })

        $('[data-js-jupyter]').on('click', (e)=>{
            this.stop(e)
            e.preventDefault()
            this.handleJupyterGeneration(e)
        })
    }
}
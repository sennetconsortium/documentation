class Search extends App {
    constructor(el, args) {
        super(el, args)
        this.data = []
        this.$ = {
          btn: this.el.find('button'),
          io: this.el.find('input'),
          list: this.el.find('.list-group')
        }

        this.getData()
        this.events()
    }

    getData()  {
      this.data = window.apps.searchData
    }

    searchSite(val) {
      let found = []
      let dict = {}
      for (let d of this.data) {
        if (d?.title.toLowerCase().indexOf(val.toLowerCase()) > -1 && !dict[d.path]) {
          found.push(d)
          dict[d.path] = true
        }
      }
      let html = ''
      for (let d of found) {
        html += `<li><a href="${d.path}" title="${d.title} ${d.path}">${d.title} <small>${d.path}</small></a></li>`
      }
      this.$.list.addClass('is-active')
      if (!found.length) {
        html = '<li><span>No results</span></li>'
      }
      this.$.list.html(html)
      

    }

    clearResults() {
      this.$.list.removeClass('is-active')
      this.$.list.html('')
    }

    events() {
        this.$.btn.on('click', ((e)=> {
            e.preventDefault()
            this.clearResults()
            if (this.$.io.val().length && !this.$.io.hasClass('is-hidden')) {
              this.searchSite(this.$.io.val())
            } else {
              this.$.io.val('')
              this.$.io.toggleClass('is-hidden')
            }
            
        }).bind(this))

        $(window).on('keydown', ((e) => {
            if (this.isEsc(e)) {
                this.$.io.val('')
                this.clearResults()
                this.$.io.addClass('is-hidden')
            }
        }).bind(this));
    }


}
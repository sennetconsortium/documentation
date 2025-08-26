class Pre extends App {
    constructor(el, args) {
        super(el, args)
        this.addToggleBtn()
    }

    addToggleBtn() {
        this.el.prepend('<div class="pre__toggle" role="button">&nbsp;</div>')
        this.el.find('.pre__toggle').on('click', (e)=> {
            $(e.currentTarget).parent().toggleClass('is-collapsed')
        })
    }


}
class Modal extends HTMLElement {

    showModal() {
        let title = this.getAttribute('data-title')
        let body = this.getAttribute('data-body')
        let sz = this.getAttribute('data-sz') || 'lg'
        let template = `<!-- Modal -->
          <div class="modal fade-in appModal" role="dialog" style="display: block; padding-left: 0px;">
            <div class="modal-dialog modal-${sz}">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                  ${title ? `<h4 class="modal-title">${title}</h4>` : ''}
                </div>
                <div class="modal-body">
                  <p>${body}</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>`
       this.removeModal()
       $('body').prepend(template)
       this.modalCloseListener()
    }

    removeModal() {
        $('body').find('.appModal').remove()
    }

    modalCloseListener() {
        $('.modal-footer .btn, .modal-header .close').on('click', (e)=>{
            e.preventDefault()
            e.stopPropagation()
            this.removeModal()
        })
    }
    modalOpenListener() {
        $(this).find('.js-modal').on('click', (e)=>{
            this.showModal()
        })
    }

    connectedCallback() {
        setTimeout(()=>{
            this.modalOpenListener()
        }, 1000)
    }
}

customElements.define('app-modal', Modal)
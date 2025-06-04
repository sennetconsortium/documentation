class ProgressBar extends HTMLElement {

    animate() {
        $(this).find('span').each(function () {
            $(this).animate(
                {
                    width: $(this).attr("data-progress") + "%",
                },
                1000
            );
            $(this).text($(this).attr("data-progress") + "%");
        })
    }

    connectedCallback() {
       this.animate()
    }
}

customElements.define('progress-bar', ProgressBar)
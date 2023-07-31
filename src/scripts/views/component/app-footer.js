class Footer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="footerText">
        <p>Sahabat Caro @ 2023 - Amriyono Maju Ompusunggu</p>
      </div>
    `;
  }
}

customElements.define('app-footer', Footer);

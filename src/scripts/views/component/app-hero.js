class AppHero extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="hero">
      <div class="heroImage"></div>
        <div class="heroDescription">
          <h1 tabindex="0">Caro - Cari Restoran</h1>
          <h2 tabindex="0">Temukan Berbagai Restoran Terbaik di Indonesia</h2>
          <span class="btnHeroSection">
              <a tabindex="0" class="btnHero" href="#mainContent">Temukan disini</a>
          </span>
        </div>
      </div>
      `;
  }
}

customElements.define('app-hero', AppHero);

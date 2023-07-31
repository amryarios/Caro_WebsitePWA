class Appbar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <nav id="nav" class="menu">
    <h1>
      <a href="/" title="Caro - Cari Restoran">Sahabat Caro</a>
    </h1>
    <button class="menuButton" title="Button Navigasi" aria-label="Button Navigasi">
        <i class="fa fa-times"></i>
        <i class="fa fa-bars"></i>
    </button>
    <ul class="menuList">
        <li><a href="#/home" title="Homepage">Home</a></li>
        <li><a href="#/favorite" title="Temukan Restoran Favorite">Favorite</a></li>
        <li><a href="https://id.linkedin.com/in/amryarios" title="Temukan Saya" target="_blank" rel="noreferrer">About Us</a></li>
    </ul>
  </nav>
        `;
  }
}

customElements.define('app-bar', Appbar);

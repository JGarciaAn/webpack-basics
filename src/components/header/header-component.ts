
export class HeaderComponent extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const template = require('./header-component.html');
    const styles = require('./header-component.scss').toString();
    const styleElement = document.createElement('style');
    
    styleElement.textContent = styles;
    this.shadowRoot.innerHTML = template;
    this.shadowRoot.insertBefore(styleElement, this.shadowRoot.firstChild);
  }
}

customElements.define('app-header', HeaderComponent);

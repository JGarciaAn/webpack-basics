import { ArticleCardModel } from './article-card.model';


export class ArticleCardComponent extends HTMLElement {

  set data(data: ArticleCardModel) {
    this._data = data;
    this.shadowRoot.querySelector('[data-title]').textContent = data.title;
    this.shadowRoot.querySelector('[data-description]').textContent = data.description;
  }

  private _data: ArticleCardModel;
  private _handleClick: EventListenerObject = {
    handleEvent: () => this._cardClicked()
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }



  connectedCallback(): void {
    const template = require('./article-card-component.html');
    const styles = require('./article-card-component.scss').toString();
    const styleElement = document.createElement('style');

    styleElement.textContent = styles;
    this.shadowRoot.innerHTML = template;
    this.shadowRoot.insertBefore(styleElement, this.shadowRoot.firstChild);

    this.shadowRoot.querySelector('[data-button]')
      .addEventListener('click', this._handleClick);
  }


  disconnectedCallback(): void {
    console.log('Removed', this._data.id);
    this.shadowRoot.querySelector('article')
      .removeEventListener('click', this._handleClick);
  }


  private _cardClicked(): void {
    const event = new CustomEvent('card-remove', {
      bubbles: true,
      detail: this._data
    });

    this.dispatchEvent(event);
  }
}

customElements.define('app-article-card', ArticleCardComponent);

import './components/header/header-component';


const styles = require('../styles/styles.scss').toString();
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);

let count = 0;
const articlesContainer = document.querySelector('[data-articles-container]');
articlesContainer.addEventListener('card-remove', (event) => {
  articlesContainer.removeChild(event.target as HTMLElement);
});


testI18n();
testEnvironment();
testLazyLoad();



function testLazyLoad() {
  const button = document.querySelector('[data-button]');
  button.addEventListener('click', addArticleCard);
}


function testI18n() {
  fetch('assets/i18n/es.json').then(res => res.json()).then(translate => {
    const title = document.querySelector('[data-title]');
    title.textContent = translate.TITLE;
  });
}


function testEnvironment() {
  fetch('environment/env.json').then(res => res.json()).then(environment => {
    const env = document.querySelector('[data-env]');
    env.textContent = environment.env;
  });
}


function addArticleCard() {
  import('./components/article-card/article-card-component').then(mod => {
    const element = new mod.ArticleCardComponent();
    const elementId = ++count;
    articlesContainer.appendChild(element);

    element.data = {
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      id: `ID_${elementId}`,
      title: `Titulo de articulo ${elementId}`
    }
  });
}



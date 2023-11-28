import { testFn } from './utils/utils';
import '../styles/styles.scss';


testFn();

document.addEventListener('DOMContentLoaded', () => {
  testLazyLoad();
  testI18n();
  testEnvironment();
});


function testLazyLoad() {
  const button = document.querySelector('[data-button]');
  button.addEventListener('click', () => {
    import('./utils/test-import').then(test => {
      test.testImport();
    });
  });
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

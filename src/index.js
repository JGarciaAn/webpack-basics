import { testFn } from './utils/utils';
import '../styles/styles.scss';

testFn();

document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('[data-button]');

  button.addEventListener('click', () => {
    import('./utils/test-import').then(test => {
      test.testImport();
    });
  })
})
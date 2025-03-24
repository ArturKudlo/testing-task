import '../styles/normalize.css';
import '../styles/fonts.css';
import '../styles/index.css';

import { renderText, configureSubmitAction } from './utils';

import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from './constants';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  const browserLanguage = navigator.language.slice(0, 2);

  let lang = langParam || browserLanguage;

  if (!AVAILABLE_LANGUAGES.includes(lang)) {
    lang = DEFAULT_LANGUAGE;
  }

  const loadLanguageFile = async (lang) => {
    try {
      const response = await fetch(`../assets/locales/${lang}.json`);
      const data = await response.json();
      renderText(data);
    } catch (error) {
      console.error('Language file error', error);
    }
  };

  loadLanguageFile(lang);

  configureSubmitAction();

  const purchaseSelectors = document.querySelectorAll('.purchase');

  const handleClick = (purchase) => {
    purchaseSelectors.forEach((item) => {
      item.classList.remove('active', 'border');
      const badge = item.querySelector('.badge');
      if (badge) badge.classList.remove('active', 'border'); // Удаляем border и у badge
    });

    purchase.classList.add('active');
    const badge = purchase.querySelector('.badge');
    if (badge) badge.classList.add('active');

    if (badge) {
      const borderDiv = document.createElement('div');
      borderDiv.classList.add('border');
      badge.appendChild(borderDiv);
    }
    configureSubmitAction(purchase);
  };

  purchaseSelectors.forEach((purchase) => {
    purchase.addEventListener('click', () => {
      handleClick(purchase);
    });
  });
});

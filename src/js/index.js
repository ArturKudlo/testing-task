import '../styles/normalize.css';
import '../styles/fonts.css';
import '../styles/index.css';

import { renderText, configureSubmitAction } from './utils';

import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from './constants';

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

const purchaseSelectors = document.querySelectorAll('.purchase');

const handleClick = (purchase) => {
  purchaseSelectors.forEach((item) => {
    item.classList.remove('active');
    const badge = item.querySelector('.badge');
    if (badge) badge.classList.remove('active');
  });

  purchase.classList.add('active');
  const badge = purchase.querySelector('.badge');
  if (badge) badge.classList.add('active');

  configureSubmitAction(purchase);
};

purchaseSelectors.forEach((purchase) => {
  purchase.addEventListener('click', () => {
    handleClick(purchase);
  });
});

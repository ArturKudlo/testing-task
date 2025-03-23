import { LIST_OF_ELEMENTS_WITHOUT_WRAP, APP_CONTENT_VALUES } from './constants';

export const translatePageElements = (localizationData) => {
  const translatableElements = document.querySelectorAll('[data-translate]');

  for (const element of translatableElements) {
    const translationKey = APP_CONTENT_VALUES[element.dataset.translate];
    const translatedTemplate = localizationData[translationKey];
    const priceValue = element.dataset.price;

    element.innerHTML = translatedTemplate
      .replace('{{price}}', `$${priceValue}`)
      .replace(/<br>/g, '<br>');
  }
};

export const adjustFontSize = (element) => {
  const container = element.parentElement;
  let fontSize = parseFloat(window.getComputedStyle(element).fontSize);

  for (; element.scrollWidth > container.offsetWidth && fontSize > 1; ) {
    fontSize -= 0.1;
    element.style.fontSize = `${fontSize}vh`;
  }
};

export const renderText = (data) => {
  translatePageElements(data);
  for (const list of LIST_OF_ELEMENTS_WITHOUT_WRAP) {
    for (const title of list) {
      adjustFontSize(title);
    }
  }
};

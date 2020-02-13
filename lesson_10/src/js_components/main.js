import localStorageLoader from './localStorage_js.js';
import cardsTemplate from '../templates/card.hbs';

let cards = [];

const refs = {
  ulList: document.querySelector('.todos'),
  form: document.querySelector('.form'),
};

function createBoxes(inputValue) {
  if (inputValue === '') inputValue = 'there is nothing';
  cards.push({ title: inputValue, status: false, id: Date.now() + '' });
  localStorageLoader.save('cards', cards);
  render(cards);
}

function render(cards) {
  refs.ulList.innerHTML = '';
  const markup = cards.map(card => cardsTemplate(card)).join('');
  refs.ulList.insertAdjacentHTML('beforeend', markup);
}

function renderLocalStr() {
  const upDateData = localStorageLoader.load('cards');
  cards.push(...upDateData);
  render(cards);
}
renderLocalStr();

// make done and delete buttons работает ультра плохо

function actions(e) {
  if (e.target.dataset.delete) {
    cleanLocalStorage(e.target.parentNode.parentNode.dataset.id);
  } else if (e.target.dataset.done) {
    changeStatus(e.target.parentNode.parentNode.dataset.id);
  }
}

function cleanLocalStorage(id) {
  localStorage.removeItem('cards');
  cards = cards.filter(card => card.id !== id);
  localStorageLoader.save('cards', cards);
  render(cards);
}

function changeStatus(id) {
  cards.map(card => {
    if (!card.status && card.id === id) card.status = true;
  });
  localStorageLoader.save('cards', cards);
  render(cards);
}

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  createBoxes(e.target.elements[0].value);
  e.target.elements[0].value = '';
});

refs.ulList.addEventListener('click', e => actions(e));

import localStorageLoader from './localStorage_js.js';
import cardsTemplate from '../templates/card.hbs';
import modalTemplete from '../templates/modalWindow.hbs';
import * as basicLightbox from 'basiclightbox';

let cards = [];

const refs = {
  ulList: document.querySelector('.todos'),
  btn: document.querySelector('#new_form'),
};

function createBoxes(inputValue, importance) {
  if (inputValue === '') inputValue = 'there is nothing';
  cards.unshift({
    title: inputValue,
    status: false,
    id: Date.now() + '',
    importance,
  });
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

// modal is open

function creatBoxesAddivent(e) {
  const form = document.querySelector('.form');
  e.preventDefault();

  const inputs = e.target.elements.raz;
  let importance;
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      importance = inputs[i].dataset.import;
    }
  }

  createBoxes(e.target.elements[0].value, importance);
  e.target.elements[0].value = '';
  instance.close();
  form.removeEventListener('submit', creatBoxesAddivent);
}

const instance = basicLightbox.create(modalTemplete());

function formModalListener() {
  const form = document.querySelector('.form');
  // const checkBoxes = document.querySelector('.radio_inputs');
  // console.dir(checkBoxes);

  // checkBoxes.addEventListener('change', e => console.log(e.target.dataset));
  form.addEventListener('submit', creatBoxesAddivent);
}

function modalWindow() {
  // const instance = basicLightbox.create(modalTemplete());
  instance.show();
  formModalListener();
}

refs.ulList.addEventListener('click', e => actions(e));

refs.btn.addEventListener('click', e => modalWindow(e));


window.addEventListener('DOMContentLoaded', renderLocalStr)

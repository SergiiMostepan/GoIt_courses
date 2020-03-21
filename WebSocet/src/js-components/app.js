import messageTemplate from '../templates/message.hbs';
import localStorageLoader from './localStorage.js';

const refs = {
  massege: document.querySelector('#chat'),
  form: document.querySelector('#inputForm'),
  asyncMap: document.querySelector('[data-name="async"]'),
  file: document.querySelector('#file'),
  userNameForm: document.querySelector('#userNameForm'),
  chatSection: document.querySelector('.chatSection'),
  registrationSection: document.querySelector('.registration'),
  changeDataButton: document.querySelector('#changeData'),
  avatarImg: document.querySelector('#avatarImg'),
};

let userName = '';
let myFile;
let map;
let uluru = {};
let className;
const defPhoto =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAABBpAAAQaQEKWadmAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAwBQTFRF////AQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACl5/7/AAAAP90Uk5TAAECAwQF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';

// получаем текущую геолокацию
navigator.geolocation.getCurrentPosition(position => {
  uluru.lat = position.coords.latitude;
  uluru.lng = position.coords.longitude;
});

// создаем карту
(function googleMap() {
  refs.asyncMap.src =
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyB7Zkwv8ZHein66BAALTpWsJAQorKjiTlw';
  refs.asyncMap.type = 'text/javascript';
  refs.asyncMap.onload = () => {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: uluru,
    });
  };
})();

// берем текущее время
function getDate() {
  let date = new Date();
  let h = pad(date.getHours());
  let m = pad(date.getMinutes());
  let s = pad(date.getSeconds());
  return `${h}:${m}:${s}`;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

// создаем соединение
let ws = new WebSocket('wss://venify.herokuapp.com/chat');

// выводим инфу с сервака
ws.onmessage = ({ data }) => {
  let currentDate = getDate();
  let { cords, message, name, image } = JSON.parse(data);
  if (name === userName) {
    className = 'myUser';
  } else {
    className = 'anotherUser';
  }
  if (image === undefined) {
    image = defPhoto;
  }
  let markup = messageTemplate({
    message,
    name,
    image,
    currentDate,
    className,
  });
  refs.massege.insertAdjacentHTML('beforeend', markup);
  const marker = new google.maps.Marker({
    position: cords,
    map: map,
  });
  refs.massege.scrollTop = refs.massege.scrollHeight;
};

refs.file.addEventListener('change', e => {
  const file = e.target.files[0];
  const FR = new FileReader();
  FR.readAsDataURL(file);
  FR.addEventListener('load', function(e) {
    myFile = e.target.result;
    avatarImg.src = myFile;
    console.log(myFile);
  });
});

// отправляем данные на сервер
const sendData = message => {
  ws.send(
    JSON.stringify({
      cords: uluru,
      message: message,
      name: userName,
      image: myFile,
    }),
  );
};

// вводим имя
function newName(inputName) {
  userName = inputName;
  if (myFile === undefined) {
    myFile = defPhoto;
  }
}

function saveToLocal() {
  localStorage.removeItem('local');
  let local = {
    name: userName,
    image: myFile,
  };
  localStorageLoader.save('local', local);
}

function visibleChat() {
  refs.chatSection.classList.add('visible');
  refs.registrationSection.classList.add('invisible');
}

function changeData() {
  refs.registrationSection.classList.toggle('invisible');
  refs.chatSection.classList.toggle('visible');
}

refs.userNameForm.addEventListener('submit', e => {
  e.preventDefault();
  if (e.target.elements.userName.value === '') {
    alert('Введите имя');
  } else {
    newName(e.target.elements.userName.value);
    saveToLocal();
    visibleChat();
  }
});

refs.changeDataButton.addEventListener('click', e => {
  e.preventDefault();
  changeData();
});

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  sendData(e.target.elements.inputField.value);
  e.target.elements.inputField.value = '';
});

window.addEventListener('DOMContentLoaded', e => {
  const { name, image } = localStorageLoader.load('local');
  if (name !== undefined) {
    e.target.body.children.registration.children.userNameForm.elements.userName.value = name;
  }
  if (image !== undefined) {
    avatarImg.src = image;
    myFile = image;
  }
  // console.dir(e.target.body.children.registration.children.userNameForm.elements)
});

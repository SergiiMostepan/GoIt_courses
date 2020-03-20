import messageTemplate from '../templates/message.hbs';
import localStorageLoader from './localStorage.js'

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
ws.onmessage = ({
  data
}) => {
  let currentDate = getDate();
  const {
    cords,
    message,
    name,
    image
  } = JSON.parse(data);
  if (name === userName) {
    className = 'myUser';
  } else {
    className = 'anotherUser';
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
};


refs.file.addEventListener('change', e => {
  const file = e.target.files[0];
  const FR = new FileReader();
  FR.readAsDataURL(file);
  FR.addEventListener('load', function (e) {
    myFile = e.target.result;
    avatarImg.src = myFile;
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
    myFile = 'https://image.flaticon.com/icons/png/512/18/18436.png'
  }
}


function saveToLocal() {
  localStorage.removeItem('local')
  let local = {
    name: userName,
    image: myFile
  }
  localStorageLoader.save('local', local)
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
    alert('Введите имя')
  } else {
    newName(e.target.elements.userName.value);
    saveToLocal()
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
  const {
    name,
    image
  } = localStorageLoader.load('local');
  if (name !== undefined) {
    e.target.body.children.registration.children.userNameForm.elements.userName.value = name;
  }
  if (image !== undefined) {
    avatarImg.src = image
    myFile = image
  }
  // console.dir(e.target.body.children.registration.children.userNameForm.elements)
});

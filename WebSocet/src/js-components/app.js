import messageTemplate from '../templates/message.hbs';

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
ws.onmessage = ({ data }) => {
  let currentDate = getDate();
  const { cords, message, name, image } = JSON.parse(data);
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

// function createMessage(currentDate, name, message) {
//   const newMessage = document.createElement('li');
//   newMessage.textContent = currentDate + ':   ' + name + ': ' + message;
//   refs.massege.appendChild(newMessage);
// }

refs.file.addEventListener('change', e => {
  const file = e.target.files[0];
  const FR = new FileReader();
  FR.readAsDataURL(file);
  FR.addEventListener('load', function(e) {
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
  // if (userName === '')
  userName = inputName;
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
  newName(e.target.elements.userName.value);
  e.target.elements.userName.value = '';
  visibleChat();
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

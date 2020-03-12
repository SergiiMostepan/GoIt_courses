'use strict';

const refs = {
  form: document.querySelector('.form'),
};

const actions = {
  dataObj: [],
  getInfo({ login, gender, age, number, password }) {
    this.getGeolocation()
      .then(coords => {
        return {
          login: login.value,
          gender: gender.value,
          age: age.value,
          phone_number: number.value,
          password: password.value,
          geo_location: {
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
        };
      })
      .then(data => this.postToServer(data));
  },

  getGeolocation() {
    return new Promise(resolve => {
      navigator.geolocation.watchPosition(position => {
        resolve(position.coords);
      });
    });
  },
  postToServer(data) {
    fetch('https://venify.herokuapp.com/user/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(post => console.log(post))
      .catch(error => console.log(error + 'ОШИБКА!!!!'));
  },

  // Validation Fn...rewrite pls!!
  isValid(e) {
    let counter = true;
    const passVlid = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
    Array.from(e).forEach(element => {
      if (
        element.value === '' &&
        element.name !== 'button' &&
        element.name !== 'password'
      ) {
        element.classList.add('invalid');
        counter = false;
      } else if (
        element.value !== '' &&
        element.name !== 'button' &&
        element.name !== 'password'
      ) {
        element.classList.add('valid');
      }
    });

    if (e.password.value.match(passVlid) === null) {
      counter = false;
      e.password.classList.add('invalid');
    } else if (e.password.value.match(passVlid)) {
      e.password.classList.add('valid');
    }

    if (counter === true) actions.getInfo(e);
  },
};
// pls rewrite on top!!

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  actions.isValid(e.target.elements);
  // actions.getInfo(e.target.elements);
});

'use strict';

import Swiper from 'swiper';
import swiperTemplete from '../templates/swiper.hbs';

const refs = {
  form: document.querySelector('#input-form'),
  swiperWrapper: document.querySelector('.swiper-list'),
};

const actions = {
  dataObj: [],
  getInfo({ login, password }) {
    this.dataObj = {
      login: login.value,
      password: password.value,
    };
    this.postToServer(this.dataObj);
  },
  // postToServer(data) {
  //   fetch('https://venify.herokuapp.com/user/login', {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     headers: {
  //       'Content-Type': 'application/json; charset=UTF-8',
  //     },
  //   })
  //     .then(response => {
  //       return response.json();
  //       // if (response.status === 200)
  //       //   document.location.href =
  //       //   'https://maxwillow.github.io/love_lodestone/index.html';
  //     })
  //     .then(data => data.token)
  //     .then(responseToken => this.getLikes(responseToken))
  //     .catch(error => console.log(error + 'ОШИБКА!!!!'));
  // },

  async postToServer(dataObj) {
    try {
      const response = await fetch('https://venify.herokuapp.com/user/login', {
        method: 'POST',
        body: JSON.stringify(dataObj),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      const data = await response.json();
      const responseToken = data.token;
      this.getLikes(responseToken);
    } catch (err) {
      err = err + 'ERRROORR';
      throw err;
    }
  },

  // getLikes(responseToken) {
  //   fetch('https://venify.herokuapp.com/user/mathchedList', {
  //     headers: {
  //       authorization: responseToken,
  //     },
  //   })
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(data => data.map(user => user.image_list[0]))
  //     .then(arrUserPhotos => {
  //       // console.log(arrUserPhotos);
  //       return {
  //         photo: arrUserPhotos,
  //       };
  //     })
  //     .then(objPhoto => {
  //       console.log(objPhoto);
  //       refs.swiperWrapper.insertAdjacentHTML(
  //         'beforeend',
  //         swiperTemplete(objPhoto),
  //       );
  //     })
  //     .then(data => {
  //       this.initSwiper();
  //     })
  //     .catch(error => console.log(error + 'ОШИБКА!!!!'));
  // },

  async getLikes(responseToken) {
    try {
      const response = await fetch(
        'https://venify.herokuapp.com/user/mathchedList',
        {
          headers: {
            authorization: responseToken,
          },
        },
      );
      const data = await response.json();

      const arrUserPhotos = await data.map(user => user.image_list[0]);

      const objPhoto = {
        photo: arrUserPhotos,
      };
      console.log(objPhoto);
      refs.swiperWrapper.insertAdjacentHTML(
        'beforeend',
        swiperTemplete(objPhoto),
      );

      this.initSwiper();
    } catch (err) {
      throw err;
    }
  },

  initSwiper() {
    const mySwiper = new Swiper('.swiper-container', {
      //   direction: 'vertical',
      //   loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      //   scrollbar: {
      //     el: '.swiper-scrollbar',
      //   },
    });
  },
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  actions.getInfo(e.target.elements);
});

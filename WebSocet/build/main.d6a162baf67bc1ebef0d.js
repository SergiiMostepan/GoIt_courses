(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"6yvc":function(e,a,n){var t=n("mp5j");e.exports=(t.default||t).template({compiler:[8,">= 4.3.0"],main:function(e,a,n,t,s){var l,r=null!=a?a:e.nullContext||{},o=e.hooks.helperMissing,c="function",i=e.escapeExpression;return'<li class="message '+i(typeof(l=null!=(l=n.className||(null!=a?a.className:a))?l:o)===c?l.call(r,{name:"className",hash:{},data:s,loc:{start:{line:1,column:19},end:{line:1,column:32}}}):l)+'">\r\n    <img class="image" src="'+i(typeof(l=null!=(l=n.image||(null!=a?a.image:a))?l:o)===c?l.call(r,{name:"image",hash:{},data:s,loc:{start:{line:2,column:28},end:{line:2,column:37}}}):l)+'">\r\n    <div class="message-body">\r\n        <span class="user-name">'+i(typeof(l=null!=(l=n.name||(null!=a?a.name:a))?l:o)===c?l.call(r,{name:"name",hash:{},data:s,loc:{start:{line:4,column:32},end:{line:4,column:40}}}):l)+'</span>\r\n        <div class="mesage-content">\r\n            <div class="message-text">'+i(typeof(l=null!=(l=n.message||(null!=a?a.message:a))?l:o)===c?l.call(r,{name:"message",hash:{},data:s,loc:{start:{line:6,column:38},end:{line:6,column:49}}}):l)+'</div>\r\n            <div class="message-time">'+i(typeof(l=null!=(l=n.currentDate||(null!=a?a.currentDate:a))?l:o)===c?l.call(r,{name:"currentDate",hash:{},data:s,loc:{start:{line:7,column:38},end:{line:7,column:53}}}):l)+"</div>\r\n        </div>\r\n    </div>\r\n</li>"},useData:!0})},L1EO:function(e,a,n){},QfWi:function(e,a,n){"use strict";n.r(a);n("L1EO"),n("ZXyM"),n("D/wG"),n("e+qc");var t,s,l,r=n("6yvc"),o=n.n(r),c={massege:document.querySelector("#chat"),form:document.querySelector("#inputForm"),asyncMap:document.querySelector('[data-name="async"]'),file:document.querySelector("#file"),userNameForm:document.querySelector("#userNameForm"),chatSection:document.querySelector(".chatSection"),registrationSection:document.querySelector(".registration"),changeDataButton:document.querySelector("#changeData"),avatarImg:document.querySelector("#avatarImg")},i="",m={};function u(e){return String(e).padStart(2,"0")}navigator.geolocation.getCurrentPosition((function(e){m.lat=e.coords.latitude,m.lng=e.coords.longitude})),c.asyncMap.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB7Zkwv8ZHein66BAALTpWsJAQorKjiTlw",c.asyncMap.type="text/javascript",c.asyncMap.onload=function(){s=new google.maps.Map(document.getElementById("map"),{zoom:10,center:m})};var d=new WebSocket("wss://venify.herokuapp.com/chat");d.onmessage=function(e){var a,n=e.data,t=u((a=new Date).getHours())+":"+u(a.getMinutes())+":"+u(a.getSeconds()),r=JSON.parse(n),m=r.cords,d=r.message,g=r.name,p=r.image;l=g===i?"myUser":"anotherUser";var v=o()({message:d,name:g,image:p,currentDate:t,className:l});c.massege.insertAdjacentHTML("beforeend",v);new google.maps.Marker({position:m,map:s})},c.file.addEventListener("change",(function(e){var a=e.target.files[0],n=new FileReader;n.readAsDataURL(a),n.addEventListener("load",(function(e){t=e.target.result,avatarImg.src=t}))}));c.userNameForm.addEventListener("submit",(function(e){var a;e.preventDefault(),a=e.target.elements.userName.value,i=a,e.target.elements.userName.value="",c.chatSection.classList.add("visible"),c.registrationSection.classList.add("invisible")})),c.changeDataButton.addEventListener("click",(function(e){e.preventDefault(),c.registrationSection.classList.toggle("invisible"),c.chatSection.classList.toggle("visible")})),c.form.addEventListener("submit",(function(e){var a;e.preventDefault(),a=e.target.elements.inputField.value,d.send(JSON.stringify({cords:m,message:a,name:i,image:t})),e.target.elements.inputField.value=""}))}},[["QfWi",1,2]]]);
//# sourceMappingURL=main.d6a162baf67bc1ebef0d.js.map
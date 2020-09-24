const loading = document.getElementById('loading');
const clearLoading = new Promise((resolve, reject) => {
  setTimeout(() => loading ? resolve(loading) : reject('Error'), 2000);
});

const wrap = document.getElementById('wrap');
const showContent = new Promise((resolve, reject) => {
  setTimeout(() => wrap ? resolve(wrap) : reject('Error'), 2000);
});

const time = new Date();
const getTime = new Promise((resolve, reject) => {
  setTimeout(() => time ? resolve(time) : reject('Error'), 2000);
});

const url = window.location.toString();
const getUserName = (url) => {
  let urlSplit = url.split('=');
  let urlName = urlSplit[1];
  if (urlName == undefined) {
    urlName = 'voytov93';
  }
  return urlName;
};

const getName = new Promise((resolve, reject) => {
  setTimeout(() => getUserName ? resolve(getUserName) : reject('Имя не найдено'), 2000);
});

Promise.all([clearLoading, showContent, getTime, getName])
  .then(preloading => loading.style.display = 'none')
  .then(content => wrap.style.display = 'block')
  .then(() => fetch(`https://api.github.com/users/${getUserName(url)}`))
  .then(res => res.json())
  .then(userInfo => {
    let name = userInfo.name;
    let bio = userInfo.bio;
    let avatar = userInfo.avatar_url;
    let page = userInfo.html_url;

    let addName = () => {
      let getName = document.getElementById('userName');
      getName.innerHTML = name;
    };

    let addBio = () => {
      let getBio = document.getElementById('userStatus');
      getBio.innerHTML = bio;
    };

    let addAvatar = () => {
      let getAvatar = document.getElementById('userFoto');
      getAvatar.setAttribute('src', avatar);
    };

    let addPage = () => {
      let getPage = document.getElementById('userUrl');
      getPage.setAttribute('href', page);
    };

    let addTime = () => {
      let nowTime = document.createElement('p');
      nowTime.innerHTML = time;
      document.body.appendChild(nowTime);
    };

    addName();
    addBio();
    addAvatar();
    addPage();
    addTime();
  })

  .catch(err => document.body.innerHTML = 'Информация о пользователе не доступна!');
// http.js
const getBaseUrl = () => {
    let url;
    switch(process.env.NODE_ENV) {
      case 'production':
        url = 'https://b-mood-for-music.ntub.edu.tw/api/';
        break;  
      case 'development':
      default:
        url = 'http://localhost:8000/api/';
    }
  
    return url;
  }
  // https://mood-for-music.ntub.edu.tw/ 是前端的網址
  // https://b-mood-for-music.ntub.edu.tw/ 是後端的網址
  export default getBaseUrl()
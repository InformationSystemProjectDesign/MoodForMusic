// http.js
const getBaseUrl = () => {
    let url;
    switch(process.env.NODE_ENV) {
      case 'production':
        url = 'https://stackoverflow.com';
        break;
      case 'development':
      default:
        url = 'http://localhost:8000/api/';
    }
  
    return url;
  }
  
  export default getBaseUrl()
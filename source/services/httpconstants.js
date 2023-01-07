const TOKEN_KEY = 'jwt_descomui';

const COM_BASE_URL = "http://192.168.15.27:8080/desauth/"

function setAuthorizationHeader(token) {
    let auth = localStorage.getItem(TOKEN_KEY);
    let config = {
        headers: {
            Authorization: 'Bearer ' + auth,
            'Cache-Control': 'no-cache'
        }
    };
    return config;
}

module.exports = {
    COM_BASE_URL,
    setAuthorizationHeader,
};

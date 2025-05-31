
function getToken() {
  return localStorage.getItem('token');
}

function removeToken() {
  localStorage.removeItem('token');
}

function setToken(token) {
  localStorage.setItem('token', token);
}
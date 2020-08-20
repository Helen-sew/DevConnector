//function that take in the token. To check if the token is in
//the localstorage, if there is, use axios to add it into global header or else delete it from header
import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;

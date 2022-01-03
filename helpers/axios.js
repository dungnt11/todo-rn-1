import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
  baseURL: 'https://todo.ehandytech.com/',
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
  }
});

instance.setToken = (token) => {
  instance.defaults.headers['jwt'] = token;
  AsyncStorage.setItem('jwt', token);
}

instance.interceptors.response.use((response) => {
  const {isRefreshToken, token} = response.data;

  if (isRefreshToken) {
    instance.setToken(token);
    const config = response.config
    config.headers['jwt'] = token
    config.baseURL = 'https://todo.ehandytech.com/'
    return instance(config);
  }

  return response
}, (error) => {
  console.log(error)
  return Promise.reject(error)
});

export default instance;
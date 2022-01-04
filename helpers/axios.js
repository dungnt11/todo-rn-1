import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
  baseURL: 'https://todo.ehandytech.com/',
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
  }
});

instance.interceptors.response.use(async (response) => {
  const {isRefreshToken, token} = response.data;

  if (isRefreshToken) {
    const config = response.config
    config.headers['jwt'] = token
    config.baseURL = 'https://todo.ehandytech.com/';
    await AsyncStorage.setItem('jwt', token);
    return instance(config)
  }

  return response;
}, (error) => {
  console.log(error)
  return Promise.reject(error)
});

export default instance;
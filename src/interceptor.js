// Some of this code was used from https://blog.liplex.de/axios-interceptor-to-refresh-jwt-token-after-expiration/
import axios from 'axios';
import { Promise } from "es6-promise";
import router from './router.js';
import { store } from './store/store.js'

export default function interceptors() {
  axios.interceptors.request.use(function (config) {
    const token = store.getters['getTokens'];
    if (token)
      config.headers.Authorization = "Bearer " + token.getToken();

    return config
  })

  axios.interceptors.response.use((response) => {
    // Return a successful response back to the calling service
    return response;
  }, (error) => {
    // Return any error which is not due to authentication back to the calling service
    if (error.response.status != 401) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    let tokenStorage = store.getters['getTokens']

    if (tokenStorage) {
      // Logout user if token refresh didn't work or user is disabled
      if (error.config.url == 'http://192.168.0.102:8000/api/token/refresh/' || error.response.message == 'Account is disabled.') {

        tokenStorage.clear();
        router.push({ name: 'login' });

        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      // Try request again with new token
      return tokenStorage.getNewToken()
        .then((token) => {

          // New request with new token
          const config = error.config;
          config.headers['Authorization'] = `Bearer ${token}`;

          return new Promise((resolve, reject) => {
            axios.request(config).then(response => {
              resolve(response);
            }).catch((error) => {
              reject(error);
            })
          });

        })
        .catch((error) => {
          Promise.reject(error);
        });
    } else {
      router.push({ name: 'login' });
      
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  });
}
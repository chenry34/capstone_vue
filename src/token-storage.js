import axios from 'axios';
import { Promise } from 'es6-promise';

export default class TokenStorage {

  constructor(token, refresh) {
    this.LOCAL_STORAGE_TOKEN = 'token';
    this.LOCAL_STORAGE_REFRESH_TOKEN = 'refresh';
    this.storeToken(token)
    this.storeRefreshToken(refresh)
  }

  isAuthenticated() {
    return this.getToken() !== null;
  }

  getAuthentication() {
    return {
      headers: { 'Authorization': 'Bearer ' + this.getToken() }
    };
  }

  getNewToken() {
    return new Promise((resolve, reject) => {
      axios.post("http://localhost:8000/api/token/refresh/", { refresh: localStorage.getItem("refresh")})
        .then(response => {
          this.storeToken(response.data.access);
          resolve(response.data.access);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  storeToken(token) {
    localStorage.setItem(this.LOCAL_STORAGE_TOKEN, token);
  }

  storeRefreshToken(refreshToken) {
    localStorage.setItem(this.LOCAL_STORAGE_REFRESH_TOKEN, refreshToken);
  }

  clear() {
    localStorage.removeItem(this.LOCAL_STORAGE_TOKEN);
    localStorage.removeItem(this.LOCAL_STORAGE_REFRESH_TOKEN);
  }

  getRefreshToken() {
    return localStorage.getItem(this.LOCAL_STORAGE_REFRESH_TOKEN);
  }

  getToken() {
    return localStorage.getItem(this.LOCAL_STORAGE_TOKEN);
  }
}
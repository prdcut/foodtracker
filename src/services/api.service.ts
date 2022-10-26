import axios, { AxiosRequestConfig, AxiosStatic } from 'axios';

export default class ApiService {
  protected url = 'https://foodtrackbackend.herokuapp.com';
  protected token = localStorage.getItem('token')?.slice(1, -1);
  protected $http: AxiosStatic = axios;
  protected defaultConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    },
  };

  async login(username: string, password: string) {
    // console.log('loginApi');

    const url = `${this.url}/login?username=${username}&password=${password}`;
    const httpResponse = await this.$http.post(url);
    return httpResponse;
  }

  async register(data: any) {
    // console.log('registerApi');

    const url = `${this.url}/users`;
    const httpResponse = await this.$http.post(url, data);
    return httpResponse;
  }
}

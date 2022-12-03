import axios, { AxiosRequestConfig, AxiosStatic } from 'axios';
import { IDiaryEntry, IMacros, IUser } from '@/models/model';

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

  async getUserData(username: string | null): Promise<IUser> {
    // console.log('getUserData');

    const url = `${this.url}/users/${username}`;
    const httpResponse = await this.$http.get(url, this.defaultConfig);
    return httpResponse.data;
  }

  async putUserData(
    username: string | null,
    data: IMacros | IUser
  ): Promise<IUser> {
    // console.log('putUserData', data);

    const url = `${this.url}/users/${username}`;
    const httpResponse = await this.$http.put(url, data, this.defaultConfig);
    return httpResponse.data;
  }

  async postDiaryEntry(
    username: string,
    data: Partial<IDiaryEntry> | any
  ): Promise<IUser> {
    // console.log('postDiaryEntry', data);

    const url = `${this.url}/users/${username}/diary`;
    const httpResponse = await this.$http.post(url, data, this.defaultConfig);
    return httpResponse.data;
  }

  async getFoodList() {
    // console.log('getFoodList');

    const url = `${this.url}/food-list`;
    const httpResponse = await this.$http.get(url, this.defaultConfig);
    return httpResponse.data;
  }

  async getFoodItem(name: string) {
    // console.log('getFoodItem', name);

    const url = `${this.url}/food-list/${name}`;
    const httpResponse = await this.$http.get(url, this.defaultConfig);
    return httpResponse.data;
  }
}

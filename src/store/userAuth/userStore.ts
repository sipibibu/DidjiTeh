import {IUser, IUserAuth} from "../../models/IUser.ts";
import AuthService from "../../services/AuthService.ts";
import { makeAutoObservable } from "mobx";
import { dropToken, saveToken } from "../../utils/token.ts";

class UserStore {
  isLogin = false;
  user = {} as IUser;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(email: string, role: string) {
    this.user.email = email
    this.user.role = role
  }

  setLogin(login: boolean) {
    this.isLogin = login;
  }


  async registration(userAuth: IUserAuth) {
    try {
      await AuthService.registration(userAuth);
    } catch (e) {
      dropToken();
      console.log(e);
    }
  }

  async login(login: string, password: string) {
    try {
      const response = await AuthService.login(login, password);
      saveToken(response.data.access_jwt_token);
      console.log(response)
      this.setUser(response.data.email, response.data.role)
      this.setLogin(true);
    } catch (e) {
      dropToken();
      console.log(e);
    }
  }

  async authorization(userAuth: IUserAuth) {
    try {
      await this.registration(userAuth);
      await this.login(userAuth.email, userAuth.password);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UserStore();

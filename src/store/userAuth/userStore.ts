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

  setUser(login: string) {
    this.user.login = login.split(' ')[4]
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
      this.setUser(response.data.message)
      this.setLogin(true);
    } catch (e) {
      dropToken();
      console.log(e);
    }
  }

  async authorization(userAuth: IUserAuth) {
    try {
      await this.registration(userAuth);
      await this.login(userAuth.login, userAuth.password);
    } catch (e) {
      console.log(e);
    }
  }

  // async getAccount() {
  //   try {
  //     const response = await ProfileService.getAccount();
  //     this.isLogin = true;
  //     if (response.roles[0] == "Respondent") {
  //       this.setRole(Role.Respondent);
  //       this.setRespondent({
  //         name: response.firstName,
  //         surname: response.lastName,
  //         login: response.email,
  //         role: response.roles[0],
  //         additionalData: {
  //           imageUrl: response.image,
  //           age: response.age,
  //           education: response.education,
  //           interests: response.interests,
  //         },
  //       });
  //     } else {
  //       this.setRole(Role.Manager);
  //       this.setManager({
  //         name: response.firstName,
  //         surname: response.lastName,
  //         login: response.email,
  //         role: response.roles[0],
  //         additionalData: {
  //           companyName: response.company.title,
  //           description: response.company.description,
  //         },
  //       });
  //     }
  //   } catch (e) {
  //     this.setRole(Role.NoAuth);
  //     dropToken();
  //     console.log(e);
  //   }
  // }
  //
  // async logout() {
  //   try {
  //     dropToken();
  //     this.setLogin(false);
  //     this.setRole(Role.NoAuth);
  //     this.setRespondent({} as IRespondent);
  //     this.setManager({} as IManager);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
}

export default new UserStore();

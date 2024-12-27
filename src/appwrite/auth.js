import config from "../config/config";
import { ID, Client, Account } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  //Singup User
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID, email, password, name);
      if (userAccount) {
        //Cal another method
        return this.Login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error("Faild to create Account.");
    }
  }

  //Login
  async Login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Faild to login");
    }
  }

  //Get current user
  async getCurrentUser() {
    try {
      return await this.account.get();
     
    } catch (error) {
      console.log("Unable to fetch error appwriteServie  ", error);
    }
    return null;
  }

  //logout
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Unable to faild the error", error);
    }
  }
}

const authService = new AuthService();

export default authService;

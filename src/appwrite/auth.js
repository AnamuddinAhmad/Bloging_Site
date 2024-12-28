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

  //Signup User
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        //Call another method
        return this.Login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error("Failed to create Account.");
    }
  }

  //Login
  async Login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
      
    } catch (error) {
      console.log("Failed to login");
    }
  }

  //Get current user
  async getCurrentUser() {
    try {
       const user = await this.account.get();
       return user;
     
    } catch (error) {
      console.log("Unable to fetch error appwriteService :: ", error.message);
    }
    return null;
  }

  //logout
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Failed to logout", error);
    }
  }
}

const authService = new AuthService();

export default authService;

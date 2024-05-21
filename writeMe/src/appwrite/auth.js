import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId);

        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}) {
        try {
            const registredUser = this.account.create(ID.unique, email, password, name)
            if(registredUser) {
               //after registering redirect to login
               return this.login({email,password})
            } else {
                return registredUser;
            }

        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password) 
        } catch (error) {
            throw error
        }
    }

    async getCurrUser () {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Getting user error", error) 
        }
        return null;
    }

    async logout() { 
        try {
            const loggedoutUser = await this.account.deleteSessions();
            if (loggedoutUser) {
                console.log("Loggedout user", loggedoutUser)
                return loggedoutUser;
            }
        } catch (error) {
            throw error 
        }
    }
}

const authService = new AuthService();

export default authService;
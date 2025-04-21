import conf from "../conf/conf";
import {Client, Account, ID, } from 'appwrite';

export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
                    .setEndpoint(conf.appwriteUrl)
                    .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }
    async createAccount({email, password, name}){
        try {
            const id = ID.unique()
            const userAccount = await this.account.create(id, email, password, name);
            console.log(userAccount)
            if(userAccount){
                const Acc = await this.login({
                    email: userAccount.email,
                    password: password
                })
                console.log(Acc)
            }
            }
         catch (error) {
            console.log("Appwriet Services :: Error in Create Account: \n", error);
        }
        
    }
    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
            
        } catch (error) {
            console.log("Appwriet Services :: Error in Login\n", error);
            return error
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwriet Services :: Error in Getting Current User\n", error);
        }
        return null;
    }
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwriet Services :: Error in Logout\n", error);
        }
    }

    
    // async getUserById(userId){
    //     return await this.client.get
    // }
}

const authService = new AuthService();

export default authService;
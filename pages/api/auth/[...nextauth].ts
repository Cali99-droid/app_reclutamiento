import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google';
import Credentials from "next-auth/providers/credentials"
import {  dbUsers } from "../../../database"


declare module "next-auth" {
    interface Session {
      accessToken?: string;
    }
  }
export default NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
   
    Credentials({
        name:'Custom login',
        credentials:{
            email:{label:'Corrreo', type:'email', placeholder:'correo@cooree.com'},
            password:{label:'Contraseña', type:'password', placeholder:'contraseña'},
        },
        async authorize(credentials){
            return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);

        }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
     }),

    // GithubProvider({
    //     clientId: process.env.GITHUB_ID!,
    //     clientSecret: process.env.GITHUB_SECRET!
    //   }),
      


  ],


  pages:{
    signIn:'/auth/login',
    newUser:'/auth/register',
  },

  session:{
    maxAge:2592000,
    strategy:'jwt',
    updateAge:86400

  },
  callbacks:{
    async jwt({token, account,user}) {

        if(account){
            token.accessToken = account.access_token;

            switch (account.type) {
                case 'credentials':
                      token.user = user;
                    break;
                case 'oauth':
                   
                    token.user = await dbUsers.oAuthToDbUser(user?.email || '', user?.name || '', user?.image || '')
                    
                    break;
                default:
                    break;
            }

        }


        return token;
        
    },
    async session({session, token, user}) {
     
        session.accessToken = token.acceseToken as any;
        session.user = token.user as any
        return session;
    },


  }
})
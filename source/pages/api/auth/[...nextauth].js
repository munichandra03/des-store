import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser } from "../../../services/authUser";
import axios from "axios";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // credentials: {},
      async authorize(credentials, req) {
        const { username, password, collection, nodesearch } = credentials;

        let userData = {};
        userData.username = username;
        userData.password = password;
        userData.searchEnv = nodesearch;
        userData.collection = collection;
        return axios
          .post(
            `${process.env.NEXT_PUBLIC_STRAPI_API}/users/external/authenticate`,
            userData
          )
          .then((response) => {
            Object.assign(
              response.data,
              { searchEnv: nodesearch },
              { collection: collection }
            );

            return response.data;
          })
          .catch((error) => {
            throw new Error(error.response.data.message);
          });
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (token && user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, user, token }) {
      if (session) {
        session.user = token.user;
        return session;
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};

export default NextAuth(authOptions);

import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import type { Session, User } from 'next-auth';

interface ExtendedUser extends User {
  role?: string;
}

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      profile(profile) {
        console.log("Google profile:", profile);
        return {
          ...profile,
          id: profile.sub,
          role: "user", // Default role for Google users
        };
      },
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "Your email"
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Your password"
        }
      },
      async authorize(credentials) {
        try {
          const res = await fetch("https://akil-backend.onrender.com/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password
            })
          });

          if (!res.ok) {
            throw new Error("Invalid credentials");
          }

          const user = await res.json();

          return {
            id: user.id,
            name: user.username,
            email: user.email,
            role: user.role || "user"
          };
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      }
    })
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const signupRes = await fetch("https://akil-backend.onrender.com/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              password: "my-google-oauth-password", 
              confirmPassword: "my-google-oauth-password",
              role: "user",
            }),
          });

          const signupResult = await signupRes.json();

          if (!signupRes.ok || signupResult.success === false) {
            if (signupResult.message === "User already exists with the given email") {
              return true;
            }

            console.error("Google signup failed:", signupResult.message || signupRes.statusText);
            return false;
          }

          return true;

        } catch (err) {
          console.error("Google signup error:", err);
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user }: { token: JWT; user?: ExtendedUser }) {
      if (user) token.role = user.role;
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) session.user.role = token.role;
      return session;
    },
  },
};
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '../../prisma/prisma-client'
import { compare, hashSync } from 'bcrypt'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null

        const values = {
          email: credentials.email,
        }

        const findUser = await prisma.user.findFirst({
          where: values,
        })

        if (!findUser) {
          throw new Error('Invalid email or password')
        }

        const isPasswordValid = await compare(credentials.password, findUser.password)

        if (!isPasswordValid) {
          throw new Error('Invalid email or password')
        }

        if (!findUser.verified) {
          throw new Error('Verify your email')
        }

        return {
          id: String(findUser.id),
          email: findUser.email,
          name: findUser.fullName,
          role: findUser.role,
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === 'credentials') {
          return true
        }

        console.log(user, account)

        if (!user.email) {
          return false
        }

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [
              {
                provider: account?.provider,
                providerId: account?.providerAccountId,
              },
              { email: user.email },
            ],
          },
        })

        if (findUser) {
          await prisma.user.update({
            where: {
              id: findUser.id,
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          })
          return true
        }

        await prisma.user.create({
          data: {
            email: user.email,
            fullName: user.name || 'User #' + user.id,
            password: hashSync(user.id.toString(), 10),
            verified: new Date(),
            provider: account?.provider,
            providerId: account?.providerAccountId,
          },
        })

        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async jwt({ token }) {
      const findUser = await prisma.user.findFirst({
        where: {
          email: token.email!,
        },
      })

      if (findUser) {
        token.id = String(findUser.id)
        token.email = findUser.email
        token.fullName = findUser.fullName
        token.role = findUser.role
        token.phone = findUser.phone
      }

      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = String(token.id)
        session.user.role = token.role
      }

      return session
    },
  },
}

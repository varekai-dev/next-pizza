import { User } from '@prisma/client'

import { ApiRoute } from '@/@types'

import { axiosInstance } from './instance'

export const getMe = async () => {
  const { data } = await axiosInstance.get<User>(ApiRoute.AUTH_ME)

  return data
}

export const verifyEmail = async (code: string) => {
  await axiosInstance.post(ApiRoute.AUTH_ME, { code })
}

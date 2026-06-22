'use server'

import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient()

export async function subscribeUser(formData: FormData) {
  const email = formData.get('email') as string

  if (!email) return { error: 'E-posta gerekli!' }

  try {
    await prisma.subscriber.create({
      data: { email }
    })
    return { success: true }
  } catch (error) {
    return { error: 'Veritabanına kaydedilemedi.' }
  }
}
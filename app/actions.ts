'use server'

import { PrismaClient } from './generated/prisma'

// Singleton: Uygulama çalıştığı sürece tek bir PrismaClient örneği kullanır
const globalForPrisma = global as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function subscribeUser(formData: FormData) {
  const email = formData.get('email') as string

  if (!email) return { error: 'E-posta gerekli!' }

  try {
    await prisma.subscriber.create({
      data: { email }
    })
    return { success: true }
  } catch (error) {
    console.error("Veritabanı hatası:", error)
    return { error: 'Veritabanına kaydedilemedi.' }
  }
}
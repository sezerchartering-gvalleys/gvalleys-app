'use client' // Bu sayfa artık interaktif (form işleyebilir)
import { subscribeUser } from './actions'
import { useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState('')

  async function clientAction(formData: FormData) {
    const result = await subscribeUser(formData)
    if (result.error) setMessage('Hata: ' + result.error)
    else setMessage('Başarıyla abone oldunuz!')
  }

  return (
    <main style={{ padding: '50px', textAlign: 'center' }}>
      <h1>GValleys'e Hoş Geldiniz!</h1>
      <form action={clientAction}>
        <input name="email" type="email" required placeholder="E-posta" />
        <button type="submit">Abone Ol</button>
      </form>
      <p>{message}</p>
    </main>
  )
}
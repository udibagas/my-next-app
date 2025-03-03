'use client';

import { useRouter } from "next/navigation";

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <div className="text-center p-8">
      <h1 className="text-3xl">Contact</h1>

      <div className="flex justify-center space-x-4 mt-4">
        <button onClick={() => router.push('/contact/email')} className="bg-red-500 text-white py-2 px-4 rounded">Email</button>
        <button onClick={() => router.push('/contact/whatsapp')} className="bg-green-500 text-white py-2 px-4 rounded">WhatsApp</button>
        <button onClick={() => router.push('/contact/telegram')} className="bg-blue-500 text-white py-2 px-4 rounded">Telegram</button>
      </div>

      <div className="mt-8">
        {children}
      </div>
    </div>
  )
}
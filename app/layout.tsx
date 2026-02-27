import './globals.css'
import { Outfit } from 'next/font/google'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '600', '800']
})

export const metadata = {
  title: 'Cartão Crisma',
  description: 'Você é importante'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={outfit.className}>
        {children}
      </body>
    </html>
  )
}
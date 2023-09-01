import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '"LJ family" 홈페이지',
  description: '2023년 9월 1일부터 시작한 "LJ family" 홈페이지 입니다.',
  keywords: "가족, 장용운, 홈페이지"
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

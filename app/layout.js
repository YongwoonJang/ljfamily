import './layout.css'

export const metadata = {
  title: 'The LJ',
  description: '2023년 9월 1일부터 시작한 "이&장" 가족의 홈페이지 입니다.',
  keywords: "가족, 장용운, 홈페이지",
  openGraph: {
    images: '/images/opengraph-image.png'
  },

}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}

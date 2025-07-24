export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <Header /> */}
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  )
}
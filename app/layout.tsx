import { Logo } from "@/components/logo";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { UserDropdown } from "@/components/user-dropdown";
import { Session } from "next-auth";
import { StrapiApi } from "@/infra/api/strapi";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react"

const roboto = Roboto({
  weight: ["300", "400"],
  subsets: ["latin-ext", "cyrillic-ext", "greek-ext", "vietnamese", "cyrillic"],
});

const title = 'OC华人信息平台-橙县地区华人同城便民服务信息平台';
const description = '网站专为Orange County本地社区提供免费分类信息服务，帮助人们解决生活和工作所遇到的难题。我们提供了丰富的信息分类，涵盖了房产 二手车 招聘 交友 家居装修 生活服务等领域。通过这个平台，人们可以买卖物品，租赁房屋，寻找工作，结交朋友，获取生活服务等等。';

export const metadata: Metadata = {
  title: title,
  description:
    description,
  openGraph: {
    title: title,
    description:
      description,
  },
  twitter: {
    title: title,
    description: description
  },
  metadataBase: new URL('https://www.ochuaren.com'),
  icons: {
    apple: '/apple-icon.png',
  },
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession<{}, Session>(authOptions);
  const { data } = session
    ? await StrapiApi.Auth.getUser(session?.user.id ?? "")
    : { data: undefined };
  const {
    data: { data: homePage },
  } = await StrapiApi.Home.getPageData();
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className="flex flex-col items-center min-h-screen bg-white">
          <div className="container mx-auto rounded-lg py-5 grid grid-cols-4">
            <div></div>
            <div className="max-w-xs mx-auto col-span-2">
              <Logo src={"http://localhost:1337" + homePage.logo.url}  />
            </div>
            <div className="flex items-center justify-end">
              <div className="text-[1.1rem]">
                <UserDropdown user={data}></UserDropdown>
              </div>
            </div>
          </div>
          <div className="container">
            <div>{children}</div>
            <div className="bg-gray-600 h-24 w-full"></div>
          </div>
        </main>
        {process.env.NODE_ENV !== "development" && (
          <>
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-9TV1ELKDMB"></Script>
            <Script id="google-analytics">
              {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-9TV1ELKDMB');
          `}
            </Script>
            <Script
              id="adsense"
              strategy="afterInteractive"
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8346515677185758"
              crossOrigin="anonymous"
            ></Script>
          </>
        )}
        <Analytics />
      </body>
    </html>
  );
}

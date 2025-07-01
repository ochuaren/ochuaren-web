import { Logo } from "@/components/logo";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { StrapiApi } from "@/infra/api/strapi";

const roboto = Roboto({
  weight: ["300", "400"],
  subsets: ["latin-ext", "cyrillic-ext", "greek-ext", "vietnamese", "cyrillic"],
});

const title = "OC生活圈-专属ORANGE COUNTY本地的生活圈";
const description =
  "网站专为ORANGE COUNTY本地社区提供免费分类信息服务，帮助人们解决生活和工作所遇到的难题。我们提供了丰富的信息分类，涵盖了房产 二手车 招聘 交友 家居装修 生活服务等领域。通过这个平台，人们可以买卖物品，租赁房屋，寻找工作，结交朋友，获取生活服务等等。";

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
  },
  twitter: {
    title: title,
    description: description,
  },
  metadataBase: new URL("https://www.ochuaren.com"),
  icons: {
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: "/",
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
  const {
    data: { data: homePage },
  } = await StrapiApi.Home.getPageData();
  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV !== "development" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WPDLWQXP');`,
            }}
          />
        )}
      </head>
      <body className={roboto.className}>
        <main className="flex flex-col items-center min-h-screen bg-white">
          <div className="container mx-auto rounded-lg py-5 grid grid-cols-4">
            <div></div>
            <div className="max-w-xs mx-auto col-span-2">
              <Logo src={homePage.logo.url} />
            </div>
          </div>
          <div className="container">
            <div>{children}</div>
            <div className="bg-gray-600 h-24 w-full"></div>
          </div>
        </main>
        {process.env.NODE_ENV !== "development" && (
          <>
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-WPDLWQXP"
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              ></iframe>
            </noscript>
          </>
        )}
      </body>
    </html>
  );
}

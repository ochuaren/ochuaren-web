import { ImageResponse } from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 192,
  height: 192,
};
export const contentType = "image/png";

const icons: Record<string, string> = {
  activities: "activities2.png",
  "qing-gan-wen-da": "qing-gan-wen-da.png",
  news: "news4.png",
  "gong-zuo-zhao-pin": "jobs2.png",
  "shang-pin-mai-mai": "buy-sell2.png",
  shops: "shops4.png",
  rental: "rental2.png",
  "ti-yu-sai-shi": "ti-yu-sai-shi.png",
  "sheng-huo-lun-tan": "sheng-huo-lun-tan.png",
  "xiao-yuan-lun-tan": "xiao-yuan-lun-tan.png",
  "zhi-chang-tao-lun": "zhi-chang-tao-lun.png",
  "ben-di-jiao-you": "ben-di-jiao-you.png",
  "di-fang-tui-jian": "di-fang-tui-jian.png",
};

type Props = {
  params: { postId: number; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Icon({ params }: Props) {
  if (icons[params.slug]) {
    return new ImageResponse(
      (
        // ImageResponse JSX element
        <div
          style={{
            fontSize: 24,
            background: "black",
            backgroundImage: `url(https://www.ochuaren.com/icons/${
              icons[params.slug]
            })`,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        ></div>
      ),
      // ImageResponse options
      {
        // For convenience, we can re-use the exported icons size metadata
        // config to also set the ImageResponse's width and height.
        ...size,
      }
    );
  } else {
    return new ImageResponse(
      (
        // ImageResponse JSX element
        <div
          style={{
            fontSize: 24,
            background: "black",
            backgroundImage: `url(https://www.ochuaren.com/apple-icon.png)`,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        ></div>
      ),
      // ImageResponse options
      {
        // For convenience, we can re-use the exported icons size metadata
        // config to also set the ImageResponse's width and height.
        ...size,
      }
    );
  }
}

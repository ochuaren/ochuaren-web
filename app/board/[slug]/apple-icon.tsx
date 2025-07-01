import { StrapiApi } from "@/infra/api/strapi";
import { ImageResponse } from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 192,
  height: 192,
};

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Icon({ params }: Props) {
  const board = await StrapiApi.Board.getBoard(params.slug);
  if (board.status == 200) {
   return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
          }}
        >
          <img
            src={board.data.data[0].icon.url}
            width={160}
            height={160}
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      ),
      {
        width: 192,
        height: 192,
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
            backgroundImage: `url(https://www.veg.com/apple-icon.png)`,
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

import Image from "next/image";
import Link from "next/link";

export const Logo = ({src}: {src: string}) => (
  <div className="max-w-xs mx-auto">
    <Link href="/">
      <Image
        src={src}
        alt="logo"
        width={1000}
        height={396}
        priority={true}
        style={{ height: "auto", width: "100%" }}
      />
    </Link>
  </div>
);

import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { db } from "~/server/db";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await getMyImages();
  return (
    <>
      <SignedOut>
        <div className="flex p-4">
          <div className="text-2x1 h-full w-full font-bold">Please sign in</div>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex flex-wrap justify-center gap-4 p-4">
          {images &&
            images.map((image) => (
              <div key={image.id} className="w-fit justify-center">
                <Link
                  href={`/img/${image.id}`}
                  className="text-overflow-ellipsis flex flex-col gap-2 truncate"
                >
                  <Image
                    src={image.url!}
                    style={{ objectFit: "contain" }}
                    width={200}
                    height={200}
                    alt={image.name!}
                  />
                  {image.name}
                </Link>
              </div>
            ))}
        </div>
      </SignedIn>
    </>
  );
}

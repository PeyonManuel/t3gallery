import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
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
              <div
                key={image.id}
                className="flex h-40 w-52 flex-col items-center justify-between"
              >
                <Link
                  href={`/img/${image.id}`}
                  className="text-overflow-ellipsis flex h-full w-full flex-col items-center justify-between gap-2"
                >
                  <div className="h-full w-full overflow-hidden">
                    <Image
                      src={image.url!}
                      className="h-full w-full object-cover"
                      width={160}
                      height={208}
                      alt={image.name!}
                    />
                  </div>
                  <span className="w-full truncate text-center">
                    {image.name}
                  </span>
                </Link>
              </div>
            ))}
        </div>
      </SignedIn>
    </>
  );
}

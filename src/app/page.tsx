import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return (
    <main className="">
      <SignedOut>
        <div className="flex p-4">
          <div className="text-2x1 h-full w-full font-bold">Please sign in</div>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex flex-wrap gap-4">
          {images.map((image) => (
            <div key={image.id}>
              <Link
                href={image.url!}
                className="flex flex-col gap-2"
                target="_blank"
              >
                <img className="w-48" src={image.url!} alt={image.name!} />
                {image.name}
              </Link>
            </div>
          ))}
        </div>
      </SignedIn>
    </main>
  );
}

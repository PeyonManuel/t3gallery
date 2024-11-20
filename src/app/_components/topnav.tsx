import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/utils/uploadthing";

export function TopNav() {
  return (
    <nav className="text-x1 flex w-full items-center justify-between border-b p-4 font-semibold">
      <div>Gallery</div>

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UploadButton endpoint={"imageUploader"} />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}

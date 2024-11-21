import { clerkClient } from "@clerk/nextjs/server";
import { getMyImage } from "~/server/queries";

export default async function FullImagePageView({
  params,
}: {
  params: { id: number };
}) {
  const { id: imgId } = await params;

  const image = await getMyImage(imgId);
  const clerk = await clerkClient();
  const uploaderInfo = await clerk.users.getUser(image.userId);
  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-shrink items-center justify-center">
        <img
          className="flex-shrink object-contain"
          src={image.url!}
          alt={image.name!}
        />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col border-l">
        <div className="border-b p-2 text-center text-lg">{image.name}</div>
        <div className="flex flex-col p-2">
          <span>Uploaded By:</span>
          <span>{uploaderInfo.fullName}</span>
          <span>Created On</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

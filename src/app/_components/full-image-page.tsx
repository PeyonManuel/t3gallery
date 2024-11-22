import { clerkClient } from "@clerk/nextjs/server";
import { getMyImage } from "~/server/queries";
import ImageAndInfoPage from "./image-and-info-page";

export default async function FullImagePageView({
  params,
}: {
  params: { id: number; modal: boolean };
}) {
  const { id: imgId, modal } = await params;

  const image = await getMyImage(imgId);
  const clerk = await clerkClient();
  const uploaderInfo = await clerk.users.getUser(image.userId);

  return (
    <ImageAndInfoPage
      userfullName={uploaderInfo.fullName!}
      image={image}
      modal={modal}
    />
  );
}

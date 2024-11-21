import { getMyImage } from "~/server/queries";

export default async function FullImagePageView({
  params,
}: {
  params: { id: number };
}) {
  const { id: imgId } = await params;

  const image = await getMyImage(imgId);
  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex max-w-screen-lg flex-shrink items-center justify-center">
        <img
          className="flex-shrink object-contain"
          src={image.url!}
          alt={image.name!}
        />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col">
        <h1 className="text-2xl font-bold">{image.name}</h1>
      </div>
    </div>
  );
}

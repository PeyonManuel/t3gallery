import Image from "next/image";
import FullImagePageView from "~/app/_components/full-image-page";
import { Modal } from "~/app/_components/modal";

export default async function ImageModal({
  params,
}: {
  params: { id: string };
}) {
  const { id: imgId } = await params;

  return (
    <Modal>
      <FullImagePageView params={{ id: Number(imgId), modal: true }} />
    </Modal>
  );
}

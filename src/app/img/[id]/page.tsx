import Image from "next/image";
import React from "react";
import FullImagePageView from "~/app/_components/full-image-page";

export default async function ImageModal({
  params,
}: {
  params: { id: string };
}) {
  const { id: imgId } = await params;

  return <FullImagePageView params={{ id: Number(imgId) }} />;
}

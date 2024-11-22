// Client Component
import React, { useState } from "react";
import { LoadingSvg } from "~/utils/spinner";
import { Button } from "./ui/button";
import { deleteMyImage } from "~/server/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type ImageProps = {
  url: string | null;
  name: string | null;
  createdAt: Date;
  id: number;
  userId: string;
  updatedAt: Date | null;
};

export default function ImageAndInfoPage({
  image,
  userfullName,
  modal,
}: {
  image: ImageProps;
  userfullName: string;
  modal: boolean;
}) {
  return (
    <>
      <div
        id="img-info-container"
        className={"flex h-[90vh] w-full min-w-0 justify-center p-6"}
      >
        {/* Left Section: Image */}
        <div className="flex h-full items-center justify-center">
          <img
            id="image"
            className="h-full w-full object-cover" // Use object-cover to fill the container while maintaining aspect ratio
            src={image.url!}
            alt={image.name!}
          />
        </div>

        {/* Right Section: Information */}
        <div className="w-[25%] flex-shrink-0 flex-col border-l bg-white text-black">
          <div className="border-b p-2 text-center text-lg">{image.name}</div>
          <div className="flex flex-col p-2">
            <span>Uploaded By:</span>
            <span>{userfullName}</span>
            <span>Created On:</span>
            <span>{new Date(image.createdAt).toLocaleDateString()}</span>
            <form
              action={async () => {
                "use server";
                await deleteMyImage(image.id);
                redirect("/");
              }}
            >
              <div className="py-2">
                <Button type="submit" variant="destructive">
                  Delete
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

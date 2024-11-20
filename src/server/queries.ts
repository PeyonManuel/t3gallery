import "server-only";

import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
export const getMyImages = async () => {
  const user = await auth();
  if (!user || !user.userId) throw new Error("Unauthorized");
  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
};

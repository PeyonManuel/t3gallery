import { clerkMiddleware } from "@clerk/nextjs/server";

const isProduction = process.env.VERCEL_ENV === "production";

export default clerkMiddleware(async (auth, req) => {
  if (isProduction && req.nextUrl.pathname.startsWith("/api/uploadthing")) {
    // Bypass authentication for the UploadThing callback in non-production
    return;
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Exclude UploadThing API callback from the middleware
  ],
};

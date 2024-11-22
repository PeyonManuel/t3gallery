import { useRouter } from "next/navigation";
import { useUploadThing } from "~/utils/uploadthing";
import { toast } from "sonner";
import { LoadingSvg } from "~/utils/spinner";
import { usePostHog } from "posthog-js/react";
// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.routeConfig?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};
function UploadSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
      />
    </svg>
  );
}

export const SimpleUploadButton = () => {
  const router = useRouter();
  const posthog = usePostHog();
  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin() {
      posthog.capture("upload-begin");
      toast(
        <div className="flex items-center gap-2">
          <LoadingSvg /> <span>Uploading...</span>
        </div>,
        {
          id: "upload-begin",
          duration: Infinity,
        },
      );
    },
    onUploadError(error) {
      toast.dismiss("upload-begin");
      posthog.capture("upload-error", error);
      console.log();
      toast.error("Upload failed" + ", " + error.message, {
        className: "bg-red-500 border-red-500 text-white",
      });
    },
    onClientUploadComplete() {
      toast.dismiss("upload-begin");
      toast("Uploade complete!", {
        className: "bg-green-500 border-green-500 text-white",
      });
      router.refresh();
    },
  });
  return (
    <div>
      <label htmlFor="upload-button" className="cursor-pointer">
        <UploadSvg />
      </label>
      <input
        id="upload-button"
        {...inputProps}
        type="file"
        className="sr-only"
      />
    </div>
  );
};

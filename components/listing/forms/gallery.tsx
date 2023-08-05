import { updateImageUrls } from "features/boat/boatSlice";
import { useSelector, useDispatch } from "react-redux";
import { UploadCloud } from "lucide-react";
import { ChangeEvent, useState } from "react";
import useFetcher from "@/lib/hooks/use-axios";
import { LoadingCircle, LoadingSpinner } from "@/components/shared/icons";
import { CircularProgress } from "@mui/material";

const GalleryForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}: {
  values: any;
  errors: any;
  touched: any;
  handleChange: any;
  handleBlur: any;
}) => {
  const boatInfo = useSelector((state: any) => state.boat.boatInfo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState<any[]>(
    boatInfo.imageUrls ? [{ url: boatInfo.imageUrls }] : [],
  );
  const dispatch = useDispatch();

  const { fetchWithAuthSync } = useFetcher();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    let uploadedFiles = event.target.files;
    if (!uploadedFiles) return;
    let fileLength = uploadedFiles.length;

    for (let i = 0; i < fileLength; i++) {
      formData.append("pictures", uploadedFiles[i]);
    }

    setLoading(true);
    setError(null);
    setFiles([]);

    fetchWithAuthSync("/upload/public/BOAT", formData)
      .then((response) => {
        setLoading(false);
        setError(null);
        if (
          response.data?.uploadedFiles?.length &&
          response.data?.uploadedFiles?.length > 0
        ) {
          let imageUrl = response.data?.uploadedFiles?.map(
            (file: any) => file?.secureUrl,
          );

          dispatch(updateImageUrls(imageUrl));
          setFiles(response.data.uploadedFiles);
        } else {
          setFiles([]);
        }
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        setFiles([]);
      });
  };

  return (
    <div className="mt-0 px-4">
      <p className="text-xl font-semibold text-gray-900">Gallery</p>
      <hr className="mb-6 mt-3 h-px border-0 bg-gray-200" />

      <div className="w-full">
        <label
          htmlFor="pictures"
          className="flex flex-col items-center justify-center rounded-lg border p-10 shadow-sm drop-shadow-sm"
        >
          {loading ? (
            <div className="my-auto flex w-full items-center justify-center text-cyan-600">
              <CircularProgress color="inherit" size="7.5vh" />
            </div>
          ) : files.length > 0 ? (
            <div className="flex flex-col gap-2">
              {files.map((file, index) => (
                <img className="max-w-xs" key={index} src={file.url} alt="" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="mb-3 flex w-fit items-center justify-center rounded-full bg-gray-50 p-[10px]">
                <UploadCloud className="h-10 w-10 rounded-full bg-gray-100 p-[10px]" />
              </div>
              <p className="mb-1 text-center text-sm font-medium text-cyan-600">
                Click to upload
              </p>
              <p className="text-center text-xs">
                SVG, PNG, JPG or GIF (max. 800x400px)
              </p>
            </div>
          )}
        </label>
        <input
          multiple
          type="file"
          id="pictures"
          name="imageUrls"
          accept="image/svg, image/png, image/jpg, image/jpeg, image/gif"
          onChange={(event) => {
            handleChange(event);
            handleFileChange(event);
          }}
          className="invisible"
        />
        {errors.imageUrls && touched.imageUrls && (
          <p className="ml-1 text-sm text-orange-700">
            {errors.imageUrls as string}
          </p>
        )}
      </div>
    </div>
  );
};

export default GalleryForm;

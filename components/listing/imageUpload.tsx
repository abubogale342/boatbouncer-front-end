import { ChangeEvent, useState } from "react";
import { CircularProgress } from "@mui/material";
import { UploadCloud } from "lucide-react";
import useFetcher from "@/lib/hooks/use-axios";
import { useDispatch, useSelector } from "react-redux";
import { updateImageUrls } from "features/boat/boatSlice";

const ImageUpload = ({
  handleChange,
  errors,
  touched,
  index,
  values,
  name,
}: {
  handleChange: any;
  errors: any;
  touched: any;
  name: string;
  values: any;
  index: number;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const boatInfo = useSelector((state: any) => state.boat.boatInfo);
  const [file, setFile] = useState(boatInfo.imageUrls[index]);
  const dispatch = useDispatch();
  const { fetchWithAuthSync } = useFetcher();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    let uploadedFiles = event.target.files;
    if (!uploadedFiles) return;

    const formData = new FormData();

    formData.append("pictures", uploadedFiles[0]);

    setLoading(true);
    setError(null);
    setFile([]);

    fetchWithAuthSync("/upload/public/BOAT", formData)
      .then((response: any) => {
        setLoading(false);
        setError(null);
        if (
          response.data?.uploadedFiles?.length &&
          response.data?.uploadedFiles?.length > 0
        ) {
          let imageUrl = response.data?.uploadedFiles?.map(
            (file: any) => file?.secureUrl,
          );

          dispatch(updateImageUrls({ key: index, imageUrl: imageUrl[0] }));
          setFile(imageUrl[0]);
        } else {
          setFile([]);
        }
      })
      .catch((error: any) => {
        setError(error);
        setLoading(false);
        setFile([]);
      });
  };

  return (
    <div className="grid h-full w-full grid-cols-1">
      <label htmlFor={name} className="h-full w-full">
        {loading && (
          <div className="flex h-full w-full items-center justify-center text-cyan-600">
            <CircularProgress color="inherit" size="5vh" />
          </div>
        )}
        {!loading && !file && (
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="flex w-fit items-center justify-center rounded-full bg-gray-50 p-[10px]">
                <UploadCloud className="h-10 w-10 rounded-full bg-gray-100 p-[10px]" />
              </div>
              <p className="cursor-pointer text-center text-sm font-medium text-cyan-600">
                Click to upload
              </p>
              <p className="text-center text-xs">
                SVG, PNG, JPG or GIF (max. 800x400px)
              </p>
            </div>
          </div>
        )}

        {!loading && !!file && (
          <div className="relative h-full w-full">
            <img className="h-full w-full object-cover" src={file} alt="" />
          </div>
        )}
      </label>
      <input
        type="file"
        id={name}
        name={index === 0 ? "imageUrls" : name}
        accept="image/svg, image/png, image/jpg, image/jpeg, image/gif"
        onChange={(event) => {
          index === 0 ? handleChange(event) : null;
          handleFileChange(event);
        }}
        className="invisible hidden h-fit"
      />
    </div>
  );
};

export default ImageUpload;

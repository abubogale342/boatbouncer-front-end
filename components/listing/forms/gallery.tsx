import ImageUpload from "../imageUpload";

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
  return (
    <div className="mt-0 px-4">
      <p className="text-xl font-semibold text-gray-900">Gallery</p>
      <hr className="mb-6 mt-3 h-px border-0 bg-gray-200" />

      <div className="mb-5 w-full">
        <div className="flex w-full flex-col gap-6 sm:flex-row">
          <div className="min-h-[17rem] w-full rounded-lg border p-2.5 shadow-sm drop-shadow-sm sm:min-h-[18rem] sm:w-2/3 sm:p-2.5">
            <ImageUpload
              name="mainPic"
              index={0}
              {...{
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
              }}
            />
            {errors.imageUrls && touched.imageUrls && (
              <p className="-mt-2.5 text-center text-sm text-orange-700">
                {errors.imageUrls as string}
              </p>
            )}
          </div>
          <div className="flex w-full flex-col gap-4 rounded-lg sm:w-1/3">
            <div className="min-h-[17rem] w-full rounded-lg border p-2.5 shadow-sm drop-shadow-sm sm:min-h-[11rem] sm:p-2.5">
              <ImageUpload
                name="subPic1"
                index={1}
                {...{
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                }}
              />
            </div>
            <div className="min-h-[17rem] w-full rounded-lg border p-2.5 shadow-sm drop-shadow-sm sm:min-h-[11rem] sm:p-2.5">
              <ImageUpload
                name="subPic2"
                index={2}
                {...{
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex w-full flex-col gap-6 sm:flex-row">
          <div className="flex w-full flex-col gap-6 sm:w-2/3 sm:flex-row">
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="min-h-[17rem] w-full rounded-lg border p-2.5 shadow-sm drop-shadow-sm sm:min-h-[11rem] sm:p-2.5">
                <ImageUpload
                  name="subPic3"
                  index={3}
                  {...{
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                  }}
                />
              </div>
              <div className="min-h-[17rem] w-full rounded-lg border p-2.5 shadow-sm drop-shadow-sm sm:min-h-[11rem] sm:p-2.5">
                <ImageUpload
                  name="subPic4"
                  index={4}
                  {...{
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="min-h-[17rem] w-full rounded-lg border p-2.5 shadow-sm drop-shadow-sm sm:min-h-[11rem] sm:w-1/3 sm:p-2.5">
            <ImageUpload
              name="subPic5"
              index={5}
              {...{
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryForm;

import { Formik } from "formik";
import { useSelector } from "react-redux";
import { formUpdateSchema } from "../schemas/validation";
import FeatureForm from "./features";
import { CheckCircle2, Save } from "lucide-react";
import GalleryForm from "./gallery";
import CategoryForm from "./category";
import PricingForm from "./pricing";
import useFetcher from "@/lib/hooks/use-axios";
import * as Separator from "@radix-ui/react-separator";
import { LoadingDots } from "@/components/shared/icons";
import Router from "next/router";
import { objectDiff } from "@/lib/utils";
import { useState } from "react";
import BasicInfos from "./basic";

const BoatForm = ({ cancelHn }: { cancelHn: (status: any) => void }) => {
  const boatInfo = useSelector((state: any) => state.boat.boatInfo);
  const editableBoat = useSelector((state: any) => state.boat.editableBoat);
  const { fetchWithAuth, data, loading, error, updateBoat } = useFetcher();
  const [changesMade, setChagesMade] = useState(false);

  if (!loading && !error && data) {
    setTimeout(() => {
      Router.push({
        pathname: "/listings",
      });
      cancelHn(false);
    }, 400);
  }

  return (
    <div>
      <Formik
        initialValues={{
          boatName: boatInfo.boatName,
          boatType: boatInfo.boatType,
          description: boatInfo.description,
          manufacturer: boatInfo.manufacturer,
          model: boatInfo.model,
          year: boatInfo.year,
          length: boatInfo.length,
          amenities: boatInfo.amenities,
          imageUrls: boatInfo.imageUrls,
          city: boatInfo.location.city,
          state: boatInfo.location.state,
          address: boatInfo.location.address,
          zipCode: boatInfo.location.zipCode,
          category: boatInfo.category,
          subCategory: boatInfo.subCategory,
          features: Boolean(boatInfo.features),
          securityAllowance: boatInfo.securityAllowance,
          pricing: boatInfo.pricing,
        }}
        onSubmit={(values, { setSubmitting }) => {
          let finalValues = {
            ...boatInfo,
            imageUrls: [boatInfo.imageUrls],
            subCategory: [boatInfo.subCategory],
            securityAllowance: `${boatInfo.securityAllowance} USD`,
            captained: true,
          };

          if (editableBoat) {
            let difference = objectDiff(editableBoat, boatInfo);

            // we don't need to update the location
            if ("latLng" in difference) {
              delete difference.latLng;
            }

            if (Object.keys(difference).length === 0) {
              setChagesMade(true);
              setTimeout(() => {
                setChagesMade(false);
              }, 2000);
            } else {
              updateBoat(`boat/${editableBoat._id}`, {
                ...difference,
                ...(difference.imageUrls && {
                  imageUrls: [difference.imageUrls],
                }),
                ...(difference.subCategory && {
                  subCategory: [difference.subCategory],
                }),
              });
            }
          } else {
            fetchWithAuth("/boat", finalValues);
          }

          setSubmitting(false);
        }}
        validationSchema={formUpdateSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setValues,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center">
                <div className="flex flex-col items-start">
                  <h2 className="text-3xl font-medium text-gray-900">
                    {editableBoat ? "Update Your" : "Add New"} Listing
                  </h2>
                  {!editableBoat && (
                    <p className="text-base text-gray-500">
                      Add a new listing to your listings
                    </p>
                  )}
                </div>
                <div className="relative flex w-full flex-col gap-3 sm:w-fit sm:flex-row">
                  {changesMade && (
                    <p className="absolute -bottom-6 right-1/3 text-end text-base font-medium text-gray-700 sm:right-0">
                      No changes Made!
                    </p>
                  )}
                  <button
                    type="button"
                    className="rounded-lg border border-solid border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-700 sm:w-fit"
                    onClick={() => cancelHn(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex flex-row items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white sm:w-fit"
                  >
                    <Save size="20" />{" "}
                    {!loading ? (
                      !data ? (
                        <p>Save Listing</p>
                      ) : (
                        <p className="flex flex-row items-center gap-px">
                          Successfully Saved <CheckCircle2 />
                        </p>
                      )
                    ) : (
                      <p>
                        Saving <LoadingDots />
                      </p>
                    )}
                  </button>
                  {error && (
                    <p className="absolute -bottom-6 right-1/3 text-end text-base text-red-500 sm:right-3">
                      Error occured!
                    </p>
                  )}
                </div>
              </div>

              <hr className="mt-6 h-px border-0 bg-gray-200 sm:mt-0" />
              <div className="flex flex-col sm:flex-row">
                <BasicInfos
                  {...{
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setValues,
                  }}
                />

                <Separator.Root
                  className="hidden w-px bg-gray-200 sm:block"
                  decorative
                  orientation="vertical"
                  style={{ margin: "0 15px" }}
                />

                <div>
                  <FeatureForm
                    {...{
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      setValues,
                    }}
                  />

                  <GalleryForm
                    {...{
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                    }}
                  />

                  <CategoryForm
                    {...{
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      setValues,
                    }}
                  />

                  <PricingForm
                    {...{
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                    }}
                  />
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default BoatForm;

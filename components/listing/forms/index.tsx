import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { formUpdateSchema } from "../schemas/validation";
import FeatureForm from "./features";
import { CheckCircle2, Save } from "lucide-react";
import GalleryForm from "./gallery";
import CategoryForm from "./category";
import PricingForm from "./pricing";
import useFetcher from "@/lib/hooks/use-axios";
import { LoadingDots } from "@/components/shared/icons";
import Router from "next/router";
import { objectDiff } from "@/lib/utils";
import { useEffect, useState } from "react";
import BasicInfos from "./basic";
import { SaveIcon } from "@/components/shared/icons/save";
import { resetBoat } from "features/boat/boatSlice";

const BoatForm = ({ cancelHn }: { cancelHn: (status: any) => void }) => {
  const boatInfo = useSelector((state: any) => state.boat.boatInfo);
  const editableBoat = useSelector((state: any) => state.boat.editableBoat);
  const { fetchWithAuth, data, loading, error, updateBoat } = useFetcher();
  const [changesMade, setChagesMade] = useState(false);
  const dispatch = useDispatch();

  if (!loading && !error && data) {
    setTimeout(() => {
      Router.push({
        pathname: "/listings",
      });
      cancelHn(false);
      dispatch(resetBoat());
    }, 400);
  }

  return (
    <div>
      <Formik
        initialValues={{
          boatName: boatInfo.boatName,
          boatType: "Boat",
          description: boatInfo.description,
          manufacturer: boatInfo.manufacturer,
          model: boatInfo.model,
          year: boatInfo.year,
          length: boatInfo.length,
          amenities: boatInfo.amenities,
          imageUrls: boatInfo.imageUrls[0],
          city: boatInfo.location.city,
          state: boatInfo.location.state,
          address: boatInfo.location.address,
          zipCode: boatInfo.location.zipCode,
          category: boatInfo.category,
          subCategory: boatInfo.subCategory,
          features: boatInfo.features,
          securityAllowance: boatInfo.securityAllowance,
          captained: boatInfo.captained,
          currency: boatInfo.currency,
          latLng: {
            latitude: boatInfo.latLng?.coordinates
              ? boatInfo.latLng?.coordinates[1]
              : null,
            longitude: boatInfo.latLng?.coordinates
              ? boatInfo.latLng?.coordinates[0]
              : null,
          },
          pricing: boatInfo.pricing,
        }}
        onSubmit={(values: any, { setSubmitting }: { setSubmitting: any }) => {
          let finalValues = {
            ...boatInfo,
            boatType: "boat",
            securityAllowance: `${boatInfo.securityAllowance} ${boatInfo.currency}`,
          };

          if (editableBoat) {
            let difference = objectDiff(editableBoat, boatInfo);
            if (editableBoat["captained"] !== boatInfo["captained"]) {
              difference.captained = boatInfo["captained"];
            }
            if (Object.keys(difference).length === 0) {
              setChagesMade(true);
              setTimeout(() => {
                setChagesMade(false);
              }, 2000);
            } else {
              updateBoat(`boat/${editableBoat._id}`, finalValues);
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
        }: {
          values: any;
          errors: any;
          touched: any;
          handleChange: any;
          handleBlur: any;
          handleSubmit: any;
          setValues: any;
        }) => {
          return (
            <form onSubmit={handleSubmit} className="sm:mx-10 md:mx-20">
              <div className="mb-4 flex flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center lg:mb-6">
                <div className="flex flex-col items-start gap-0">
                  <h2 className="text-3xl font-medium text-gray-900">
                    {editableBoat ? "Update Your" : "Add New"} Listing
                  </h2>
                  {!editableBoat && (
                    <p className="text-gray-500">
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
                    className="rounded-lg border border-solid border-gray-200  px-[14px] py-2 text-center text-sm font-medium text-gray-700 shadow-sm drop-shadow-sm sm:w-fit"
                    onClick={() => cancelHn(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex flex-row items-center justify-center gap-2 rounded-lg bg-cyan-600 px-[14px] py-2 text-sm font-medium text-white shadow-sm drop-shadow-sm hover:bg-cyan-700 active:translate-y-[1.5px] sm:w-fit"
                  >
                    <SaveIcon />
                    {!loading ? (
                      !data ? (
                        <p className="font-inter">Save Listing</p>
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
                    <p className="absolute -bottom-6 right-1/3 text-end text-base text-orange-700 sm:right-3">
                      Error occured!
                    </p>
                  )}
                </div>
              </div>

              {/* <hr className="mt-6 h-px border-0 bg-gray-200 sm:mt-0" /> */}
              <div className="flex flex-col lg:w-full lg:flex-row lg:gap-4">
                <div className="w-full lg:w-[57.5%]">
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
                </div>

                <div className="block w-px bg-gray-200"></div>

                <div className="lg:w-[42.5%]">
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
                      setValues,
                    }}
                  />
                  <div className="mt-4 px-4">
                    <p className="text-xl font-semibold text-gray-900">
                      Cancelation Policy
                    </p>
                    <hr className="mt-3 h-px w-full border-0 bg-gray-200" />
                  </div>
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

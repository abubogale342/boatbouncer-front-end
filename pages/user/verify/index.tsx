import BaseLayout from "@/components/auth/base";
import Meta from "@/components/layout/meta";
import { LoadingCircle } from "@/components/shared/icons";
import { poster } from "@/lib/utils";
import { Formik } from "formik";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Index() {
  const router = useRouter();
  const { query } = router;
  const { phoneNumber } = query;
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<any>(null);

  useEffect(() => {
    if (phoneNumber) return;
    Router.push({
      pathname: "/404",
    });
  }, [phoneNumber]);

  if (!phoneNumber) {
    return;
  }

  return (
    <>
      <Meta title="verify" />

      <BaseLayout
        action="Verify your phone number"
        prompt={`We have sent verification code to your phone number number`}
      >
        <Formik
          initialValues={{ phoneNumber: phoneNumber, code: "" }}
          onSubmit={async (values, { setSubmitting }) => {
            setIsVerifying(true);
            setVerificationError(null);
            const verifiedSms = await poster("user/otpVerify", {
              phoneNumber: values.phoneNumber,
              verificationCode: values.code,
            });

            if (verifiedSms._id || verifiedSms.phoneNumber == phoneNumber) {
              setVerificationError(null);
              Router.push({
                pathname: "/user/login",
              });
              return;
            }

            if (verifiedSms?.response?.status) {
              setVerificationError(
                verifiedSms.response?.data?.message ||
                  verifiedSms.response.data?.errors[0]?.msg ||
                  "Error occured, try again",
              );
              setIsVerifying(false);
              return;
            }

            if (!verifiedSms.status) {
              setVerificationError("Seems connection error, please try again!");
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form
              onSubmit={handleSubmit}
              onChange={() => {
                setVerificationError(null);
              }}
            >
              <fieldset>
                <div className="mb-5 flex flex-col">
                  <label htmlFor="useremailInput">Phone Number</label>
                  <input
                    className="rounded-md border-gray-300 shadow-sm outline-none drop-shadow-sm"
                    name="phoneNumber"
                    type="tel"
                    id="phoneNumberInput"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onBlur={handleBlur}
                    // onChange={handleChange}
                    required
                  />
                  {/* <p className="ml-1 text-sm text-orange-700 ">
                    {errors.phoneNumber &&
                      touched.phoneNumber &&
                      errors.phoneNumber}
                  </p> */}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="codeInput">Code</label>
                  <input
                    type="text"
                    name="code"
                    id="codeInput"
                    className="rounded-md border-gray-300 shadow-sm outline-none drop-shadow-sm"
                    value={values.code}
                    placeholder="Enter verification code"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                  />
                  <p className="ml-1 text-sm text-orange-700">
                    {errors.code && touched.code && errors.code}
                  </p>
                </div>

                <div className="mt-6 rounded-md bg-cyan-600 text-center">
                  <button
                    type="submit"
                    className="w-full rounded-md py-3 font-medium text-white hover:bg-cyan-700 active:active:translate-y-[1.5px]"
                  >
                    <span className="flex items-center justify-center gap-1">
                      {isVerifying ? (
                        <p>Verifying ...</p>
                      ) : (
                        <p>verify phone number</p>
                      )}
                      {isVerifying && <LoadingCircle />}
                    </span>
                  </button>
                </div>
                {verificationError && (
                  <div className="text-center text-orange-700">
                    {verificationError}
                  </div>
                )}
              </fieldset>
            </form>
          )}
        </Formik>
      </BaseLayout>
    </>
  );
}

export default Index;

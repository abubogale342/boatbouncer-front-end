import BaseLayout from "@/components/auth/base";
import Meta from "@/components/layout/meta";
import { LoadingCircle } from "@/components/shared/icons";
import useFetcher from "@/lib/hooks/use-axios";
import { poster } from "@/lib/utils";
import { Formik } from "formik";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Index() {
  const router = useRouter();
  const { query } = router;
  const { phoneNumber, encryption } = query;
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<any>(null);

  useEffect(() => {
    if (phoneNumber) return;
    Router.push({
      pathname: "/user/login",
    });
  }, []);

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
            const verifiedSms = await poster("user/validateResetOTP", {
              phoneNumber: values.phoneNumber,
              verificationCode: values.code,
              encryption: encryption,
            });

            if (typeof verifiedSms == "string") {
              Router.push({
                pathname: "/user/password/new",
                query: { encryption: verifiedSms },
              });
            } else {
              setVerificationError("Invalid code or unknown error");
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
                  <label htmlFor="phoneNumberInput">Phone Number</label>
                  <input
                    className="rounded-md border-gray-300 shadow-sm outline-none drop-shadow-sm"
                    name="phoneNumber"
                    type="tel"
                    id="phoneNumberInput"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onBlur={handleBlur}
                    readOnly
                    required
                  />
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

                <div className="mt-6 ">
                  {verificationError && (
                    <div className="text-center text-orange-700">
                      {verificationError}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full rounded-md bg-cyan-600 py-3 text-center font-medium text-white hover:bg-cyan-700 active:active:translate-y-[1.5px]"
                  >
                    <span className="flex items-center justify-center gap-1">
                      <p>Reset Password</p>
                      {isVerifying && <LoadingCircle />}
                    </span>
                  </button>
                  {/* <div className="flex items-center justify-center">
                    <p></p>
                    <button className="mt-5 text-center text-base font-semibold not-italic leading-6 tracking-[0.5px] text-cyan-600">
                      Resend code
                    </button>
                  </div> */}
                </div>
              </fieldset>
            </form>
          )}
        </Formik>
      </BaseLayout>
    </>
  );
}

export default Index;
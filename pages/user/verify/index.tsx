import BaseLayout from "@/components/auth/base";
import Meta from "@/components/layout/meta";
import { LoadingCircle } from "@/components/shared/icons";
import { auth } from "@/lib/config";
import { poster } from "@/lib/utils";
import { RecaptchaVerifier } from "firebase/auth";
import { Formik } from "formik";
import Router, { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

function Index() {
  const router = useRouter();
  const { query } = router;
  const { phoneNumber, redirect_to } = query;
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<any>(null);
  const [resendLoader, setResendLoader] = useState(false);
  const recaptchaRef = useRef<RecaptchaVerifier | undefined | null>();

  useEffect(() => {
    if (phoneNumber) return;
    Router.push({
      pathname: "/user/login",
    });
  }, [phoneNumber]);

  if (!phoneNumber) {
    return;
  }

  const handleResetCode = async () => {
    setResendLoader(true);

    if (!recaptchaRef.current) {
      recaptchaRef.current = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible", // this property is important otherwise the captcha will be displayed on the screen
        },
        auth,
      );
    }

    recaptchaRef.current
      .verify()
      .then(async (token: string) => {
        try {
          const response = await poster("user/resendSms", {
            phoneNumber,
            recaptchaToken: token,
          });

          setResendLoader(false);
          console.log("response", response);
        } catch (error: any) {
          setVerificationError(
            error?.message ?? "Resending failed, try again!",
          );
          setResendLoader(false);
        }
      })
      .catch((error: any) => {
        setResendLoader(false);
        setVerificationError(error?.message ?? "Resending failed, try again!");
      })
      .finally(() => {
        recaptchaRef.current?.clear();
      });
  };

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
                pathname: `/user/login`,
                ...(redirect_to && {
                  query: {
                    redirect_to,
                  },
                }),
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
                  <label htmlFor="phoneNumberInput">Phone Number</label>
                  <input
                    className="rounded-md border-gray-300 shadow-sm outline-none drop-shadow-sm"
                    name="phoneNumber"
                    type="tel"
                    id="phoneNumberInput"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onBlur={handleBlur}
                    // onChange={handleChange}
                    readOnly
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
                      {isVerifying ? (
                        <p>Verifying ...</p>
                      ) : (
                        <p>verify phone number</p>
                      )}
                      {isVerifying && <LoadingCircle />}
                    </span>
                  </button>
                  <div id="recaptcha-container"></div>
                  <div className="flex items-center justify-center">
                    <p></p>
                    <button
                      type="button"
                      onClick={handleResetCode}
                      className="mt-5 flex flex-row items-center justify-center gap-2 text-center text-base font-semibold not-italic leading-6 tracking-[0.5px] text-cyan-600"
                    >
                      Resend code {resendLoader && <LoadingCircle />}
                    </button>
                  </div>
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

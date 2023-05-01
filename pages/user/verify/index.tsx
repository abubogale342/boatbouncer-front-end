import BaseLayout from "@/components/auth/base";
import Meta from "@/components/layout/meta";
import { poster } from "@/lib/utils";
import { Formik } from "formik";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";

function Index() {
  const router = useRouter();
  const { query } = router;
  const { phoneNumber } = query;

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
            try {
              const verifiedSms = await poster("user/otpVerify", {
                phoneNumber: values.phoneNumber,
                verificationCode: values.code,
              });

              if (verifiedSms.phoneNumber === phoneNumber) {
                Router.push({
                  pathname: "/user/login",
                });
              }
            } catch (error) {
              console.log(error);
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
            <form onSubmit={handleSubmit}>
              <fieldset>
                <div className="mb-5 flex flex-col">
                  <label htmlFor="useremailInput">Phone Number</label>
                  <input
                    className="rounded-md"
                    name="phoneNumber"
                    type="tel"
                    id="phoneNumberInput"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-red-500  ">
                    {errors.phoneNumber &&
                      touched.phoneNumber &&
                      errors.phoneNumber}
                  </p>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="codeInput">Code</label>
                  <input
                    type="text"
                    name="code"
                    id="codeInput"
                    className="rounded-md"
                    value={values.code}
                    placeholder="Enter verification code"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-red-500  ">
                    {errors.code && touched.code && errors.code}
                  </p>
                </div>

                <div className="mt-6 rounded-md bg-cyan-600 text-center">
                  <button
                    type="submit"
                    className="w-full py-3 font-medium text-white"
                  >
                    verify phone number
                  </button>
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

'use client';
import { useForgotPasswordMutation } from '@/app/graphql/gql/graphql';
import { createUrqlClient } from '@/app/utils/createUrqlClient';
import Wrapper from '@/components/Wrapper';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { withUrqlClient } from 'next-urql';
import router from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().required('Username is required'),
});

const initialValues = {
  email: '',
};

const ForgotPassword: React.FC = () => {
  const [, ForgotPassword] = useForgotPasswordMutation();
  const router = useRouter();
  const handleSubmit = async (
    values: typeof initialValues, //Defines our expected types//
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const response = await ForgotPassword({ email: values.email });

      //   console.log(response); // Log the response object for debugging
      //   if (response.data?.login.errors){
      //     setErrors(toErrorMap(response.data.login.errors));
      //   } else if (response.data?.login.user) {
      //     //worked
      //     router.push("/");
      //   }

      // if (response.data && response.data.ForgotPassword) {
      //   const { user } = response.data.ForgotPassword;
      //   console.log(user);
      //   //If Worked
      //   router.push("/");
      // } else {
      //   console.log('Invalid response structure'); // Log an error message if the response structure is unexpected
      // }
      router.push('../forgotten-password');
    } catch (error) {
      console.error(error);
    }

    setSubmitting(false);
  };

  return (
    <Wrapper pageProps={undefined}>
      <div className="flex justify-center items-center min-h-screen bg-blue-55">
        <div className="bg-grey-56 rounded-md shadow-lg p-6 border-2 border-orange-55">
          <h1>Forgot Password</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div>
                <label htmlFor="email">Username:</label>
                <Field
                  type="text"
                  id="email"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                />
              </div>

              <button
                type="submit"
                className="bg-orange-55"
              >
                Submit
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);

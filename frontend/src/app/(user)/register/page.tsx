"use client";
import { useRegisterMutation } from '@/app/graphql/gql/graphql';
import { createUrqlClient } from '@/app/utils/createUrqlClient';
import  Wrapper  from '@/components/Wrapper';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { withUrqlClient } from 'next-urql';
import router from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useMutation } from 'urql';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().required('An email is required to create an account'),
  password: Yup.string().required('Password is required'),
});

const initialValues = {
  email: "",
  username: "",
  password: "",
};

const SafeFormComponent: React.FC = () => {
  const router = useRouter();
  const [, registerMutation] = useRegisterMutation();

  const handleSubmit = async (
    values: typeof initialValues,  //Defines our expected types//
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const response = await registerMutation({
        // options: values
        options: {
          email: values.email,
          username: values.username,
          password: values.password,
        }
      });

      console.log(response); // Log the response object for debugging

      if (response.data && response.data.register) {
        const { user } = response.data.register;
        console.log(user);
        router.push("/");
      } else {
        console.log('Invalid response structure'); // Log an error message if the response structure is unexpected
      }
    } catch (error) {
      console.error(error);
    }

    setSubmitting(false);
  };

  return (
    <Wrapper pageProps={undefined}>
      <div className="flex justify-center items-center min-h-screen bg-blue-55">
        <div className="bg-grey-56 rounded-md shadow-lg p-6 border-2 border-orange-55">
          <h1>Register</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
            <div>
                <label htmlFor="email">Email:</label>
                <Field type="text" id="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </div>

              <div>
                <label htmlFor="username">Username:</label>
                <Field type="text" id="username" name="username" />
                <ErrorMessage name="username" component="div" />
              </div>

              <div>
                <label htmlFor="password">Password:</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </div>

              <button type="submit" className="bg-orange-55">
                Submit
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, {ssr: false})(SafeFormComponent);
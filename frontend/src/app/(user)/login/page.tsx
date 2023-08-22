"use client"
import { useLoginMutation} from '@/app/graphql/gql/graphql';
import { createUrqlClient } from '@/app/utils/createUrqlClient';
import  Wrapper  from '@/components/Wrapper';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import NextLink from 'next/link'

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const initialValues = {
  username: "",
  password: "",
};

const SafeFormComponent: React.FC = () => {
  const router = useRouter();
  const [, loginMutation] = useLoginMutation();

  const handleSubmit = async (
    values: typeof initialValues, //Defines our expected types//
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const response = await loginMutation({
        usernameOrEmail: values.username,
        password: values.password,
      });

    //   console.log(response); // Log the response object for debugging
    //   if (response.data?.login.errors){
    //     setErrors(toErrorMap(response.data.login.errors));
    //   } else if (response.data?.login.user) {
    //     //worked
    //     router.push("/");
    //   }

      if (response.data && response.data.login) {
        const { user } = response.data.login;
        console.log(user);
        //If Worked
        // if (typeof router.query.next === "string") {
        //   router.push(router.query.next);
        // } else {
        //   router.push("/")
        // }
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
          <h1 className="text-center p-2 tracking-tighter">LOG_IN</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
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
              <div className="flex justify-center align-center">
                <button type="submit" className="bg-orange-55">
                  Submit
                </button>
              </div>
              
              <div className="text-center">
                <NextLink href="/forgot-password">
                  forgot password?
                </NextLink>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, {ssr: false})(SafeFormComponent);
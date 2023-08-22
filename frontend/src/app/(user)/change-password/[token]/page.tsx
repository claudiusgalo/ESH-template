// // import {NextPage} from "next"
// "use client"
// import { useRegisterMutation } from "@/app/graphql/gql/graphql";
// import { Wrapper } from "@/components/Wrapper"
// import { ErrorMessage, Field, Form, Formik } from "formik"
// import { Token } from "graphql";
// import * as Yup from 'yup';

// // export const ChangePassword: NextPage<{token: string}> = ({token}) => {
// //     return (<div>
// //         token is: { token }
// //     </div>);
// // }

// // ChangePassword.getInitialProps = ({query}) => {
// //     return {
// //         token: query.token as string
// //     }
// // }

// // export default ChangePassword

// const validationSchema = Yup.object({
//   username: Yup.string().required('Username is required'),
//   email: Yup.string().required('An email is required to create an account'),
//   password: Yup.string().required('Password is required'),
// });
// const initialValues = {
//   email: "",
//   username: "",
//   password: "",
// };
// const handleSubmit = async (
//   values: typeof initialValues,
//   {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}
// ) => {
// //   const response = await useRegisterMutation({

// //   })
// // }

// export default function Page({ params } : {
//     params: {token: string}
// }

// )

// {
//     return (
//         // <div> Hello {params.token} </div>
//     <Wrapper>
//       <div> this is the token: {params.token} </div>
//       <div className="flex justify-center items-center min-h-screen bg-blue-55">
//         <div className="bg-grey-56 rounded-md shadow-lg p-6 border-2 border-orange-55">
//           <h1>Safe Form Component</h1>
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             <Form>
//             <div>
//                 <label htmlFor="email">Email:</label>
//                 <Field type="text" id="email" name="email" />
//                 <ErrorMessage name="email" component="div" />
//               </div>

//               <div>
//                 <label htmlFor="username">Username:</label>
//                 <Field type="text" id="username" name="username" />
//                 <ErrorMessage name="username" component="div" />
//               </div>

//               <div>
//                 <label htmlFor="password">Password:</label>
//                 <Field type="password" id="password" name="password" />
//                 <ErrorMessage name="password" component="div" />
//               </div>

//               <button type="submit" className="bg-orange-55">
//                 Submit
//               </button>
//             </Form>
//           </Formik>
//         </div>
//       </div>
//     </Wrapper>
//     )
// }

"use client"
import { useChangePasswordMutation, useRegisterMutation } from "@/app/graphql/gql/graphql";
import { Wrapper } from "@/components/Wrapper";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { NextPage } from "next";
import { createUrqlClient } from "@/app/utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  newPassword: Yup.string().required('Password is required'),
});

const initialValues = {
  token: "",
  newPassword: "",
};


function Page({ params } : {
    params: {token: string}

}) { 
  const router = useRouter();
  const [,ChangePassword] = useChangePasswordMutation();
  const handleSubmit = async (
  values: typeof initialValues,
  { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
) => {
  try {
    const response = await ChangePassword({
      newPassword: values.newPassword,
      token: params.token,
    });
    if (response.data?.changePassword.errors) {
      console.log(response.data.changePassword.errors)
    } else if (response.data?.changePassword.user){
      router.push("/");
    }
  } catch (error) {
    console.error(error);
  }
  setSubmitting(false);
};
  return( 
    <Wrapper>
      <div> this is the token: {params.token}</div>
      <div className="flex justify-center items-center min-h-screen bg-blue-55">
        <div className="bg-grey-56 rounded-md shadow-lg p-6 border-2 border-orange-55">
          <h1>Reset Password</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div>
                <label htmlFor="newPassword">Password</label>
                <Field type="text" id="newPassword" name="newPassword" />
                <ErrorMessage name="newPassword" component="div"/>
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
}

export default withUrqlClient(createUrqlClient)(Page)

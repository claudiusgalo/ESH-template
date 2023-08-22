import { createUrqlClient } from '@/app/utils/createUrqlClient';
import Wrapper from '@/components/Wrapper';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { withUrqlClient } from 'next-urql';
import * as Yup from 'yup';

// Define the validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
  images: Yup.array()
    .min(1, 'Please select at least one image')
    .required('Please select at least one image'),
  dropdown: Yup.string().required('Dropdown selection is required'),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
  images: [] as File[],
  dropdown: '',
};

const FileInput = ({ field, form: { setFieldValue } }: any) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files);
      setFieldValue(field.name, fileList);
    }
  };

  return (
    <input
      type="file"
      id={field.name}
      name={field.name}
      multiple
      onChange={handleFileChange}
    />
  );
};

const SafeFormComponent: React.FC = () => {
  const handleSubmit = (
    values: typeof initialValues,
    { setSubmitting }: any
  ) => {
    // Simulate form submission
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 500);
  };

  return (
    <Wrapper pageProps={undefined}>
      <div className="flex justify-center items-center min-h-screen bg-blue-55">
        <div className="bg-grey-56 rounded-md shadow-lg p-6 border-2 border-orange-55">
          <h1>Safe Form Component</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div>
                <label htmlFor="name">Name:</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="email">Email:</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="password">Password:</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="images">Images:</label>
                <Field
                  component={FileInput}
                  name="images"
                />
                <ErrorMessage
                  name="images"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="dropdown">Dropdown:</label>
                <Field
                  as="select"
                  id="dropdown"
                  name="dropdown"
                >
                  <option value="">Select an option</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Field>
                <ErrorMessage
                  name="dropdown"
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

export default withUrqlClient(createUrqlClient, { ssr: false })(
  SafeFormComponent
);

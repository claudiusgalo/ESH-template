'use client';
import {
  useCreateArticleMutation,
  useCreateListingMutation,
  useCreatePostMutation,
  useMeQuery,
  useSignImagesMutation,
} from '@/app/graphql/gql/graphql';
import { createUrqlClient } from '@/app/utils/createUrqlClient';
import { useIsAuth } from '@/app/utils/useIsAuth';
import Wrapper from '@/components/Wrapper';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from 'urql';
import moment from 'moment';
import { formatFilename } from '@/app/utils/formatFileName';

const initialValues = {
  street_address: '',
  city: '',
  state: '',
  zip: 0,
  country: '',
  zillow_link: '',
  has_sold: false,
  beds: 0,
  bathrooms: 0,
  square_footage: 0,
  year: 0,
  school_district: '',
  primary_school: '',
  secondary_school: '',
  tertiary_school: '',
  monthly_cost_30yr: 0,
  monthly_cost_15yr: 0,
  monthly_cost_10yr: 0,
  monthly_cost_5yr: 0,
  tags: [],
};

const createListing: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, signImages] = useSignImagesMutation(); // New mutation for signing images
  // const [, uploadImages] = useUploadImagesMutation(); // New mutation for uploading images
  const [, createListing] = useCreateListingMutation();
  // const [, getSignedUrls] = useGetSignedUrlsMutation(); // New mutation for getting signed URLs
  const [images, setImages] = useState<File[]>([]); // State to store the selected images
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // State to store image previews

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log(files);

    if (files) {
      const selectedImages = Array.from(files);
      console.log(selectedImages);

      // Format the filenames of the selected images and store them in formattedImages
      const formattedImages = selectedImages.map((image) => {
        const filename = formatFilename(image.name);
        return new File([image], filename, { type: image.type });
      });

      // Create image previews for display
      const previews = selectedImages.map((image) =>
        URL.createObjectURL(image)
      );
      setImagePreviews(previews);

      // Set the formatted images with formatted filenames in the component's state
      setImages(formattedImages);
    }

    // Now, formattedImages array contains File objects with formatted filenames
    // You can use this array to upload the images to the backend
  };

  return (
    <Wrapper pageProps={undefined}>
      <div className="flex justify-center items-center min-h-screen bg-blue-55">
        <div className="bg-grey-56 rounded-md shadow-lg p-6 border-2 border-orange-55">
          <h1 className="text-center p-2 tracking-tighter">New Listing</h1>
          <img src="https://listing-image-bucket.s3.us-east-2.amazonaws.com/images/20230729-il3la-blob-http---localhost-3000-1f1d5482-ad0e-4258-be7d-9e752593198a?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVM6WHX3HVRPMDYUO%2F20230730%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20230730T020901Z&X-Amz-Expires=3600&X-Amz-Signature=8761c512bca9c5e53a0c979b3fc6c55ad8091c91b0984d4cf4b3ef36fa7a3287&X-Amz-SignedHeaders=host&x-id=PutObject" />
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              console.log('Form Submitted');
              console.log('values: ', values);
              console.log('#1 Images: ', images);

              // Combine the image array with the form values
              // const inputValues = { ...values, images };
              // Destructure the values from the form
              const {
                street_address,
                city,
                state,
                zip,
                country,
                zillow_link,
                has_sold,
                beds,
                bathrooms,
                square_footage,
                year,
                school_district,
                primary_school,
                secondary_school,
                tertiary_school,
                monthly_cost_30yr,
                monthly_cost_15yr,
                monthly_cost_10yr,
                monthly_cost_5yr,
                tags,
              } = values;
              const inputValues = {
                street_address,
                city,
                state,
                zip,
                country,
                zillow_link,
                has_sold,
                beds,
                bathrooms,
                square_footage,
                year,
                school_district,
                primary_school,
                secondary_school,
                tertiary_school,
                monthly_cost_30yr,
                monthly_cost_15yr,
                monthly_cost_10yr,
                monthly_cost_5yr,
                tags,
              };
              // console.log('inputValues: ', inputValues);

              console.log('#2 Images: ', images);

              // const { data: signedUrlsData, data: getObjectKeyData, error: signedUrlsError, error: getObjectKeysData} = await signImages({ imagePreviews: imagePreviews });

              const { data: signImagesData, error: signImagesError } =
                await signImages({ imagePreviews: imagePreviews });

              // console.log("start")
              // await console.log("Hey, this is the signedUrlsData: ", signImagesData)
              // await console.log("Hey, this is the getObjectKeyData: ", getObjectKeyData)
              // await console.log("Hey, this is the signedUrlsError: ", signedUrlsError)
              // await console.log("Hey, this is the getObjectKeysData: ", getObjectKeysData)
              // console.log("end")

              // console.log("start")
              // await console.log("Hey, this is the signedUrlsData: ", signedUrlsData)
              // await console.log("Hey, this is the getObjectKeyData: ", getObjectKeyData)
              // await console.log("Hey, this is the signedUrlsError: ", signedUrlsError)
              // await console.log("Hey, this is the getObjectKeysData: ", getObjectKeysData)
              // console.log("end")

              // await console.log("Hey, this is the signedUrlsData: ", signedUrlsData)

              console.log('Raw data from signImages: ', signImagesData);
              console.log(
                'Raw data from signImages: ',
                signImagesData?.signImages
              );
              console.log(
                'Raw data from signImages.signedUrls: ',
                signImagesData?.signImages?.signedUrls
              );
              console.log(
                'Raw data from signImages.getObjectKeys: ',
                signImagesData?.signImages?.getObjectKeys
              );
              console.log(
                'Raw data from signImages.signedUrls: ',
                signImagesData?.signImages?.imageUrls
              );

              if (signImagesError) {
                console.error('Error getting signed URLs:', signImagesError);
                return;
              }

              const imageUrls = signImagesData?.signImages?.imageUrls || [];
              const signedUrls = signImagesData?.signImages?.signedUrls || [];
              const getObjectKeys =
                signImagesData?.signImages?.getObjectKeys || [];

              console.log('imageUrls: ', imageUrls);

              // const signedUrls = signedUrlsData?.signImages || [];

              // await console.log("Hey, these are the signed Urls!!: ", signedUrls)

              async function uploadImagesToS3(
                selectedImages,
                getObjectKeys,
                signedUrls
              ) {
                console.log('selectedImages: ', selectedImages);
                console.log('getObjectKeys: ', getObjectKeys);
                console.log('signedUrls: ', signedUrls);
                try {
                  for (let i = 0; i < signedUrls.length; i++) {
                    const file = selectedImages[i]; // Replace YOUR_UPLOADED_FILES with the array containing the File objects
                    const getObjectKey = getObjectKeys[i];

                    const response = await fetch(signedUrls[i], {
                      method: 'PUT',
                      headers: {
                        'Content-Type': file.type,
                      },
                      body: file,
                    });

                    if (!response.ok) {
                      throw new Error(
                        `Failed to upload image. Status: ${response.status}`
                      );
                    }

                    console.log(
                      `Image uploaded successfully to ${signedUrls[i]}`
                    );
                  }
                } catch (error) {
                  console.error('Error uploading images:', error);
                }
              }

              await uploadImagesToS3(images, getObjectKeys, signedUrls);
              // const inputValues = { ...values, images };
              // await console.log('inputValues: ', inputValues);

              console.log('imageUrls: ', imageUrls);
              const { data, error } = await createListing({
                input: inputValues,
                imageUrls: imageUrls,
              });
              console.log('error: ', error);
              console.log('data: ', data?.createListing.imageUrls);
            }}
          >
            <Form>
              <div>
                <label htmlFor="street_address">Street Address:</label>
                <Field
                  type="text"
                  id="street_address"
                  name="street_address"
                />
                <ErrorMessage
                  name="street_address"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="city">City:</label>
                <Field
                  type="text"
                  id="city"
                  name="city"
                />
                <ErrorMessage
                  name="city"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="state">State:</label>
                <Field
                  type="text"
                  id="state"
                  name="state"
                />
                <ErrorMessage
                  name="state"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="zip">ZIP Code:</label>
                <Field
                  type="number"
                  id="zip"
                  name="zip"
                />
                <ErrorMessage
                  name="zip"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="country">Country:</label>
                <Field
                  type="text"
                  id="country"
                  name="country"
                />
                <ErrorMessage
                  name="country"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="zillow_link">Zillow Link:</label>
                <Field
                  type="text"
                  id="zillow_link"
                  name="zillow_link"
                />
                <ErrorMessage
                  name="zillow_link"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="has_sold">Has Sold:</label>
                <Field
                  type="checkbox"
                  id="has_sold"
                  name="has_sold"
                />
                <ErrorMessage
                  name="has_sold"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="beds">Beds:</label>
                <Field
                  type="number"
                  id="beds"
                  name="beds"
                />
                <ErrorMessage
                  name="beds"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="bathrooms">Bathrooms:</label>
                <Field
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                />
                <ErrorMessage
                  name="bathrooms"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="square_footage">Square Footage:</label>
                <Field
                  type="number"
                  id="square_footage"
                  name="square_footage"
                />
                <ErrorMessage
                  name="square_footage"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="year">Year Built:</label>
                <Field
                  type="number"
                  id="year"
                  name="year"
                />
                <ErrorMessage
                  name="year"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="school_district">School District:</label>
                <Field
                  type="text"
                  id="school_district"
                  name="school_district"
                />
                <ErrorMessage
                  name="school_district"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="primary_school">Primary School:</label>
                <Field
                  type="text"
                  id="primary_school"
                  name="primary_school"
                />
                <ErrorMessage
                  name="primary_school"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="secondary_school">Secondary School:</label>
                <Field
                  type="text"
                  id="secondary_school"
                  name="secondary_school"
                />
                <ErrorMessage
                  name="secondary_school"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="tertiary_school">Tertiary School:</label>
                <Field
                  type="text"
                  id="tertiary_school"
                  name="tertiary_school"
                />
                <ErrorMessage
                  name="tertiary_school"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="monthly_cost_30yr">
                  Monthly Cost (30-Year):
                </label>
                <Field
                  type="number"
                  id="monthly_cost_30yr"
                  name="monthly_cost_30yr"
                />
                <ErrorMessage
                  name="monthly_cost_30yr"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="monthly_cost_15yr">
                  Monthly Cost (15-Year):
                </label>
                <Field
                  type="number"
                  id="monthly_cost_15yr"
                  name="monthly_cost_15yr"
                />
                <ErrorMessage
                  name="monthly_cost_15yr"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="monthly_cost_10yr">
                  Monthly Cost (10-Year):
                </label>
                <Field
                  type="number"
                  id="monthly_cost_10yr"
                  name="monthly_cost_10yr"
                />
                <ErrorMessage
                  name="monthly_cost_10yr"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="monthly_cost_5yr">Monthly Cost (5-Year):</label>
                <Field
                  type="number"
                  id="monthly_cost_5yr"
                  name="monthly_cost_5yr"
                />
                <ErrorMessage
                  name="monthly_cost_5yr"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="tags">Tags:</label>
                <Field
                  type="text"
                  id="tags"
                  name="tags"
                />
                <ErrorMessage
                  name="tags"
                  component="div"
                />
              </div>
              {/* Input element for image uploads */}
              <div>
                <label htmlFor="images">Images:</label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </div>

              {/* Display image previews */}

              <div className="container">
                {imagePreviews.map((preview, index) => (
                  <div
                    key={index}
                    className="container aspect-square"
                  >
                    <img
                      className="object-cover w-full h-full"
                      key={index}
                      src={preview}
                      alt={`Preview ${index}`}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-center align-center">
                <button
                  type="submit"
                  className="bg-orange-55"
                >
                  Create Listing
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(createListing);

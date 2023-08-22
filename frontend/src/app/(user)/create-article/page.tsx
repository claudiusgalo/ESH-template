'use client';
import {
  useCreateArticleMutation,
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
  title: '',
  body_1: '',
  body_2: '',
  body_3: '',
  body_4: '',
  body_5: '',
  images: [],
};

const createArticle: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, signImages] = useSignImagesMutation(); // New mutation for signing images
  // const [, uploadImages] = useUploadImagesMutation(); // New mutation for uploading images
  const [, createArticle] = useCreateArticleMutation();
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
              const { title, body_1, body_2, body_3, body_4, body_5 } = values;
              const inputValues = {
                title,
                body_1,
                body_2,
                body_3,
                body_4,
                body_5,
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
              const { data, error } = await createArticle({
                input: inputValues,
                imageUrls: imageUrls,
              });
              console.log('error: ', error);
              console.log('data: ', data?.createArticle.imageUrls);
            }}
          >
            <Form>
              <div>
                <label htmlFor="title">Title:</label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="body_1">Body_1:</label>
                <Field
                  type="text"
                  id="body_1"
                  name="body_1"
                />
                <ErrorMessage
                  name="body_1"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="body_2">Body_2:</label>
                <Field
                  type="text"
                  id="body_2"
                  name="body_2"
                />
                <ErrorMessage
                  name="body_2"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="body_3">Body_3:</label>
                <Field
                  type="text"
                  id="body_3"
                  name="body_3"
                />
                <ErrorMessage
                  name="body_3"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="body_4">Body_4:</label>
                <Field
                  type="text"
                  id="body_4"
                  name="body_4"
                />
                <ErrorMessage
                  name="body_4"
                  component="div"
                />
              </div>
              <div>
                <label htmlFor="body_5">Body_5:</label>
                <Field
                  type="text"
                  id="body_5"
                  name="body_5"
                />
                <ErrorMessage
                  name="body_5"
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
                  Create Article
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(createArticle);

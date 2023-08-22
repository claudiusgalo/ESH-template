'use client';
import {
  useCreatePostMutation,
  useCreateVideoMutation,
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
  video_link: '',
  description: '',
};

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createVideo] = useCreateVideoMutation();

  return (
    <Wrapper pageProps={undefined}>
      <div className="flex justify-center items-center min-h-screen bg-blue-55">
        <div className="bg-grey-56 rounded-md shadow-lg p-6 border-2 border-orange-55">
          <h1 className="text-center p-2 tracking-tighter">New Video</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              console.log('Form Submitted');
              console.log('values: ', values);

              // Combine the image array with the form values
              // const inputValues = { ...values, images };
              // Destructure the values from the form
              const { title, video_link, description } = values;
              const inputValues = { title, video_link, description };
              // console.log('inputValues: ', inputValues);

              // console.log('#2 Images: ', images);

              // // const { data: signedUrlsData, data: getObjectKeyData, error: signedUrlsError, error: getObjectKeysData} = await signImages({ imagePreviews: imagePreviews });

              // const { data: signImagesData, error: signImagesError } =
              //   await signImages({ imagePreviews: imagePreviews });

              // // console.log("start")
              // // await console.log("Hey, this is the signedUrlsData: ", signImagesData)
              // // await console.log("Hey, this is the getObjectKeyData: ", getObjectKeyData)
              // // await console.log("Hey, this is the signedUrlsError: ", signedUrlsError)
              // // await console.log("Hey, this is the getObjectKeysData: ", getObjectKeysData)
              // // console.log("end")

              // // console.log("start")
              // // await console.log("Hey, this is the signedUrlsData: ", signedUrlsData)
              // // await console.log("Hey, this is the getObjectKeyData: ", getObjectKeyData)
              // // await console.log("Hey, this is the signedUrlsError: ", signedUrlsError)
              // // await console.log("Hey, this is the getObjectKeysData: ", getObjectKeysData)
              // // console.log("end")

              // // await console.log("Hey, this is the signedUrlsData: ", signedUrlsData)

              // console.log('Raw data from signImages: ', signImagesData);
              // console.log(
              //   'Raw data from signImages: ',
              //   signImagesData?.signImages
              // );
              // console.log(
              //   'Raw data from signImages.signedUrls: ',
              //   signImagesData?.signImages?.signedUrls
              // );
              // console.log(
              //   'Raw data from signImages.getObjectKeys: ',
              //   signImagesData?.signImages?.getObjectKeys
              // );
              // console.log(
              //   'Raw data from signImages.signedUrls: ',
              //   signImagesData?.signImages?.imageUrls
              // );

              // if (signImagesError) {
              //   console.error('Error getting signed URLs:', signImagesError);
              //   return;
              // }

              // const imageUrls = signImagesData?.signImages?.imageUrls || [];
              // const signedUrls = signImagesData?.signImages?.signedUrls || [];
              // const getObjectKeys =
              //   signImagesData?.signImages?.getObjectKeys || [];

              // console.log('imageUrls: ', imageUrls);

              // // const signedUrls = signedUrlsData?.signImages || [];

              // // await console.log("Hey, these are the signed Urls!!: ", signedUrls)

              // async function uploadImagesToS3(
              //   selectedImages,
              //   getObjectKeys,
              //   signedUrls
              // ) {
              //   console.log('selectedImages: ', selectedImages);
              //   console.log('getObjectKeys: ', getObjectKeys);
              //   console.log('signedUrls: ', signedUrls);
              //   try {
              //     for (let i = 0; i < signedUrls.length; i++) {
              //       const file = selectedImages[i]; // Replace YOUR_UPLOADED_FILES with the array containing the File objects
              //       const getObjectKey = getObjectKeys[i];

              //       const response = await fetch(signedUrls[i], {
              //         method: 'PUT',
              //         headers: {
              //           'Content-Type': file.type,
              //         },
              //         body: file,
              //       });

              //       if (!response.ok) {
              //         throw new Error(
              //           `Failed to upload image. Status: ${response.status}`
              //         );
              //       }

              //       console.log(
              //         `Image uploaded successfully to ${signedUrls[i]}`
              //       );
              //     }
              //   } catch (error) {
              //     console.error('Error uploading images:', error);
              //   }
              // }

              // await uploadImagesToS3(images, getObjectKeys, signedUrls);
              await console.log('inputValues: ', inputValues);

              const { data, error } = await createVideo({
                input: inputValues,
              });
              console.log('error: ', error);
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
                <label htmlFor="video_link">Video Link:</label>
                <Field
                  type="text"
                  id="video_link"
                  name="video_link"
                />
                <ErrorMessage
                  name="video_link"
                  component="div"
                />
              </div>

              <div>
                <label htmlFor="description">Description:</label>
                <Field
                  type="text"
                  id="description"
                  name="description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                />
              </div>

              {/* Display image previews */}
              <div className="flex justify-center align-center">
                <button
                  type="submit"
                  className="bg-orange-55"
                >
                  Create Video
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);

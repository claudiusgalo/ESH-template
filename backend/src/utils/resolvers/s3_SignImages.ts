import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import moment from 'moment';
import { ObjectType, Field, Resolver, Mutation, Arg } from 'type-graphql';

@ObjectType()
class SignedImageOutput {
  @Field(() => [String])
  getObjectKeys: String[];

  @Field(() => [String])
  signedUrls: String[];

  @Field(() => [String])
  imageUrls: String[];
}

@Resolver()
export class S3Resolver {
  @Mutation(() => SignedImageOutput)
  async signImages(
    @Arg('imagePreviews', () => [String]) images: string[]
  ): Promise<SignedImageOutput> {
    try {
      console.log('You have just called the signImages mutation');

      const s3 = new S3Client({
        region: process.env.BUCKET_REGION!,
        credentials: {
          accessKeyId: process.env.ACCESS_KEY!,
          secretAccessKey: process.env.SECRET_ACCESS_KEY!,
        },
      });

      const getObjectKeys: string[] = [];
      const signedUrls: string[] = [];
      const imageUrls: string[] = [];

      for (const image of images) {
        // Generate a clean getObjectKey2
        const date = moment().format('YYYYMMDD');
        const randomString = Math.random().toString(36).substring(2, 7);
        const cleanFileName = image.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const getObjectKey = `images/${date}-${randomString}-${cleanFileName}`;
        const imageUrl = `https://${process.env.BUCKET_NAME!}.s3.${process.env
          .BUCKET_REGION!}.amazonaws.com/${getObjectKey}`;
        console.log(
          'This is the getObjectKey that we have generated: ',
          getObjectKey
        );

        console.log('This is the imageUrl that we have generated: ', imageUrl);
        //https://listing-image-bucket.s3.us-east-2.amazonaws.com/

        // Generate a signed URL
        const putObjectParams = {
          Bucket: process.env.BUCKET_NAME!, // Replace with your S3 bucket name
          Key: getObjectKey, // Include the generated key in the return object
          ContentType: 'image/*', // Replace with your file type
        };

        const command = new PutObjectCommand(putObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        // Add the signed URL to the array of signed URLs
        imageUrls.push(imageUrl);
        getObjectKeys.push(getObjectKey);
        signedUrls.push(url);
      }

      console.log('Generated getObjectKeys:', getObjectKeys);
      console.log('Generated signedUrls:', signedUrls);
      console.log('Generated imageUrls:', imageUrls);

      return { imageUrls, getObjectKeys, signedUrls };
    } catch (error) {
      console.error('Error signing the image URLs', error);
      throw new Error('Error signing the image URLs.');
    }
  }
}

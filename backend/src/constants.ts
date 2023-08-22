import { env } from "process";

export const __prod__ = process.env.NODE_ENV === 'production'
export const COOKIE_NAME = "qid";
export const FORGOT_PASSWORD_PREFIX = 'forget-password:'

//S3 Bucket
export const BUCKET_NAME = 'listing-image-bucket'
export const BUCKET_REGION = 'us-east-2'
export const ACCESS_KEY = env.access_key 
export const SECRET_ACCESS_KEY = env.secret_access_key

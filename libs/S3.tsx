import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: String(process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY),
    region: String(process.env.NEXT_PUBLIC_AWS_REGION),
});

const s3Bucket = String(process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME);

export { s3, s3Bucket };
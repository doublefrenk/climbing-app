/* eslint-disable no-undef */
const { S3Client,CreateBucketCommand, HeadBucketCommand, PutBucketPolicyCommand }=require('@aws-sdk/client-s3');
require('dotenv').config();


const bucketName = process.env.AWS_BUCKET_NAME;

const s3Client = new S3Client({
  region: "us-east-1",
  endpoint: "http://localhost:9000",
  forcePathStyle: true,
  credentials: {
    accessKeyId: "minioadmin",
    secretAccessKey: "minioadmin",
  },
});

initializeS3Bucket = async () => {
  try {
    await s3Client.send(new HeadBucketCommand({ Bucket: bucketName }));
    console.log(`Bucket "${bucketName}" already exists.`);
  } catch (error) {
    console.error(`Bucket "${bucketName}" does not exist. Creating...`, error.message);
    
    await s3Client.send(new CreateBucketCommand({ Bucket: bucketName }));
    console.log(`Bucket "${bucketName}" created successfully.`);

    const bucketPolicy = {
      Version: "2012-10-17",
      Statement: [{
        Sid: "PublicRead",
        Effect: "Allow",
        Principal: "*",
        Action: ["s3:GetObject"],
        Resource: [`arn:aws:s3:::${bucketName}/*`]
      }]
    };

    await s3Client.send(new PutBucketPolicyCommand({
      Bucket: bucketName,
      Policy: JSON.stringify(bucketPolicy)
    }));
    console.log(`Policy for bucket "${bucketName}" set successfully.`);
  }
}

module.exports = { 
  s3: s3Client, 
  initializeS3Bucket ,
  bucketName
};
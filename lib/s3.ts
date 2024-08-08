import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export async function uploadToS3(file: File) {
  try {
    // Create S3 client with updated configuration
    const s3Client = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
      },
    });

    const file_key = 'uploads/' + Date.now().toString() + file.name.replace(/\s/g, '-');

    // Define parameters for the PutObjectCommand
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
      Body: file,
      // Optional: Set the content type if known
      ContentType: file.type,
    };

    // Create a PutObjectCommand
    const command = new PutObjectCommand(params);

    // Upload file to S3
    await s3Client.send(command);
    console.log('Successfully uploaded to S3:', file_key);

    return {
      file_key,
      file_name: file.name
    };
    

  } catch (error: any) {
    console.error('Error uploading to S3:', error.message);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
}

export function getS3URL(file_key: string) {
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.amazonaws.com/${file_key}`;
  console.log('S3 URL:', url);
  return url;
}


import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import { PassThrough } from 'stream';
import { Readable } from 'stream';

export async function downloadFromS3(file_key: string): Promise<string | null> {
  try {
    // Create S3 client with updated configuration
    const s3 = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
      },
    });

    // Define S3 parameters
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
    };

    // Get the object from S3
    const command = new GetObjectCommand(params);
    const response = await s3.send(command);

    // Define the file path
    const file_name = `/tmp/pdf-${Date.now()}.pdf`;

    // Handle the S3 response Body
    if (response.Body instanceof Buffer) {
      // If the Body is a Buffer, write directly to the file
      fs.writeFileSync(file_name, response.Body);
    } else if (response.Body instanceof Readable) {
      // If the Body is a stream, pipe it to a file
      const writeStream = fs.createWriteStream(file_name);
      response.Body.pipe(writeStream);

      // Return a promise to resolve when the write stream finishes
      await new Promise<void>((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      });
    } else {
      console.error('S3 response body is of an unexpected type');
      return null;
    }

    console.log('Successfully downloaded from S3:', file_name);
    return file_name;
  } catch (error) {
    console.error('Error downloading from S3:', error);
    return null;
  }
}

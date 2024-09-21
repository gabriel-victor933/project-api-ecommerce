import { Injectable } from '@nestjs/common';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

@Injectable()
export class BucketService {
  private s3Client: S3Client;
  public bucketName: string;

  constructor() {
    this.bucketName = process.env.AWS_BUCKET_NAME;

    this.s3Client = new S3Client({
      region: process.env.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  putObject(fileKey: string, file: Express.Multer.File) {
    const uploadParams = {
      Bucket: this.bucketName,
      Body: file.buffer,
      Key: fileKey,
      ContentType: file.mimetype,
    };

    return this.s3Client.send(new PutObjectCommand(uploadParams));
  }

  deleteObject(fileKey: string) {
    const deleteParams = {
      Bucket: this.bucketName,
      Key: fileKey,
    };

    return this.s3Client.send(new DeleteObjectCommand(deleteParams));
  }
}

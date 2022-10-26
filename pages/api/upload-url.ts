import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const s3Client = new S3Client({
    region: process.env.REGION,
    credentials: {
      //@ts-ignore
      accessKeyId: process.env.ACCESS_KEY,
      //@ts-ignore
      secretAccessKey: process.env.SECRET_KEY,
    },
  });

  const post = await createPresignedPost(s3Client, {
    //@ts-ignore
    Bucket: process.env.S3_BUCKET_NAME,
    //@ts-ignore
    Key: req.query.file,
    Fields: {
      acl: "public-read",
      //@ts-ignore
      "Content-Type": req.query.fileType,
    },
    Expires: 600, // seconds
    Conditions: [
      ["content-length-range", 0, 1048576], // up to 1 MB
    ],
  });

  res.status(200).json(post);
}

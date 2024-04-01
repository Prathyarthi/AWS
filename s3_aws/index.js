import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "dotenv";
config()

const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});


async function getObjectURL(key) {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key
    })

    const url = await getSignedUrl(s3Client, command)
    return url
}


async function putObjectURL(filename, contentType) {
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `/uploads/userImage/${filename}`,
        ContentType: contentType
    })

    const url = await getSignedUrl(s3Client, command)
    return url
}

// console.log("URL for the image : ", await getObjectURL("Screenshot (47).png"));
console.log("URL for the image putObject : ", await putObjectURL(`Video-${Date.now().png}`),"image/png");
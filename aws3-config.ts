import { S3Client } from "@aws-sdk/client-s3";



const client = new S3Client({
    region:"us-west-2",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!,
    }
})


export default client;

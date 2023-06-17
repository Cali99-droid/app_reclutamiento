import AWS from 'aws-sdk';

const credentials = {
  accessKeyId: process.env.ACCESS_KEY_ID!,
  secretAccessKey: process.env.SECRET_ACCESS_KEY!,
};
// AWS.config.region = "us-west-2";


AWS.config.update({
  region:"us-west-2",
  credentials:{
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },  
  signatureVersion:'v4'
});

export default AWS;

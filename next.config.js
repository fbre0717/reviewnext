const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.AWS_REGION;
const BUCKET_NAME = process.env.BUCKET_NAME;

const MONGODB_URI = process.env.MONGODB_URI;


/* @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.BUCKET_NAME + ".s3."+ process.env.AWS_REGION + ".amazonaws.com"],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

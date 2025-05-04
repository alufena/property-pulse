// conserta o erro "Error: Invalid src prop (https://lh3.googleusercontent.com/a/ACg8ocJr9tMw51bEfsrhZBifDJ_KZznsg0tvPvj4ujcxKk1s8EJ5Xh8=s96-c) on `next/image`, hostname "lh3.googleusercontent.com" is not configured under images in your `next.config.js` See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host"

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;

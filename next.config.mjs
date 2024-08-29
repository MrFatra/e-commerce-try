/// <reference types="redux-persist" />
// @ts-check
import withPlaiceholder from '@plaiceholder/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'files.edgestore.dev',
                pathname: '/**',
            }
        ]
    }
};

export default withPlaiceholder(nextConfig);

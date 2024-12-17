// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
        
//         domains: ["cdn.sanity.io","via.placeholder.com"]
//     }
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol:"https",
                hostname: "cdn.sanity.io",
            }
        ],
    }
};

export default nextConfig;

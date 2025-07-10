/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        config.experiments = {
            asyncWebAssembly: true,
            layers: true,
        };
        return config;
    },
    images: {
        remotePatterns: [
            {
                hostname: "server.nucast.io",
            },
            {
                hostname: "nfyhwfevgqgzcgjyaovh.supabase.co",
            },
        ],
    },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Add a rule to handle the canvas.node binary module
        config.module.rules.push({ test: /\.node$/, use: "raw-loader" });
        config.experiments = {
            asyncWebAssembly: true,
            layers: true,
        };
        // Exclude canvas from being processed by Next.js in the browser
        if (!isServer) config.externals.push("canvas");
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

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        config.experiments = {
            asyncWebAssembly: true,
            layers: true,
        };
        const CopyWebpackPlugin = require('copy-webpack-plugin');
        const path = require('path');

        // Only copy for server build (prerendering)
        if (isServer) {
            config.plugins.push(
                new CopyWebpackPlugin({
                    patterns: [
                        {
                            from: path.resolve(
                                __dirname,
                                'node_modules/@sidan-lab/sidan-csl-rs-browser/sidan_csl_rs_bg.wasm'
                            ),
                            to: path.resolve(__dirname, '.next/server/chunks/'),
                        },
                    ],
                })
            );
        }
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

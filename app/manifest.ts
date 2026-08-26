import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'AI Report Analyzer',
        short_name: 'ReportAI',
        description: 'Analyze medical and diagnostic reports using AI.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            {
                src: '/medireport-logo.svg',
                sizes: 'any',
                type: 'image/svg+xml',
                purpose: 'any',
            },
            {
                src: '/medireport-logo.svg',
                sizes: '192x192',
                type: 'image/svg+xml',
                purpose: 'maskable',
            },
            {
                src: '/medireport-logo.svg',
                sizes: '512x512',
                type: 'image/svg+xml',
                purpose: 'maskable',
            },
        ],
    }
}
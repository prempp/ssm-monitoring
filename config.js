// SSM Dashboard Configuration
// This file contains all endpoint configurations
// Keep this file secure and do not commit sensitive credentials

const CONFIG = {
    // API Endpoints - Production Sanity Checks
    endpoints: {
        core: {
            name: 'Core Service',
            url: 'https://ssm-core-prod.06f18550.public.multi-containers.ibm.com/check/sanity',
            timeout: 10000,
            header: 'Production Sanity'
        },
        trial: {
            name: 'Trial Service',
            url: 'https://ssm-trial-prod.feab05c7.public.multi-containers.ibm.com/ssm-trial-prod/check/sanity',
            timeout: 10000,
            header: 'Production Sanity'
        },
        api: {
            name: 'API Endpoint',
            url: 'https://ssm-apiendpoint-prod.06f18550.public.multi-containers.ibm.com/apiendpoint//sanity',
            timeout: 10000,
            header: 'Production Sanity'
        },
        coreApps: {
            name: 'Core Apps',
            url: 'https://ssm-core-apps-prod.06f18550.public.multi-containers.ibm.com//sca/api/check/sanity',
            timeout: 10000,
            header: 'Core-apps'
        },
        wdpAdmin: {
            name: 'WDP Admin',
            url: 'https://ssm-wdp-admin-prod.06f18550.public.multi-containers.ibm.com//wdp-admin/api/check/sanity',
            timeout: 10000,
            header: 'WDP-Admin'
        },
        scwConsumer: {
            name: 'SCW Consumer',
            url: 'https://ssm-scw-consumer.06f18550.public.multi-containers.ibm.com/sanity',
            timeout: 10000,
            header: 'SCW-Consumer'
        }
    },

    // Refresh settings
    refreshInterval: 30000, // 30 seconds

    // Retry settings
    retry: {
        maxAttempts: 3,
        delay: 2000
    },

    // Health check criteria
    healthCheck: {
        successKeywords: ['ON', 'PASS', 'ok', 'healthy', 'success'],
        statusCodes: [200, 201, 202, 204]
    },

    // CORS Proxy (if needed)
    corsProxy: {
        enabled: false,
        url: '' // Add proxy URL if needed
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

// Made with Bob

// API Endpoints - Use proxy to avoid CORS issues
const USE_PROXY = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const endpoints = USE_PROXY ? {
    core: '/api/core',
    trial: '/api/trial',
    api: '/api/apiendpoint',
    coreApps: '/api/coreApps',
    wdpAdmin: '/api/wdpAdmin',
    scwConsumer: '/api/scwConsumer'
} : {
    core: CONFIG.endpoints.core.url,
    trial: CONFIG.endpoints.trial.url,
    api: CONFIG.endpoints.api.url,
    coreApps: CONFIG.endpoints.coreApps.url,
    wdpAdmin: CONFIG.endpoints.wdpAdmin.url,
    scwConsumer: CONFIG.endpoints.scwConsumer.url
};

// State
let autoRefreshInterval;
const REFRESH_INTERVAL = 30000; // 30 seconds

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAllServices();
    startAutoRefresh();
    
    // Refresh button handler
    document.getElementById('refreshBtn').addEventListener('click', () => {
        checkAllServices();
    });
});

// Start auto-refresh
function startAutoRefresh() {
    autoRefreshInterval = setInterval(() => {
        checkAllServices();
    }, REFRESH_INTERVAL);
}

// Check all services
async function checkAllServices() {
    updateLastChecked();
    
    const results = await Promise.all([
        checkService('core', endpoints.core),
        checkService('trial', endpoints.trial),
        checkService('api', endpoints.api),
        checkService('coreApps', endpoints.coreApps),
        checkService('wdpAdmin', endpoints.wdpAdmin),
        checkService('scwConsumer', endpoints.scwConsumer)
    ]);
    
    updateOverallStatus(results);
}

// Check individual service
async function checkService(serviceName, url) {
    const startTime = performance.now();
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        const endTime = performance.now();
        const responseTime = Math.round(endTime - startTime);
        
        let data;
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            data = { response: text };
        }
        
        const isHealthy = response.ok && (
            JSON.stringify(data).includes('ON') || 
            JSON.stringify(data).includes('PASS') ||
            JSON.stringify(data).includes('ok') ||
            JSON.stringify(data).includes('healthy')
        );
        
        updateServiceUI(serviceName, {
            status: isHealthy ? 'success' : 'error',
            data: data,
            responseTime: responseTime
        });
        
        return { service: serviceName, healthy: isHealthy };
        
    } catch (error) {
        const endTime = performance.now();
        const responseTime = Math.round(endTime - startTime);
        
        updateServiceUI(serviceName, {
            status: 'error',
            data: { error: error.message || 'Connection failed' },
            responseTime: responseTime
        });
        
        return { service: serviceName, healthy: false };
    }
}

// Update service UI
function updateServiceUI(serviceName, result) {
    const badge = document.getElementById(`${serviceName}Badge`);
    const response = document.getElementById(`${serviceName}Response`);
    const time = document.getElementById(`${serviceName}Time`);
    
    // Update badge
    badge.className = `status-badge ${result.status}`;
    if (result.status === 'success') {
        badge.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 16px; height: 16px;">
                <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Healthy</span>
        `;
    } else {
        badge.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 16px; height: 16px;">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Down</span>
        `;
    }
    
    // Update response data
    response.innerHTML = `<pre>${JSON.stringify(result.data, null, 2)}</pre>`;
    
    // Update response time
    time.textContent = `${result.responseTime} ms`;
    
    // Add animation
    const card = document.getElementById(`${serviceName}Card`);
    card.style.animation = 'none';
    setTimeout(() => {
        card.style.animation = '';
    }, 10);
}

// Update overall status banner
function updateOverallStatus(results) {
    const banner = document.getElementById('statusBanner');
    const icon = document.getElementById('statusIcon');
    const title = document.getElementById('statusTitle');
    const message = document.getElementById('statusMessage');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    const healthyCount = results.filter(r => r.healthy).length;
    const totalCount = 6; // Total number of services
    const percentage = (healthyCount / totalCount) * 100;
    
    // Update progress
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${healthyCount}/${totalCount}`;
    
    // Update banner based on status
    banner.className = 'status-banner';
    
    if (healthyCount === 6) {
        banner.classList.add('success');
        icon.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C14.76 2 17.24 3.04 19.07 4.76" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        title.textContent = '🎉 All Systems Operational';
        message.textContent = 'All services are running smoothly and responding normally';
    } else if (healthyCount === 0) {
        banner.classList.add('error');
        icon.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `;
        title.textContent = '💥 System Outage Detected';
        message.textContent = 'All services are currently unavailable. Please investigate immediately';
    } else {
        banner.classList.add('warning');
        icon.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.29 3.86L1.82 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55101 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7239C2.83871 20.9011 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.9011 21.4623 20.7239C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <circle cx="12" cy="17" r="1" fill="currentColor"/>
            </svg>
        `;
        title.textContent = '⚠️ Partial Service Disruption';
        message.textContent = `${healthyCount} out of 6 services operational. Some services may be experiencing issues`;
    }
}

// Update last checked timestamp
function updateLastChecked() {
    const lastUpdated = document.getElementById('lastUpdated');
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    
    lastUpdated.innerHTML = `
        <span class="pulse-dot"></span>
        <span>Updated ${timeString}</span>
    `;
}

// Handle visibility change (pause when tab is hidden)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(autoRefreshInterval);
    } else {
        checkAllServices();
        startAutoRefresh();
    }
});

// Handle errors globally
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});

// Made with Bob

// Tab switching functionality
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
});

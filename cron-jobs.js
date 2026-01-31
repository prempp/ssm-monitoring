/**
 * Cron Jobs Monitoring Module
 * Handles scheduled job monitoring across environments
 */

class CronJobsMonitor {
    constructor() {
        this.currentEnv = 'test';
        this.environments = ['test', 'stage', 'prod'];
        this.refreshInterval = 30000; // 30 seconds
        this.autoRefresh = true;
        this.refreshTimer = null;
        this.jobs = {};
    }

    /**
     * Initialize cron jobs monitoring
     */
    async init() {
        console.log('🚀 Initializing Cron Jobs Monitor...');
        this.setupEventListeners();
        await this.loadJobs();
        if (this.autoRefresh) {
            this.startAutoRefresh();
        }
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Environment tabs
        const envTabs = document.querySelectorAll('.env-tab');
        envTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const env = tab.dataset.env;
                this.switchEnvironment(env);
            });
        });
    }

    /**
     * Switch environment
     */
    switchEnvironment(env) {
        this.currentEnv = env;
        
        // Update active tab
        document.querySelectorAll('.env-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.env === env);
        });
        
        // Render jobs for selected environment
        this.renderJobs();
    }

    /**
     * Load jobs from all environments
     */
    async loadJobs() {
        try {
            // Use dummy data for now (can be replaced with API call)
            this.jobs = this.getDummyJobs();
            
            this.updateStats();
            this.renderJobs();
        } catch (error) {
            console.error('Error loading cron jobs:', error);
        }
    }

    /**
     * Get dummy jobs data
     */
    getDummyJobs() {
        return {
            test: [
                {
                    id: 'job-001',
                    name: 'Daily Backup',
                    type: 'BACKUP',
                    status: 'success',
                    lastRunTime: new Date(Date.now() - 3600000).toISOString(),
                    lastRunResult: 'SUCCESS',
                    lastRunDuration: '2m 34s',
                    nextRun: new Date(Date.now() + 82800000).toISOString(),
                    schedule: '0 2 * * *'
                },
                {
                    id: 'job-002',
                    name: 'Log Archive',
                    type: 'MAINTENANCE',
                    status: 'success',
                    lastRunTime: new Date(Date.now() - 1800000).toISOString(),
                    lastRunResult: 'SUCCESS',
                    lastRunDuration: '45s',
                    nextRun: new Date(Date.now() + 1800000).toISOString(),
                    schedule: '*/30 * * * *'
                },
                {
                    id: 'job-003',
                    name: 'Health Check',
                    type: 'MONITORING',
                    status: 'running',
                    lastRunTime: new Date(Date.now() - 300000).toISOString(),
                    lastRunResult: 'RUNNING',
                    lastRunDuration: '5m 12s',
                    nextRun: new Date(Date.now() + 300000).toISOString(),
                    schedule: '*/5 * * * *'
                },
                {
                    id: 'job-004',
                    name: 'Data Sync',
                    type: 'SYNC',
                    status: 'success',
                    lastRunTime: new Date(Date.now() - 7200000).toISOString(),
                    lastRunResult: 'SUCCESS',
                    lastRunDuration: '12m 8s',
                    nextRun: new Date(Date.now() + 3600000).toISOString(),
                    schedule: '0 */2 * * *'
                }
            ],
            stage: [
                {
                    id: 'job-101',
                    name: 'Daily Backup',
                    type: 'BACKUP',
                    status: 'success',
                    lastRunTime: new Date(Date.now() - 3600000).toISOString(),
                    lastRunResult: 'SUCCESS',
                    lastRunDuration: '3m 12s',
                    nextRun: new Date(Date.now() + 82800000).toISOString(),
                    schedule: '0 2 * * *'
                },
                {
                    id: 'job-102',
                    name: 'Log Archive',
                    type: 'MAINTENANCE',
                    status: 'failed',
                    lastRunTime: new Date(Date.now() - 900000).toISOString(),
                    lastRunResult: 'FAILED',
                    lastRunDuration: '1m 23s',
                    nextRun: new Date(Date.now() + 900000).toISOString(),
                    schedule: '*/15 * * * *',
                    error: 'Disk space insufficient'
                },
                {
                    id: 'job-103',
                    name: 'Performance Monitor',
                    type: 'MONITORING',
                    status: 'success',
                    lastRunTime: new Date(Date.now() - 600000).toISOString(),
                    lastRunResult: 'SUCCESS',
                    lastRunDuration: '2m 45s',
                    nextRun: new Date(Date.now() + 600000).toISOString(),
                    schedule: '*/10 * * * *'
                },
                {
                    id: 'job-104',
                    name: 'Cache Cleanup',
                    type: 'MAINTENANCE',
                    status: 'success',
                    lastRunTime: new Date(Date.now() - 10800000).toISOString(),
                    lastRunResult: 'SUCCESS',
                    lastRunDuration: '5m 34s',
                    nextRun: new Date(Date.now() + 7200000).toISOString(),
                    schedule: '0 */3 * * *'
                },
                {
                    id: 'job-105',
                    name: 'Report Generation',
                    type: 'REPORTING',
                    status: 'failed',
                    lastRunTime: new Date(Date.now() - 86400000).toISOString(),
                    lastRunResult: 'FAILED',
                    lastRunDuration: '8m 12s',
                    nextRun: new Date(Date.now() + 0).toISOString(),
                    schedule: '0 0 * * *',
                    error: 'Database connection timeout'
                }
            ],
            prod: [
                {
                    id: 'job-201',
                    name: 'Daily Backup',
                    type: 'BACKUP',
                    status: 'success',
                    lastRunTime: new Date(Date.now() - 10800000).toISOString(),
                    lastRunResult: 'SUCCESS',
                    lastRunDuration: '15m 23s',
                    nextRun: new Date(Date.now() + 75600000).toISOString(),
                    schedule: '0 2 * * *'
                },
                {
                    id: 'job-202',
                    name: 'Log Archive',
                    type: 'MAINTENANCE',
                    status: 'success',
                    lastRunTime: new Date(Date.now() - 1200000).toISOString(),
                    lastRunResult: 'SUCCESS',
                    lastRunDuration: '3m 45s',
                    nextRun: new Date(Date.now() + 600000).toISOString(),
                    schedule: '*/20 * * * *'
                },
                {
                    id: 'job-203',
                    name: 'Health Check',
                    type: 'MONITORING',
                    status: 'success',
                    lastRunTime: new Date(Date.now() - 120000).toISOString(),
                    lastRunResult: 'SUCCESS',
                    lastRunDuration: '1m 12s',
                    nextRun: new Date(Date.now() + 180000).toISOString(),
                    schedule: '*/2 * * * *'
                },
                {
                    id: 'job-204',
                    name: 'Performance Monitor',
                    type: 'MONITORING',
                    status: 'success',
                    lastRunTime: new Date(Date.now() - 600000).toISOString(),
                    lastRunResult: 'SUCCESS',
                    lastRunDuration: '4m 56s',
                    nextRun: new Date(Date.now() + 600000).toISOString(),
                    schedule: '*/10 * * * *'
                },
                {
                    id: 'job-205',
                    name: 'Data Replication',
                    type: 'SYNC',
                    status: 'running',
                    lastRunTime: new Date(Date.now() - 300000).toISOString(),
                    lastRunResult: 'RUNNING',
                    lastRunDuration: '5m 0s',
                    nextRun: new Date(Date.now() + 3300000).toISOString(),
                    schedule: '0 * * * *'
                },
                {
                    id: 'job-206',
                    name: 'Security Scan',
                    type: 'SECURITY',
                    status: 'success',
                    lastRunTime: new Date(Date.now() - 43200000).toISOString(),
                    lastRunResult: 'SUCCESS',
                    lastRunDuration: '23m 45s',
                    nextRun: new Date(Date.now() + 43200000).toISOString(),
                    schedule: '0 */12 * * *'
                }
            ]
        };
    }

    /**
     * Update statistics
     */
    updateStats() {
        const allJobs = Object.values(this.jobs).flat();
        const totalJobs = allJobs.length;
        const runningJobs = allJobs.filter(j => j.status === 'running').length;
        const successJobs = allJobs.filter(j => j.status === 'success').length;
        const failedJobs = allJobs.filter(j => j.status === 'failed').length;

        document.getElementById('totalJobs').textContent = totalJobs;
        document.getElementById('runningJobs').textContent = runningJobs;
        document.getElementById('successJobs').textContent = successJobs;
        document.getElementById('failedJobs').textContent = failedJobs;
    }

    /**
     * Render jobs for current environment
     */
    renderJobs() {
        const grid = document.getElementById('cronJobsGrid');
        if (!grid) return;

        const jobs = this.jobs[this.currentEnv] || [];
        
        if (jobs.length === 0) {
            grid.innerHTML = '<div class="loading-container"><i class="fas fa-info-circle"></i><p>No cron jobs found for this environment</p></div>';
            return;
        }

        const html = jobs.map(job => {
            const lastRun = this.formatTimeAgo(new Date(job.lastRunTime));
            const nextRun = this.formatTimeAgo(new Date(job.nextRun));
            
            return `
                <div class="cron-job-card ${job.status}">
                    <div class="job-header">
                        <div>
                            <div class="job-name">${job.name}</div>
                            <div class="job-type">${job.type}</div>
                        </div>
                        <div class="job-status-badge ${job.status}">
                            ${job.status}
                        </div>
                    </div>
                    <div class="job-details">
                        <div class="job-detail-row">
                            <span class="job-detail-label">Last Run:</span>
                            <span class="job-detail-value">${lastRun}</span>
                        </div>
                        <div class="job-detail-row">
                            <span class="job-detail-label">Duration:</span>
                            <span class="job-detail-value">${job.lastRunDuration}</span>
                        </div>
                        <div class="job-detail-row">
                            <span class="job-detail-label">Next Run:</span>
                            <span class="job-detail-value">${nextRun}</span>
                        </div>
                        <div class="job-detail-row">
                            <span class="job-detail-label">Schedule:</span>
                            <span class="job-detail-value">${job.schedule}</span>
                        </div>
                        ${job.error ? `
                            <div class="job-detail-row" style="color: var(--error); margin-top: 0.5rem;">
                                <span class="job-detail-label">Error:</span>
                                <span class="job-detail-value">${job.error}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');

        grid.innerHTML = html;
    }

    /**
     * Format time ago
     */
    formatTimeAgo(date) {
        const now = new Date();
        const diff = date - now;
        const absDiff = Math.abs(diff);
        
        const seconds = Math.floor(absDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (diff < 0) {
            // Past
            if (days > 0) return `${days}d ago`;
            if (hours > 0) return `${hours}h ago`;
            if (minutes > 0) return `${minutes}m ago`;
            return `${seconds}s ago`;
        } else {
            // Future
            if (days > 0) return `in ${days}d`;
            if (hours > 0) return `in ${hours}h`;
            if (minutes > 0) return `in ${minutes}m`;
            return `in ${seconds}s`;
        }
    }

    /**
     * Start auto-refresh
     */
    startAutoRefresh() {
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
        }
        this.refreshTimer = setInterval(() => {
            this.loadJobs();
        }, this.refreshInterval);
    }

    /**
     * Stop auto-refresh
     */
    stopAutoRefresh() {
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
            this.refreshTimer = null;
        }
    }

    /**
     * Cleanup
     */
    destroy() {
        this.stopAutoRefresh();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CronJobsMonitor;
}

// Made with Bob

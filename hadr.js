/**
 * HADR (High Availability Disaster Recovery) Monitoring Module
 * Handles DB2 HADR multi-environment monitoring
 */

class HADRMonitor {
    constructor() {
        this.environments = ['test', 'stage', 'prod', 'dr'];
        this.refreshInterval = 30000; // 30 seconds
        this.autoRefresh = true;
        this.refreshTimer = null;
    }

    /**
     * Initialize HADR monitoring
     */
    async init() {
        console.log('🚀 Initializing HADR Monitor...');
        await this.loadEnvironments();
        if (this.autoRefresh) {
            this.startAutoRefresh();
        }
    }

    /**
     * Load all HADR environments
     */
    async loadEnvironments() {
        const grid = document.getElementById('hadrEnvironmentsGrid');
        if (!grid) return;

        try {
            // Show loading state
            grid.innerHTML = '<div class="loading-container"><i class="fas fa-spinner fa-spin"></i><p>Loading HADR environments...</p></div>';

            // Use dummy data for now (can be replaced with API call)
            const data = this.getDummyHADRData();
            
            // Render environment cards
            this.renderEnvironments(data);
        } catch (error) {
            console.error('Error loading HADR environments:', error);
            grid.innerHTML = '<div class="loading-container"><i class="fas fa-exclamation-triangle"></i><p>Failed to load HADR data</p></div>';
        }
    }

    /**
     * Get dummy HADR data
     */
    getDummyHADRData() {
        return {
            test: {
                name: 'TEST',
                status: 'connected',
                hadr: {
                    primary: {
                        state: 'PEER',
                        logPosition: '0000000012345678',
                        host: 'test-db-primary.ibm.com'
                    },
                    standby: {
                        state: 'PEER',
                        logPosition: '0000000012345670',
                        host: 'test-db-standby.ibm.com'
                    },
                    syncMode: 'SYNC',
                    logGap: 8
                },
                metrics: {
                    connections: 45,
                    replicationLag: '< 1s'
                },
                jobs: [
                    { name: 'Daily Backup', status: 'success', lastRun: '2h ago' },
                    { name: 'Log Archive', status: 'success', lastRun: '30m ago' },
                    { name: 'Health Check', status: 'success', lastRun: '5m ago' }
                ]
            },
            stage: {
                name: 'STAGE',
                status: 'warning',
                hadr: {
                    primary: {
                        state: 'PEER',
                        logPosition: '0000000023456789',
                        host: 'stage-db-primary.ibm.com'
                    },
                    standby: {
                        state: 'PEER',
                        logPosition: '0000000023456750',
                        host: 'stage-db-standby.ibm.com'
                    },
                    syncMode: 'ASYNC',
                    logGap: 39
                },
                metrics: {
                    connections: 67,
                    replicationLag: '2.3s'
                },
                jobs: [
                    { name: 'Daily Backup', status: 'success', lastRun: '1h ago' },
                    { name: 'Log Archive', status: 'failed', lastRun: '15m ago' },
                    { name: 'Health Check', status: 'success', lastRun: '3m ago' }
                ]
            },
            prod: {
                name: 'PROD',
                status: 'connected',
                hadr: {
                    primary: {
                        state: 'PEER',
                        logPosition: '0000000034567890',
                        host: 'prod-db-primary.ibm.com'
                    },
                    standby: {
                        state: 'PEER',
                        logPosition: '0000000034567885',
                        host: 'prod-db-standby.ibm.com'
                    },
                    syncMode: 'SYNC',
                    logGap: 5
                },
                metrics: {
                    connections: 234,
                    replicationLag: '< 1s'
                },
                jobs: [
                    { name: 'Daily Backup', status: 'success', lastRun: '3h ago' },
                    { name: 'Log Archive', status: 'success', lastRun: '20m ago' },
                    { name: 'Health Check', status: 'success', lastRun: '2m ago' },
                    { name: 'Performance Monitor', status: 'success', lastRun: '10m ago' }
                ]
            },
            dr: {
                name: 'DR',
                status: 'connected',
                hadr: {
                    primary: {
                        state: 'REMOTE_CATCHUP',
                        logPosition: '0000000045678901',
                        host: 'dr-db-primary.ibm.com'
                    },
                    standby: {
                        state: 'REMOTE_CATCHUP',
                        logPosition: '0000000045678800',
                        host: 'dr-db-standby.ibm.com'
                    },
                    syncMode: 'SUPERASYNC',
                    logGap: 101
                },
                metrics: {
                    connections: 12,
                    replicationLag: '5.7s'
                },
                jobs: [
                    { name: 'DR Sync Check', status: 'success', lastRun: '1h ago' },
                    { name: 'Backup Verification', status: 'success', lastRun: '4h ago' }
                ]
            }
        };
    }

    /**
     * Render environment cards
     */
    renderEnvironments(data) {
        const grid = document.getElementById('hadrEnvironmentsGrid');
        if (!grid) return;

        const html = this.environments.map(env => {
            const envData = data[env];
            if (!envData) return '';

            const failedJobs = envData.jobs.filter(j => j.status === 'failed').length;
            const statusClass = failedJobs > 0 ? 'warning' : envData.status;

            return `
                <div class="env-card ${env}">
                    <div class="env-card-header">
                        <div class="env-title">
                            <div class="env-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 7V17C4 18.1046 4.89543 19 6 19H18C19.1046 19 20 18.1046 20 17V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M20 7H4L6 3H18L20 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M12 11V15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </div>
                            <div>
                                <div class="env-name">${envData.name}</div>
                                <div class="service-url">${envData.hadr.primary.host}</div>
                            </div>
                        </div>
                        <div class="env-status ${statusClass}">
                            <span class="status-dot"></span>
                            <span>${statusClass === 'connected' ? 'Connected' : statusClass === 'warning' ? 'Warning' : 'Disconnected'}</span>
                        </div>
                    </div>
                    <div class="env-card-body">
                        <!-- HADR Status -->
                        <div class="hadr-section">
                            <div class="section-title">HADR Status</div>
                            <div class="hadr-status">
                                <div class="hadr-node">
                                    <div class="node-label">Primary</div>
                                    <div class="node-state ${envData.hadr.primary.state.toLowerCase()}">${envData.hadr.primary.state}</div>
                                    <div class="node-info">Log: ${envData.hadr.primary.logPosition}</div>
                                </div>
                                <div class="hadr-node">
                                    <div class="node-label">Standby</div>
                                    <div class="node-state ${envData.hadr.standby.state.toLowerCase()}">${envData.hadr.standby.state}</div>
                                    <div class="node-info">Log: ${envData.hadr.standby.logPosition}</div>
                                </div>
                            </div>
                            <div class="sync-mode">Sync Mode: ${envData.hadr.syncMode} | Gap: ${envData.hadr.logGap} pages</div>
                        </div>

                        <!-- Scheduled Jobs -->
                        <div class="jobs-section">
                            <div class="section-title">
                                Scheduled Jobs (${envData.jobs.length})
                                ${failedJobs > 0 ? `<span class="failed-badge">${failedJobs} Failed</span>` : ''}
                            </div>
                            <div class="jobs-list">
                                ${envData.jobs.map(job => `
                                    <div class="job-item ${job.status}">
                                        <span class="job-item-name">${job.name}</span>
                                        <span class="job-item-status ${job.status}">
                                            ${job.status === 'success' ? 
                                                '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' :
                                                '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                                            }
                                            ${job.lastRun}
                                        </span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Metrics -->
                        <div class="metrics-section">
                            <div class="section-title">Health Metrics</div>
                            <div class="metrics-grid">
                                <div class="metric-item">
                                    <div class="metric-value">${envData.metrics.connections}</div>
                                    <div class="metric-label">Connections</div>
                                </div>
                                <div class="metric-item">
                                    <div class="metric-value">${envData.metrics.replicationLag}</div>
                                    <div class="metric-label">Replication Lag</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        grid.innerHTML = html;
    }

    /**
     * Start auto-refresh
     */
    startAutoRefresh() {
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
        }
        this.refreshTimer = setInterval(() => {
            this.loadEnvironments();
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
    module.exports = HADRMonitor;
}

// Made with Bob

/**
 * SonarQube Integration Module
 * Displays SonarQube security scanning information and project metrics
 */

class SonarQubeMonitor {
    constructor() {
        this.projectKey = 'your-project-key';
        this.sonarUrl = 'https://sonarqube.ibm.com';
    }

    /**
     * Initialize SonarQube monitoring
     */
    async init() {
        console.log('🚀 Initializing SonarQube Monitor...');
        this.renderDashboard();
    }

    /**
     * Render SonarQube dashboard
     */
    renderDashboard() {
        const container = document.getElementById('sonar-cube');
        if (!container) return;

        const html = `
            <div class="sonar-dashboard">
                <!-- Header Section -->
                <div class="sonar-header">
                    <div class="sonar-title">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 32px; height: 32px;">
                            <path d="M9 11L12 14L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <div>
                            <h2>SonarQube Security Scanner</h2>
                            <p class="sonar-subtitle">Automated vulnerability detection and code quality analysis</p>
                        </div>
                    </div>
                </div>

                <!-- Quick Stats -->
                <div class="sonar-stats-grid">
                    <div class="sonar-stat-card blocker">
                        <div class="stat-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                                <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">0</div>
                            <div class="stat-label">Blocker Issues</div>
                        </div>
                    </div>
                    <div class="sonar-stat-card critical">
                        <div class="stat-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.29 3.86L1.82 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55101 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7239C2.83871 20.9011 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.9011 21.4623 20.7239C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                <circle cx="12" cy="17" r="1" fill="currentColor"/>
                            </svg>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">0</div>
                            <div class="stat-label">Critical Issues</div>
                        </div>
                    </div>
                    <div class="sonar-stat-card major">
                        <div class="stat-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                                <path d="M12 8V12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                <circle cx="12" cy="16" r="1" fill="currentColor"/>
                            </svg>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">0</div>
                            <div class="stat-label">Major Issues</div>
                        </div>
                    </div>
                    <div class="sonar-stat-card security">
                        <div class="stat-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">0</div>
                            <div class="stat-label">Security Hotspots</div>
                        </div>
                    </div>
                </div>

                <!-- Features Grid -->
                <div class="sonar-features-grid">
                    <!-- Security Scanning -->
                    <div class="sonar-feature-card">
                        <div class="feature-icon security">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <h3>Security Scanning</h3>
                        <ul class="feature-list">
                            <li>✅ SQL Injection Detection</li>
                            <li>✅ XSS Vulnerability Scanning</li>
                            <li>✅ Hardcoded Credentials Check</li>
                            <li>✅ Weak Cryptography Detection</li>
                            <li>✅ Path Traversal Protection</li>
                            <li>✅ Command Injection Prevention</li>
                        </ul>
                    </div>

                    <!-- Automated Fixes -->
                    <div class="sonar-feature-card">
                        <div class="feature-icon automation">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <h3>Automated Fixes</h3>
                        <ul class="feature-list">
                            <li>✅ Automatic Branch Creation</li>
                            <li>✅ Intelligent Fix Generation</li>
                            <li>✅ Pull Request Automation</li>
                            <li>✅ Detailed Commit Messages</li>
                            <li>✅ Security Report Generation</li>
                            <li>✅ Audit Trail Logging</li>
                        </ul>
                    </div>

                    <!-- IBM Compliance -->
                    <div class="sonar-feature-card">
                        <div class="feature-icon compliance">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 11L12 14L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <h3>IBM Policy Compliance</h3>
                        <ul class="feature-list">
                            <li>✅ Quality Gate Enforcement</li>
                            <li>✅ Manual Review Required</li>
                            <li>✅ Full Audit Trail</li>
                            <li>✅ Security-First Approach</li>
                            <li>✅ Token-Based Authentication</li>
                            <li>✅ Configurable Thresholds</li>
                        </ul>
                    </div>
                </div>

                <!-- Quick Start Guide -->
                <div class="sonar-quick-start">
                    <h3>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 24px; height: 24px;">
                            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Quick Start Guide
                    </h3>
                    <div class="quick-start-steps">
                        <div class="step-card">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <h4>Install Scanner</h4>
                                <code>brew install sonar-scanner</code>
                            </div>
                        </div>
                        <div class="step-card">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <h4>Configure Project</h4>
                                <code>Edit sonar-project.properties</code>
                            </div>
                        </div>
                        <div class="step-card">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <h4>Run Scan</h4>
                                <code>./sonar-scan-and-fix.sh</code>
                            </div>
                        </div>
                        <div class="step-card">
                            <div class="step-number">4</div>
                            <div class="step-content">
                                <h4>Review Results</h4>
                                <code>Check SonarQube Dashboard</code>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Documentation Links -->
                <div class="sonar-docs">
                    <h3>📚 Documentation</h3>
                    <div class="docs-grid">
                        <a href="/Users/doron/Documents/2026/sonarcube/QUICK_START_IBM.md" class="doc-link" target="_blank">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Quick Start for IBM
                        </a>
                        <a href="/Users/doron/Documents/2026/sonarcube/IBM_COMPLIANCE.md" class="doc-link" target="_blank">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            IBM Compliance Guide
                        </a>
                        <a href="/Users/doron/Documents/2026/sonarcube/SCANNER_INSTALLATION.md" class="doc-link" target="_blank">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Scanner Installation
                        </a>
                        <a href="/Users/doron/Documents/2026/sonarcube/MULTI_REPO_SCANNING_GUIDE.md" class="doc-link" target="_blank">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Multi-Repo Scanning
                        </a>
                    </div>
                </div>

                <!-- Configuration Note -->
                <div class="sonar-note">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 20px; height: 20px;">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                        <path d="M12 16V12M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <div>
                        <strong>Configuration Required:</strong> To connect to your SonarQube server, update the configuration in 
                        <code>sonar-project.properties</code> with your project key and server URL.
                    </div>
                </div>
            </div>
        `;

        // Replace placeholder content with actual dashboard
        const placeholderContent = container.querySelector('.placeholder-content');
        if (placeholderContent) {
            container.innerHTML = html;
        }
    }

    /**
     * Cleanup
     */
    destroy() {
        console.log('🧹 Cleaning up SonarQube Monitor...');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SonarQubeMonitor;
}

// Made with Bob

# 🔒 Security Guidelines - SSM Dashboard

This document outlines security best practices and IBM security standards compliance for the SSM Dashboard.

## 📋 Security Overview

The SSM Dashboard follows IBM security standards and best practices:

- ✅ **No Hardcoded Credentials** - All sensitive data in separate config files
- ✅ **CORS Protection** - Proxy server handles cross-origin requests securely
- ✅ **Read-Only Access** - Dashboard only reads health status, no write operations
- ✅ **No Data Storage** - No sensitive data stored locally or in browser
- ✅ **HTTPS Ready** - Supports secure connections in production
- ✅ **Input Validation** - All API responses validated before display
- ✅ **Error Handling** - Graceful error handling without exposing internals

---

## 🔐 Configuration Security

### Separating Sensitive Data

The dashboard uses a separate configuration file ([`config.js`](config.js:1)) to store all endpoint URLs and settings:

```javascript
// config.js - Keep this file secure
const CONFIG = {
    endpoints: {
        core: {
            name: 'Core Service',
            url: 'https://your-endpoint.com/check/sanity',
            timeout: 10000
        }
        // ... more endpoints
    }
};
```

### Best Practices

1. **Never commit credentials to Git**
   - Add sensitive files to [`.gitignore`](.gitignore:1)
   - Use environment variables for production

2. **Use separate configs for environments**
   ```bash
   config.dev.js      # Development endpoints
   config.staging.js  # Staging endpoints
   config.prod.js     # Production endpoints (never commit)
   ```

3. **Restrict file permissions**
   ```bash
   chmod 600 config.js  # Read/write for owner only
   ```

---

## 🛡️ Proxy Server Security

The Node.js proxy server ([`proxy-server.js`](proxy-server.js:1)) provides secure API access:

### Security Features

1. **CORS Headers Management**
   - Controlled cross-origin access
   - Prevents unauthorized domains

2. **Request Timeout**
   - 10-second timeout prevents hanging requests
   - Protects against slowloris attacks

3. **Error Sanitization**
   - Generic error messages to clients
   - Detailed errors only in server logs

4. **No Credential Exposure**
   - Credentials never sent to client
   - Server-side authentication only

### Proxy Configuration

```javascript
// Only allow specific origins in production
const ALLOWED_ORIGINS = [
    'https://yourdomain.com',
    'https://dashboard.yourdomain.com'
];

// Add to proxy-server.js
if (!ALLOWED_ORIGINS.includes(origin)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
}
```

---

## 🔒 IBM Security Standards Compliance

### Data Classification

- **Public**: Dashboard UI code
- **Internal**: API endpoint URLs
- **Confidential**: Authentication credentials (if any)
- **Restricted**: None

### Access Control

1. **Authentication** (if required)
   - Implement IBM SSO integration
   - Use OAuth 2.0 or SAML
   - Never store passwords

2. **Authorization**
   - Role-based access control (RBAC)
   - Principle of least privilege
   - Regular access reviews

### Network Security

1. **HTTPS Only**
   ```javascript
   // Redirect HTTP to HTTPS
   if (req.headers['x-forwarded-proto'] !== 'https') {
       res.redirect('https://' + req.headers.host + req.url);
   }
   ```

2. **Security Headers**
   ```javascript
   res.setHeader('X-Content-Type-Options', 'nosniff');
   res.setHeader('X-Frame-Options', 'DENY');
   res.setHeader('X-XSS-Protection', '1; mode=block');
   res.setHeader('Strict-Transport-Security', 'max-age=31536000');
   ```

---

## 🚨 Incident Response

### Security Incident Procedure

1. **Detect**
   - Monitor server logs
   - Set up alerts for anomalies
   - Regular security audits

2. **Respond**
   - Isolate affected systems
   - Document the incident
   - Notify security team

3. **Recover**
   - Apply security patches
   - Restore from backups
   - Update security measures

4. **Review**
   - Post-incident analysis
   - Update procedures
   - Team training

### Contact Information

- **Security Team**: security@ibm.com
- **Incident Response**: incident-response@ibm.com
- **Emergency**: [Your emergency contact]

---

## 📊 Logging and Monitoring

### What to Log

✅ **Do Log:**
- API request timestamps
- Response times
- Error rates
- Service health status
- Failed connection attempts

❌ **Don't Log:**
- Authentication credentials
- Personal identifiable information (PII)
- Full API responses with sensitive data
- User session tokens

### Log Example

```javascript
// Good logging
console.log(`[${new Date().toISOString()}] Health check: ${serviceName} - Status: ${status} - Time: ${responseTime}ms`);

// Bad logging (don't do this)
console.log(`API Key: ${apiKey}`); // NEVER log credentials
```

---

## 🔍 Security Checklist

### Development

- [ ] No hardcoded credentials in code
- [ ] Sensitive data in separate config files
- [ ] Config files added to `.gitignore`
- [ ] Input validation implemented
- [ ] Error messages don't expose internals
- [ ] Dependencies regularly updated
- [ ] Code reviewed for security issues

### Deployment

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Logging configured
- [ ] Monitoring alerts set up
- [ ] Backup procedures in place

### Production

- [ ] Regular security audits
- [ ] Dependency vulnerability scans
- [ ] Access logs reviewed
- [ ] Incident response plan tested
- [ ] Team security training completed
- [ ] Compliance requirements met

---

## 🛠️ Security Tools

### Recommended Tools

1. **Dependency Scanning**
   ```bash
   npm audit
   npm audit fix
   ```

2. **Static Code Analysis**
   ```bash
   npm install -g eslint
   eslint --init
   ```

3. **Security Headers Testing**
   - [securityheaders.com](https://securityheaders.com)
   - [observatory.mozilla.org](https://observatory.mozilla.org)

4. **Vulnerability Scanning**
   - Snyk
   - WhiteSource
   - IBM Security AppScan

---

## 📚 Additional Resources

- [IBM Security Standards](https://www.ibm.com/security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

---

## 🔄 Updates

This security guide should be reviewed and updated:
- Quarterly (every 3 months)
- After security incidents
- When new features are added
- When security standards change

---

**Last Updated**: January 2026  
**Next Review**: April 2026  
**Document Owner**: SSM Dashboard Team
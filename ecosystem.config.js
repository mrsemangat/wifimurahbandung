// PM2 Ecosystem Configuration for FastPanel deployment
module.exports = {
  apps: [
    {
      name: 'wifimurahbandung',
      script: '.next/standalone/server.js',
      cwd: '/var/www/wifimurahbandung.web.id',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0',
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      // Logging
      error_file: '/var/www/wifimurahbandung.web.id/logs/error.log',
      out_file: '/var/www/wifimurahbandung.web.id/logs/out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
}

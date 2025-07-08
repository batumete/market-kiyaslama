#!/usr/bin/env node

const { spawn } = require('child_process');

console.log('🚀 Market Fiyat Karşılaştırma Uygulaması Başlatılıyor...');

// Backend sunucuyu başlat
console.log('📡 Backend API başlatılıyor...');
const backend = spawn('node', ['simple-server.js'], {
  stdio: ['pipe', 'pipe', 'pipe']
});

backend.stdout.on('data', (data) => {
  console.log('Backend:', data.toString().trim());
});

backend.stderr.on('data', (data) => {
  console.error('Backend Error:', data.toString().trim());
});

// 2 saniye sonra frontend başlat
setTimeout(() => {
  console.log('🎨 Frontend başlatılıyor...');
  
  const frontend = spawn('npm', ['run', 'dev'], {
    cwd: './client',
    stdio: 'inherit',
    env: { ...process.env, HOST: '0.0.0.0', PORT: '3000' }
  });
  
  frontend.on('error', (err) => {
    console.error('Frontend Error:', err);
  });
  
}, 2000);

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Uygulama kapatılıyor...');
  backend.kill();
  process.exit(0);
});
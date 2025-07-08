#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Market Karşılaştırma Uygulaması');
console.log('📍 BİM, A101, Migros fiyat karşılaştırması');
console.log('');

// Backend başlat
const backend = spawn('node', ['server/http-server.js'], {
  stdio: 'pipe',
  cwd: process.cwd()
});

backend.stdout.on('data', (data) => {
  console.log('🔧 Backend:', data.toString().trim());
});

// 2 saniye bekle, sonra frontend başlat
setTimeout(() => {
  const frontend = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '3000'], {
    stdio: 'pipe',
    cwd: path.join(process.cwd(), 'client')
  });

  frontend.stdout.on('data', (data) => {
    console.log('🎨 Frontend:', data.toString().trim());
  });

  setTimeout(() => {
    console.log('');
    console.log('✅ UYGULAMA HAZIR!');
    console.log('🌐 Ana Site: http://localhost:3000');
    console.log('🔗 API Test: http://localhost:5000/api/markets');
    console.log('');
    console.log('📱 Sayfa Menüsü:');
    console.log('  • Ana Sayfa - Market logoları');
    console.log('  • Ürünler - Arama, sepete ekleme');
    console.log('  • Sepet - Miktar düzenleme');
    console.log('  • Karşılaştırma - En ucuz market');
    console.log('');
  }, 3000);
}, 2000);

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n❌ Uygulama kapatılıyor...');
  backend.kill();
  frontend.kill();
  process.exit();
});
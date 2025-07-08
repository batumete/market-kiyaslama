// Basit server starter - sürekli çalışır durumda tutar
const { spawn } = require('child_process');

console.log('Market Karşılaştırma Server Başlatılıyor...');

function startServer() {
  const server = spawn('node', ['server/http-server.js'], {
    stdio: 'inherit'
  });
  
  server.on('exit', (code) => {
    console.log(`Server çıktı, kod: ${code}. Yeniden başlatılıyor...`);
    setTimeout(startServer, 2000); // 2 saniye sonra yeniden başlat
  });
  
  server.on('error', (err) => {
    console.error('Server error:', err);
    setTimeout(startServer, 2000);
  });
}

startServer();

process.on('SIGINT', () => {
  console.log('Server kapatılıyor...');
  process.exit();
});
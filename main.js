const { spawn } = require('child_process');
const path = require('path');

console.log('Market Karşılaştırma Uygulaması');
console.log('Backend: Port 5000, Frontend: Port 3000');

// Backend
const backend = spawn('node', ['simple-server.js']);
backend.stdout.on('data', (data) => console.log('Backend:', data.toString().trim()));
backend.stderr.on('data', (data) => console.log('Backend ERROR:', data.toString().trim()));
backend.on('error', (err) => console.log('Backend spawn error:', err));
backend.on('exit', (code) => {
  console.log('Backend exited with code:', code);
  if (code !== 0) {
    console.log('Backend restart attempt...');
    setTimeout(() => {
      spawn('node', ['simple-server.js']);
    }, 2000);
  }
});

// Frontend (3 saniye sonra)
setTimeout(() => {
  console.log('Frontend başlatılıyor...');
  const frontend = spawn('npx', ['vite', '--host', '0.0.0.0'], { 
    cwd: 'client',
    env: { ...process.env, VITE_HOST: '0.0.0.0' },
    stdio: 'inherit'
  });
  
  frontend.on('error', (err) => {
    console.log('Frontend spawn error:', err);
  });
  
  frontend.on('exit', (code) => {
    console.log('Frontend exited with code:', code);
  });
}, 3000);

process.on('SIGINT', () => process.exit());
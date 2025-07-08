#!/usr/bin/env python3
import subprocess
import time
import os

print("🚀 Market Karşılaştırma Uygulaması Başlatılıyor...")

# Backend başlat
backend = subprocess.Popen(['node', 'server/http-server.js'], 
                          stdout=subprocess.PIPE, 
                          stderr=subprocess.PIPE)
print("✓ Backend başlatıldı (Port 5000)")
time.sleep(2)

# Frontend başlat  
os.chdir('client')
frontend = subprocess.Popen(['npx', 'vite', '--host', '0.0.0.0', '--port', '3000'],
                           stdout=subprocess.PIPE,
                           stderr=subprocess.PIPE)
print("✓ Frontend başlatıldı (Port 3000)")

print("\n🌐 Uygulama Hazır!")
print("📍 Ana Site: http://localhost:3000")
print("🔗 API: http://localhost:5000/api/markets")

try:
    backend.wait()
except KeyboardInterrupt:
    print("\n❌ Uygulama kapatılıyor...")
    backend.terminate()
    frontend.terminate()
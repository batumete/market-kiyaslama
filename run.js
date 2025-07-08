// Basit çalışan backend sunucu
console.log('🚀 Market Kıyasla API Başlatılıyor...');
console.log('Port: 5000');

const http = require('http');

// Ana sayfa kategorilerine uygun ürün verisi
const products = [
  // Yep Yeni kategorisi
  { id: '1', name: 'Süt 1L', category: 'Yep Yeni', brand: 'Pınar', unit: '1L' },
  { id: '8', name: 'Peynir Beyaz 500g', category: 'Yep Yeni', brand: 'Eker', unit: '500g' },
  { id: '16', name: 'Yogurt 1kg', category: 'Yep Yeni', brand: 'Danone', unit: '1kg' },
  
  // Dizi Keyfi (Atıştırmalık)
  { id: '21', name: 'Çikolata 80g', category: 'Dizi Keyfi', brand: 'Ülker', unit: '80g' },
  { id: '22', name: 'Cips 110g', category: 'Dizi Keyfi', brand: 'Lays', unit: '110g' },
  { id: '23', name: 'Bisküvi 300g', category: 'Dizi Keyfi', brand: 'Eti', unit: '300g' },
  
  // Su & İçecek
  { id: '11', name: 'Çay 500g', category: 'Su & İçecek', brand: 'Lipton', unit: '500g' },
  { id: '17', name: 'Soda 2.5L', category: 'Su & İçecek', brand: 'Coca Cola', unit: '2.5L' },
  
  // Et & Tavuk & Balık
  { id: '7', name: 'Tavuk But', category: 'Et & Tavuk & Balık', brand: '', unit: '1kg' },
  
  // Meyve & Sebze
  { id: '4', name: 'Domates', category: 'Meyve & Sebze', brand: '', unit: '1kg' },
  { id: '9', name: 'Elma', category: 'Meyve & Sebze', brand: '', unit: '1kg' },
  { id: '10', name: 'Muz', category: 'Meyve & Sebze', brand: '', unit: '1kg' },
  { id: '20', name: 'Patates', category: 'Meyve & Sebze', brand: '', unit: '1kg' },
  
  // Fırın
  { id: '2', name: 'Ekmek', category: 'Fırın', brand: '', unit: '1 adet' },
  
  // Süt & Kahvaltılık
  { id: '15', name: 'Bal 850g', category: 'Süt & Kahvaltılık', brand: 'Balparmak', unit: '850g' },
  { id: '18', name: 'Margarin 500g', category: 'Süt & Kahvaltılık', brand: 'Sana', unit: '500g' },
  
  // Temel Gıda
  { id: '3', name: 'Yumurta 10lu', category: 'Temel Gıda', brand: '', unit: '10 adet' },
  { id: '5', name: 'Makarna 500g', category: 'Temel Gıda', brand: 'Barilla', unit: '500g' },
  { id: '6', name: 'Pirinç 1kg', category: 'Temel Gıda', brand: 'Osmancık', unit: '1kg' },
  { id: '12', name: 'Şeker 1kg', category: 'Temel Gıda', brand: 'Türk Şeker', unit: '1kg' },
  { id: '14', name: 'Zeytinyağı 1L', category: 'Temel Gıda', brand: 'Kristal', unit: '1L' },
  { id: '19', name: 'Bulgur 1kg', category: 'Temel Gıda', brand: 'Duru', unit: '1kg' },
  
  // Temizlik & Ev Gereçleri
  { id: '13', name: 'Deterjan 2.5L', category: 'Temizlik & Ev Gereçleri', brand: 'Ariel', unit: '2.5L' },
  
  // Hazır Yemek & Meze
  { id: '25', name: 'Zeytin 500g', category: 'Hazır Yemek & Meze', brand: 'Marmarabirlik', unit: '500g' },
  { id: '26', name: 'Turşu 670g', category: 'Hazır Yemek & Meze', brand: 'Tamek', unit: '670g' },
  
  // Dondurma
  { id: '24', name: 'Dondurma Vanilyalı', category: 'Dondurma', brand: 'Algida', unit: '1 kutu' },
  
  // Kişisel Bakım & Kozmetik
  { id: '27', name: 'Şampuan 400ml', category: 'Kişisel Bakım & Kozmetik', brand: 'Head & Shoulders', unit: '400ml' },
  { id: '28', name: 'Diş Macunu 75ml', category: 'Kişisel Bakım & Kozmetik', brand: 'Colgate', unit: '75ml' },
  
  // Bebek
  { id: '29', name: 'Bebek Bezi 50li', category: 'Bebek', brand: 'Prima', unit: '50 adet' },
  { id: '30', name: 'Bebek Maması 400g', category: 'Bebek', brand: 'Aptamil', unit: '400g' }
];

const markets = [
  { id: '1', name: 'BİM', logo: '/logos/bim.png', color: '#00A651' },
  { id: '2', name: 'A101', logo: '/logos/a101.png', color: '#E31E24' },
  { id: '3', name: 'Migros', logo: '/logos/migros.png', color: '#FF6600' }
];

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  console.log(`${req.method} ${req.url}`);
  
  if (req.url === '/api/products') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
    return;
  }
  
  if (req.url === '/api/markets') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(markets));
    return;
  }
  
  if (req.url === '/api/products-with-prices') {
    const productsWithPrices = products.map(product => {
      const prices = [
        { id: `${product.id}-1`, productId: product.id, marketId: '1', price: Math.floor(Math.random() * 50) + 10, market: markets[0] },
        { id: `${product.id}-2`, productId: product.id, marketId: '2', price: Math.floor(Math.random() * 50) + 12, market: markets[1] },
        { id: `${product.id}-3`, productId: product.id, marketId: '3', price: Math.floor(Math.random() * 50) + 15, market: markets[2] }
      ];
      
      const lowestPrice = prices.reduce((min, current) => 
        current.price < min.price ? current : min, prices[0]);
      
      return { ...product, prices, lowestPrice };
    });
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(productsWithPrices));
    return;
  }
  
  if (req.url === '/api/cart') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([]));
    return;
  }
  
  // 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(5000, '0.0.0.0', () => {
  console.log('✅ API Server 5000 portunda hazır');
  console.log('📋 Endpoints: /api/products, /api/markets, /api/products-with-prices');
});

server.on('error', (err) => {
  console.error('❌ Server error:', err);
});
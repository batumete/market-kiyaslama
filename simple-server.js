// Basit test server - sadece API test için
const http = require('http');

// In-memory sepet storage
let shoppingCart = [];

const products = [
  // Yep Yeni kategorisi
  { id: '1', name: 'Süt 1L', category: 'Yep Yeni', brand: 'Pınar', unit: 'adet' },
  { id: '8', name: 'Peynir Beyaz 500g', category: 'Yep Yeni', brand: 'Eker', unit: 'paket' },
  { id: '16', name: 'Yogurt 1kg', category: 'Yep Yeni', brand: 'Danone', unit: 'kova' },
  
  // Atıştırmalık kategorisi
  { id: '21', name: 'Çikolata 80g', category: 'Atıştırmalık', brand: 'Ülker', unit: 'paket' },
  { id: '22', name: 'Cips 110g', category: 'Atıştırmalık', brand: 'Lays', unit: 'paket' },
  { id: '23', name: 'Bisküvi 300g', category: 'Atıştırmalık', brand: 'Eti', unit: 'paket' },
  
  // Su & İçecek
  { id: '11', name: 'Çay 500g', category: 'Su & İçecek', brand: 'Lipton', unit: 'paket' },
  { id: '17', name: 'Soda 2.5L', category: 'Su & İçecek', brand: 'Coca Cola', unit: 'şişe' },
  
  // Et & Tavuk & Balık
  { id: '7', name: 'Tavuk But', category: 'Et & Tavuk & Balık', brand: '', unit: 'kg' },
  
  // Meyve & Sebze
  { id: '4', name: 'Domates', category: 'Meyve & Sebze', brand: '', unit: 'kg' },
  { id: '9', name: 'Elma', category: 'Meyve & Sebze', brand: '', unit: 'kg' },
  { id: '10', name: 'Muz', category: 'Meyve & Sebze', brand: '', unit: 'kg' },
  { id: '20', name: 'Patates', category: 'Meyve & Sebze', brand: '', unit: 'kg' },
  
  // Fırın
  { id: '2', name: 'Ekmek', category: 'Fırın', brand: '', unit: 'adet' },
  
  // Süt & Kahvaltılık
  { id: '15', name: 'Bal 850g', category: 'Süt & Kahvaltılık', brand: 'Balparmak', unit: 'kavanoz' },
  { id: '18', name: 'Margarin 500g', category: 'Süt & Kahvaltılık', brand: 'Sana', unit: 'paket' },
  
  // Temel Gıda
  { id: '3', name: 'Yumurta 10lu', category: 'Temel Gıda', brand: '', unit: 'paket' },
  { id: '5', name: 'Makarna 500g', category: 'Temel Gıda', brand: 'Barilla', unit: 'paket' },
  { id: '6', name: 'Pirinç 1kg', category: 'Temel Gıda', brand: 'Osmancık', unit: 'kg' },
  { id: '12', name: 'Şeker 1kg', category: 'Temel Gıda', brand: 'Türk Şeker', unit: 'kg' },
  { id: '19', name: 'Bulgur 1kg', category: 'Temel Gıda', brand: 'Duru', unit: 'kg' },
  { id: '14', name: 'Zeytinyağı 1L', category: 'Temel Gıda', brand: 'Kristal', unit: 'şişe' },
  
  // Temizlik & Ev Gereçleri
  { id: '13', name: 'Deterjan 2.5L', category: 'Temizlik & Ev Gereçleri', brand: 'Ariel', unit: 'şişe' }
];

const server = http.createServer((req, res) => {
  console.log('Request:', req.method, req.url);
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  if (req.url.startsWith('/api/products')) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const category = url.searchParams.get('category');
    
    let filteredProducts = products;
    if (category) {
      filteredProducts = products.filter(p => p.category === category);
    }
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(filteredProducts));
    return;
  }
  
  if (req.url === '/api/markets') {
    const markets = [
      { id: '1', name: 'BİM', logo: '/logos/bim.png', color: '#00A651' },
      { id: '2', name: 'A101', logo: '/logos/a101.png', color: '#E31E24' },
      { id: '3', name: 'Migros', logo: '/logos/migros.png', color: '#FF6600' }
    ];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(markets));
    return;
  }
  
  if (req.url === '/api/products-with-prices') {
    // Her ürün için rastgele fiyatlar oluştur
    const productsWithPrices = products.map(product => {
      const basePrices = {
        '1': Math.floor(Math.random() * 50) + 10, // BİM
        '2': Math.floor(Math.random() * 50) + 12, // A101  
        '3': Math.floor(Math.random() * 50) + 15  // Migros
      };
      
      const prices = [
        { id: `${product.id}-1`, productId: product.id, marketId: '1', price: basePrices['1'], lastUpdated: new Date(), market: { id: '1', name: 'BİM', color: '#00A651' }},
        { id: `${product.id}-2`, productId: product.id, marketId: '2', price: basePrices['2'], lastUpdated: new Date(), market: { id: '2', name: 'A101', color: '#E31E24' }},
        { id: `${product.id}-3`, productId: product.id, marketId: '3', price: basePrices['3'], lastUpdated: new Date(), market: { id: '3', name: 'Migros', color: '#FF6600' }}
      ];
      
      const lowestPrice = prices.reduce((min, current) => 
        current.price < min.price ? current : min, prices[0]);
      
      return {
        ...product,
        prices,
        lowestPrice
      };
    });
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(productsWithPrices));
    return;
  }
  
  // Sepet endpoint'leri
  if (req.url === '/api/cart') {
    if (req.method === 'GET') {
      // Sepeti ürün bilgileriyle birlikte döndür
      const cartWithProducts = shoppingCart.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
          ...item,
          product: product
        };
      });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(cartWithProducts));
      return;
    }
    
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', () => {
        try {
          const { productId, quantity } = JSON.parse(body);
          
          // Mevcut ürün varsa miktarını güncelle
          const existingItem = shoppingCart.find(item => item.productId === productId);
          if (existingItem) {
            existingItem.quantity += quantity;
          } else {
            // Yeni ürün ekle
            const newItem = {
              id: Date.now().toString(),
              productId,
              quantity,
              addedAt: new Date()
            };
            shoppingCart.push(newItem);
          }
          
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Geçersiz veri' }));
        }
      });
      return;
    }
    
    if (req.method === 'DELETE') {
      // Sepeti temizle
      shoppingCart = [];
      res.writeHead(204);
      res.end();
      return;
    }
  }
  
  // Sepet item güncelleme/silme
  if (req.url.startsWith('/api/cart/')) {
    const itemId = req.url.split('/')[3];
    
    if (req.method === 'PUT') {
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', () => {
        try {
          const { quantity } = JSON.parse(body);
          const item = shoppingCart.find(item => item.id === itemId);
          if (item) {
            item.quantity = quantity;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
          } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Ürün bulunamadı' }));
          }
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Geçersiz veri' }));
        }
      });
      return;
    }
    
    if (req.method === 'DELETE') {
      const index = shoppingCart.findIndex(item => item.id === itemId);
      if (index !== -1) {
        shoppingCart.splice(index, 1);
        res.writeHead(204);
        res.end();
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Ürün bulunamadı' }));
      }
      return;
    }
  }
  
  // 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Simple Server ${PORT} portunda çalışıyor`);
  console.log('Test endpoints: /api/products, /api/markets');
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

module.exports = server;
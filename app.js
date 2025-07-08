const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('🚀 Market Kıyasla Uygulaması');

// Ana sayfa kategorilerine uygun ürünler
const products = [
  // Yep Yeni kategorisi  
  { id: '1', name: 'Süt 1L', category: 'Yep Yeni', brand: 'Pınar', unit: '1L' },
  { id: '5', name: 'Peynir Beyaz 500g', category: 'Yep Yeni', brand: 'Eker', unit: '500g' },
  { id: '16', name: 'Yogurt 1kg', category: 'Yep Yeni', brand: 'Danone', unit: '1kg' },
  
  // Atıştırmalık kategorisi
  { id: '21', name: 'Çikolata 80g', category: 'Atıştırmalık', brand: 'Ülker', unit: '80g' },
  { id: '22', name: 'Cips 110g', category: 'Atıştırmalık', brand: 'Lays', unit: '110g' },
  { id: '23', name: 'Bisküvi 300g', category: 'Atıştırmalık', brand: 'Eti', unit: '300g' },
  
  // Su & İçecek
  { id: '11', name: 'Çay 500g', category: 'Su & İçecek', brand: 'Lipton', unit: '500g' },
  { id: '17', name: 'Soda 2.5L', category: 'Su & İçecek', brand: 'Coca Cola', unit: '2.5L' },
  
  // Et & Tavuk & Balık
  { id: '7', name: 'Tavuk But', category: 'Et & Tavuk & Balık', brand: 'Banvit', unit: '1kg' },
  
  // Meyve & Sebze
  { id: '4', name: 'Domates', category: 'Meyve & Sebze', brand: '', unit: '1kg' },
  { id: '9', name: 'Elma', category: 'Meyve & Sebze', brand: '', unit: '1kg' },
  { id: '10', name: 'Muz', category: 'Meyve & Sebze', brand: '', unit: '1kg' },
  
  // Fırın
  { id: '2', name: 'Ekmek', category: 'Fırın', brand: 'Uno', unit: '450g' },
  { id: '6', name: 'Tost Ekmeği', category: 'Fırın', brand: 'Ekmecik', unit: '670g' },
  
  // Temel Gıda
  { id: '3', name: 'Yumurta 10lu', category: 'Temel Gıda', brand: '', unit: '10 adet' },
  { id: '12', name: 'Şeker 1kg', category: 'Temel Gıda', brand: 'Türk Şeker', unit: '1kg' },
  
  // Temizlik & Ev Gereçleri
  { id: '13', name: 'Deterjan 2.5L', category: 'Temizlik & Ev Gereçleri', brand: 'Ariel', unit: '2.5L' }
];

const markets = [
  { id: '1', name: 'BİM', logo: '/logos/bim.png', color: '#00A651' },
  { id: '2', name: 'A101', logo: '/logos/a101.png', color: '#E31E24' },
  { id: '3', name: 'Migros', logo: '/logos/migros.png', color: '#FF6600' }
];

// Kategorilere göre güncellenmiş fiyatlar (Haziran 2025)
const realPrices = {
  // Yep Yeni
  '1': { bim: 45.50, a101: 47.90, migros: 49.50 }, // Süt 1L
  '5': { bim: 65.90, a101: 69.50, migros: 72.00 }, // Peynir Beyaz 500g
  '16': { bim: 28.50, a101: 30.90, migros: 32.50 }, // Yogurt 1kg
  
  // Atıştırmalık
  '21': { bim: 12.50, a101: 13.90, migros: 14.50 }, // Çikolata 80g
  '22': { bim: 18.75, a101: 19.90, migros: 20.50 }, // Cips 110g
  '23': { bim: 22.50, a101: 24.90, migros: 25.50 }, // Bisküvi 300g
  
  // Su & İçecek
  '11': { bim: 85.50, a101: 89.90, migros: 92.50 }, // Çay 500g
  '17': { bim: 38.50, a101: 42.90, migros: 45.50 }, // Soda 2.5L
  
  // Et & Tavuk & Balık
  '7': { bim: 48.00, a101: 52.00, migros: 55.00 }, // Tavuk But 1kg
  
  // Meyve & Sebze
  '4': { bim: 25.50, a101: 28.90, migros: 30.50 }, // Domates 1kg
  '9': { bim: 35.50, a101: 38.90, migros: 40.50 }, // Elma 1kg
  '10': { bim: 42.50, a101: 45.90, migros: 48.50 }, // Muz 1kg
  
  // Fırın
  '2': { bim: 4.50, a101: 8.00, migros: 5.20 }, // Ekmek 450g
  '6': { bim: 11.99, a101: 14.90, migros: 13.50 }, // Tost Ekmeği 670g
  
  // Temel Gıda
  '3': { bim: 35.50, a101: 38.90, migros: 40.50 }, // Yumurta 10lu
  '12': { bim: 32.50, a101: 35.90, migros: 38.50 }, // Şeker 1kg
  
  // Temizlik
  '13': { bim: 125.50, a101: 139.90, migros: 142.50 } // Deterjan 2.5L
};

function generatePricesForProduct(product) {
  const productPrices = realPrices[product.id];
  
  const prices = [
    {
      id: `${product.id}-1`,
      productId: product.id,
      marketId: '1',
      price: productPrices.bim,
      lastUpdated: new Date(),
      market: markets[0]
    },
    {
      id: `${product.id}-2`,
      productId: product.id,
      marketId: '2',
      price: productPrices.a101,
      lastUpdated: new Date(),
      market: markets[1]
    },
    {
      id: `${product.id}-3`,
      productId: product.id,
      marketId: '3',
      price: productPrices.migros,
      lastUpdated: new Date(),
      market: markets[2]
    }
  ];
  
  const lowestPrice = prices.reduce((min, current) => 
    current.price < min.price ? current : min, prices[0]);
  
  return { ...product, prices, lowestPrice };
}

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  console.log(`${req.method} ${req.url}`);
  
  // API endpoints
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
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(markets));
    return;
  }
  
  if (req.url === '/api/products-with-prices') {
    const productsWithPrices = products.map(generatePricesForProduct);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(productsWithPrices));
    return;
  }
  
  if (req.url === '/api/cart') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([]));
    return;
  }
  
  // Ana sayfa için HTML döndür
  if (req.url === '/' || req.url === '/index.html') {
    const html = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Market Fiyat Karşılaştırma</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; text-align: center; }
        .nav { display: flex; gap: 20px; justify-content: center; margin: 20px 0; }
        .nav button { padding: 10px 20px; border: none; border-radius: 5px; background: #667eea; color: white; cursor: pointer; }
        .nav button:hover { background: #764ba2; }
        .products { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .product { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .product h3 { color: #333; margin-top: 0; }
        .prices { margin-top: 10px; }
        .price { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #eee; }
        .loading { text-align: center; padding: 50px; color: #666; }
        .error { text-align: center; padding: 50px; color: #e74c3c; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        const { useState, useEffect } = React;
        
        function App() {
            const [products, setProducts] = useState([]);
            const [loading, setLoading] = useState(true);
            const [error, setError] = useState(null);
            const [currentPage, setCurrentPage] = useState('products');
            
            useEffect(() => {
                fetchProducts();
            }, []);
            
            const fetchProducts = async () => {
                try {
                    setLoading(true);
                    const response = await fetch('/api/products-with-prices');
                    if (!response.ok) throw new Error('API yanıt vermedi');
                    const data = await response.json();
                    setProducts(data);
                    setError(null);
                } catch (err) {
                    setError('Ürünler yüklenirken hata oluştu: ' + err.message);
                } finally {
                    setLoading(false);
                }
            };
            
            const formatPrice = (price) => {
                return price.toFixed(2) + ' ₺';
            };
            
            if (loading) {
                return <div className="loading">Ürünler yükleniyor...</div>;
            }
            
            if (error) {
                return (
                    <div className="error">
                        <h2>Hata</h2>
                        <p>{error}</p>
                        <button onClick={fetchProducts}>Tekrar Dene</button>
                    </div>
                );
            }
            
            return (
                <div className="container">
                    <div className="header">
                        <h1>🛒 Market Fiyat Karşılaştırma</h1>
                        <p>BİM, A101 ve Migros fiyatlarını karşılaştırın</p>
                    </div>
                    
                    <div className="nav">
                        <button onClick={() => setCurrentPage('products')}>Ürünler</button>
                        <button onClick={() => setCurrentPage('markets')}>Marketler</button>
                    </div>
                    
                    {currentPage === 'products' && (
                        <div className="products">
                            {products.map(product => (
                                <div key={product.id} className="product">
                                    <h3>{product.name}</h3>
                                    <p><strong>Kategori:</strong> {product.category}</p>
                                    <p><strong>Marka:</strong> {product.brand || 'Bilinmiyor'}</p>
                                    <p><strong>Birim:</strong> {product.unit}</p>
                                    
                                    <div className="prices">
                                        <h4>Fiyatlar:</h4>
                                        {product.prices && product.prices.map(price => (
                                            <div key={price.id} className="price">
                                                <span style={{color: price.market.color}}>
                                                    {price.market.name}
                                                </span>
                                                <strong>{formatPrice(price.price)}</strong>
                                            </div>
                                        ))}
                                        {product.lowestPrice && (
                                            <div className="price" style={{backgroundColor: '#e8f5e8'}}>
                                                <span>🏆 En Uygun: {product.lowestPrice.market.name}</span>
                                                <strong>{formatPrice(product.lowestPrice.price)}</strong>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {products.length === 0 && (
                        <div className="loading">Henüz ürün bulunamadı.</div>
                    )}
                </div>
            );
        }
        
        ReactDOM.render(<App />, document.getElementById('root'));
    </script>
</body>
</html>`;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }
  
  // Diğer statik dosyalar
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Uygulama ${PORT} portunda çalışıyor`);
  console.log(`📱 Frontend: http://localhost:${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/api/products`);
});

server.on('error', (err) => {
  console.error('❌ Server hatası:', err.message);
});
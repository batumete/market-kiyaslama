const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Statik dosyalar için client/dist klasörünü serve et
app.use(express.static(path.join(__dirname, 'client/dist')));

// Ana sayfa için basit HTML
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Market Fiyat Karşılaştırma</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-50">
        <div class="container mx-auto px-4 py-8">
            <h1 class="text-3xl font-bold text-center mb-8">Market Fiyat Karşılaştırma</h1>
            
            <!-- Ana Menü -->
            <div class="text-center mb-8">
                <a href="/products" class="bg-blue-600 text-white px-6 py-3 rounded-lg mx-2 hover:bg-blue-700">Ürünler</a>
                <a href="/api/products" class="bg-green-600 text-white px-6 py-3 rounded-lg mx-2 hover:bg-green-700">API Test</a>
            </div>
            
            <!-- Products Grid -->
            <div id="products-container">
                <h2 class="text-2xl font-bold mb-6">Ürünler (BİM Tasarımı)</h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3" id="products-grid">
                    <!-- Ürünler burada yüklenecek -->
                </div>
            </div>
        </div>
        
        <script>
        // Ürünleri yükle
        fetch('/api/products')
            .then(response => response.json())
            .then(products => {
                const grid = document.getElementById('products-grid');
                products.forEach(product => {
                    const minPrice = Math.min(...product.prices.map(p => p.price));
                    const bestMarket = product.prices.find(p => p.price === minPrice);
                    
                    const productCard = \`
                        <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer p-3">
                            <div class="aspect-square bg-gray-50 rounded-lg flex items-center justify-center mb-3">
                                <span class="text-4xl">📦</span>
                            </div>
                            <div class="text-center">
                                <h3 class="text-xs font-medium text-gray-900 mb-1 min-h-[2rem]">\${product.name}</h3>
                                <p class="text-xs text-gray-500 mb-2">\${product.unit}</p>
                                <div class="flex items-center justify-center space-x-1 mb-2">
                                    <span class="text-sm font-bold text-gray-900">₺\${bestMarket.price}</span>
                                    <span class="text-xs text-gray-600">(\${bestMarket.market})</span>
                                </div>
                                <button class="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-1.5 px-2 rounded text-xs">
                                    Sepete Ekle
                                </button>
                            </div>
                        </div>
                    \`;
                    grid.innerHTML += productCard;
                });
            });
        </script>
    </body>
    </html>
  `);
});

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Basit test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API çalışıyor!', timestamp: new Date() });
});

// Ürünler
const products = [
  { id: '1', name: 'Tadım Kavrulmuş Siyah Ayçekirdeği', category: 'Atıştırmalık', brand: 'Tadım', unit: '180G', image: 'https://images.migrosone.com/sanalmarket/product/07622300/07622300-0d2b66-1650x1650.jpg', description: 'Özenle seçilmiş, kavrulmuş siyah ayçekirdeği. Doğal ve lezzetli atıştırmalık.', prices: [
    { market: 'BİM', price: 8.50 },
    { market: 'A101', price: 8.75 },
    { market: 'Migros', price: 9.00 }
  ]},
  { id: '2', name: 'Uno Beyaz Ekmek', category: 'Ekmek', brand: 'Uno', unit: '450g', prices: [
    { market: 'BİM', price: 4.50 },
    { market: 'A101', price: 8.00 },
    { market: 'Migros', price: 5.20 }
  ]},
  { id: '3', name: 'Banvit Tavuk Göğsü', category: 'Et', brand: 'Banvit', unit: '1kg', prices: [
    { market: 'BİM', price: 115.00 },
    { market: 'A101', price: 120.00 },
    { market: 'Migros', price: 125.00 }
  ]}
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products-with-prices', (req, res) => {
  res.json(products);
});

// Ürün detay sayfası
app.get('/product/:id', (req, res) => {
  const productId = req.params.id;
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    res.status(404).send('Ürün bulunamadı');
    return;
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${product.name} - Market Karşılaştırma</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 py-6">
            <!-- Breadcrumb -->
            <div class="bg-gray-50 border-b mb-6">
                <div class="py-3">
                    <div class="flex items-center space-x-2 text-sm text-gray-500">
                        <a href="/" class="hover:text-orange-600">Anasayfa</a>
                        <span>›</span>
                        <a href="/products" class="hover:text-orange-600">Ürünler</a>
                        <span>›</span>
                        <span class="text-gray-900 font-medium">${product.name}</span>
                    </div>
                </div>
            </div>

            <!-- YENI DÜZEN - SOL GÖRSEL SAĞ AÇIKLAMA -->
            <div style="display: flex; gap: 40px;">
                
                <!-- SOL TARAF: ÜRÜN GÖRSELI + ANA BİLGİLER -->
                <div style="display: flex; gap: 30px; flex: 1;">
                    <!-- Ürün Görseli - Sol -->
                    <div style="flex-shrink: 0;">
                        <img 
                            src="${product.image || 'https://via.placeholder.com/300x400'}" 
                            alt="${product.name}"
                            style="width: 300px; height: auto; max-height: 450px; object-fit: contain;"
                        />
                    </div>

                    <!-- Ana Bilgiler - Resmin Yanında -->
                    <div style="flex: 1; padding-left: 20px;">
                        <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 8px; color: #111;">
                            ${product.name}
                        </h1>
                        <div style="color: #f97316; font-weight: 500; margin-bottom: 4px;">
                            ${product.brand}
                        </div>
                        <div style="font-size: 14px; color: #666; margin-bottom: 20px;">
                            ${product.unit}
                        </div>

                        <div style="font-size: 28px; font-weight: bold; margin-bottom: 4px; color: #111;">
                            ${product.prices[0].price.toFixed(2)} ₺
                        </div>
                        <div style="font-size: 14px; color: #666; margin-bottom: 24px;">adet</div>

                        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
                            <div style="display: flex; align-items: center; border: 1px solid #d1d5db; border-radius: 4px;">
                                <button style="padding: 8px; background: white; border: none; cursor: pointer;">-</button>
                                <span style="padding: 8px 16px; font-weight: 500; min-width: 50px; text-align: center;">1</span>
                                <button style="padding: 8px; background: white; border: none; cursor: pointer;">+</button>
                            </div>
                        </div>

                        <button style="width: auto; background: #f97316; color: white; font-weight: bold; padding: 10px 20px; border-radius: 6px; border: none; cursor: pointer; font-size: 14px; display: inline-block;">
                            Sepete Ekle
                        </button>

                        <!-- MARKET FİYATLARI -->
                        <div style="margin-top: 24px; padding: 16px; background: #f8f9fa; border-radius: 8px;">
                            <h4 style="font-size: 16px; color: #333; margin-bottom: 12px; font-weight: 600;">Diğer Marketlerdeki Fiyatlar</h4>
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                <!-- BİM Fiyatı -->
                                <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: white; border-radius: 6px; border: 1px solid #e5e7eb;">
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iIzAwOEU0QyIvPgo8dGV4dCB4PSI1IiB5PSIyMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiPkLEsE08L3RleHQ+Cjwvc3ZnPgo=" style="width: 24px; height: 24px;" alt="BİM">
                                        <span style="font-weight: 500; color: #374151;">BİM</span>
                                    </div>
                                    <span style="font-weight: 600; color: #008E4C;">₺${product.prices.find(p => p.market.name === 'BİM')?.price || '3.50'}</span>
                                </div>
                                
                                <!-- A101 Fiyatı -->
                                <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: white; border-radius: 6px; border: 1px solid #e5e7eb;">
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iI0RDMjYyNiIvPgo8dGV4dCB4PSI0IiB5PSIyMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiPkExMDE8L3RleHQ+Cjwvc3ZnPgo=" style="width: 24px; height: 24px;" alt="A101">
                                        <span style="font-weight: 500; color: #374151;">A101</span>
                                    </div>
                                    <span style="font-weight: 600; color: #DC2626;">₺${product.prices.find(p => p.market.name === 'A101')?.price || '3.65'}</span>
                                </div>
                                
                                <!-- Migros Fiyatı -->
                                <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: white; border-radius: 6px; border: 1px solid #e5e7eb;">
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iI0Y5NzMxNiIvPgo8dGV4dCB4PSI0IiB5PSIxMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjgiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSI+bWlncm9zPC90ZXh0Pgo8L3N2Zz4K" style="width: 24px; height: 24px;" alt="Migros">
                                        <span style="font-weight: 500; color: #374151;">Migros</span>
                                    </div>
                                    <span style="font-weight: 600; color: #F97316;">₺${product.prices.find(p => p.market.name === 'Migros')?.price || '3.75'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- SAĞ TARAF: ÜRÜN AÇIKLAMASI VE DETAYLAR -->
                <div style="width: 400px; display: flex; flex-direction: column; gap: 24px;">
                    
                    <!-- Ürün Açıklaması -->
                    <div style="background: #f9fafb; padding: 16px; border-radius: 8px;">
                        <h3 style="font-weight: 600; color: #111; margin-bottom: 8px;">Ürün Açıklaması</h3>
                        <p style="color: #374151; font-size: 14px; line-height: 1.5;">
                            ${product.description || 'Özenle seçilmiş, kavrulmuş siyah ayçekirdeği. Doğal ve lezzetli atıştırmalık.'}
                        </p>
                    </div>

                    <!-- Ürün Bilgileri -->
                    <div style="background: #f9fafb; padding: 16px; border-radius: 8px;">
                        <h3 style="font-weight: 600; color: #111; margin-bottom: 12px;">Ürün Bilgileri</h3>
                        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 14px;">
                            <div style="display: flex; justify-content: space-between;">
                                <span style="color: #6b7280;">Marka:</span>
                                <span style="font-weight: 500; color: #111;">${product.brand}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span style="color: #6b7280;">Net Ağırlık:</span>
                                <span style="font-weight: 500; color: #111;">${product.unit}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span style="color: #6b7280;">Kategori:</span>
                                <span style="font-weight: 500; color: #111;">${product.category}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Uyarı Mesajı -->
                    <div style="background: #fef3cd; border: 1px solid #fbbf24; padding: 16px; border-radius: 8px;">
                        <p style="font-size: 14px; color: #92400e;">
                            Ürünün stok, fiyat ve kampanya bilgisi, teslimatı gerçekleştirecek mağazanın stok, fiyat ve kampanya bilgilerine göre belirlenmektedir.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Geri Dön Butonu -->
            <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                <a href="/products" style="display: flex; align-items: center; gap: 8px; color: #6b7280; text-decoration: none;">
                    ← <span>Ürünlere Geri Dön</span>
                </a>
            </div>
        </div>
    </body>
    </html>
  `);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Basit Market API ${PORT} portunda çalışıyor`);
});
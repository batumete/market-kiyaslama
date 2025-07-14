import React, { useState, useEffect } from 'react';

// Mock data for the application
const mockProducts = [
  { id: 1, name: 'Coca Cola 2.5L', brand: 'Coca Cola', barcode: '8690000000001', avgPrice: 48.50, stores: [
    { name: 'Migros', price: 49.90, distance: '0.5 km', discount: null },
    { name: 'CarrefourSA', price: 46.50, distance: '1.2 km', discount: '15%' },
    { name: 'A101', price: 44.95, distance: '0.8 km', discount: null },
    { name: 'ŞOK', price: 45.75, distance: '1.5 km', discount: '10%' }
  ]},
  { id: 2, name: 'Uno Deterjan 2kg', brand: 'Uno', barcode: '8690000000002', avgPrice: 78.90, stores: [
    { name: 'Migros', price: 79.90, distance: '0.5 km', discount: null },
    { name: 'CarrefourSA', price: 76.50, distance: '1.2 km', discount: '20%' },
    { name: 'A101', price: 74.95, distance: '0.8 km', discount: null }
  ]},
  { id: 3, name: 'Ülker Çikolata 60g', brand: 'Ülker', barcode: '8690000000003', avgPrice: 12.50, stores: [
    { name: 'Migros', price: 13.50, distance: '0.5 km', discount: null },
    { name: 'CarrefourSA', price: 11.50, distance: '1.2 km', discount: '15%' },
    { name: 'ŞOK', price: 10.95, distance: '1.5 km', discount: '20%' }
  ]}
];

const mockStores = [
  { id: 1, name: 'Migros M-5001', address: 'Atatürk Cad. No:45, Kadıköy', distance: '0.5 km', rating: 4.5 },
  { id: 2, name: 'CarrefourSA Acıbadem', address: 'Acıbadem Cad. No:123, Üsküdar', distance: '1.2 km', rating: 4.3 },
  { id: 3, name: 'A101 Moda', address: 'Moda Cad. No:67, Kadıköy', distance: '0.8 km', rating: 4.1 },
  { id: 4, name: 'ŞOK Market', address: 'Bağdat Cad. No:234, Maltepe', distance: '1.5 km', rating: 4.0 }
];

const testimonials = [
  {
    name: 'Ayşe K.',
    location: 'İstanbul',
    text: 'Alışveriş listemi oluşturup en ucuz marketi bulabiliyorum. Ayda en az 200 TL tasarruf ediyorum!',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/6331237/pexels-photo-6331237.jpeg'
  },
  {
    name: 'Mehmet T.',
    location: 'Ankara',
    text: 'Barkod okutup fiyat karşılaştırması yapmak çok pratik. Artık alışverişten önce mutlaka kontrol ediyorum.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/7534801/pexels-photo-7534801.jpeg'
  },
  {
    name: 'Zeynep S.',
    location: 'İzmir',
    text: 'Çevremdeki marketlerdeki indirimleri kaçırmıyorum. Uygulama sayesinde her zaman en iyi fırsatları buluyorum.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/29502353/pexels-photo-29502353.jpeg'
  }
];

// Header Component
export const Header = ({ onCartOpen, onProfileOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              FiyatKıyasla
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-purple-600 transition-colors">Özellikler</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors">Nasıl Kullanılır</a>
            <a href="#testimonials" className="text-gray-700 hover:text-purple-600 transition-colors">Kullanıcı Yorumları</a>
            <button 
              onClick={onProfileOpen}
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Profil
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={onCartOpen}
              className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0a1 1 0 102 0m9 0a1 1 0 102 0" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-3">
              <a href="#features" className="text-gray-700 hover:text-purple-600 transition-colors">Özellikler</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors">Nasıl Kullanılır</a>
              <a href="#testimonials" className="text-gray-700 hover:text-purple-600 transition-colors">Kullanıcı Yorumları</a>
              <button onClick={onProfileOpen} className="text-left text-gray-700 hover:text-purple-600 transition-colors">Profil</button>
              <button onClick={onCartOpen} className="text-left text-gray-700 hover:text-purple-600 transition-colors">Sepetim (3)</button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero Section Component
export const HeroSection = ({ onGetStarted }) => {
  return (
    <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">2.5 milyondan fazla</span>
                <span className="block">ürünü gerçek</span>
                <span className="block">mağazalarla</span>
                <span className="block text-yellow-300">karşılaştırın!</span>
              </h1>
              <p className="text-xl lg:text-2xl text-purple-100 leading-relaxed">
                Ürünlerin ortalama fiyatını öğrenin, yakın yazıl ve memunuiyetinizi markaya iletin.
              </p>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#" className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                </svg>
                App Store'dan İndir
              </a>
              <a href="#" className="inline-flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                Google Play'den İndir
              </a>
            </div>

            <p className="text-sm text-purple-200">
              1 milyondan fazla kişi indirdi
            </p>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative lg:pl-8">
            <div className="relative z-10">
              <img 
                src="https://images.pexels.com/photos/6214388/pexels-photo-6214388.jpeg" 
                alt="FiyatKıyasla App" 
                className="w-full max-w-md mx-auto lg:max-w-lg rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute top-10 right-10 bg-white/10 backdrop-blur-sm rounded-2xl p-4 transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <div className="text-2xl font-bold">₺48.50</div>
              <div className="text-sm text-purple-200">Ortalama Fiyat</div>
            </div>
            <div className="absolute bottom-20 left-4 bg-green-500/20 backdrop-blur-sm rounded-2xl p-4 transform -rotate-12 hover:rotate-0 transition-transform duration-300">
              <div className="text-lg font-bold text-green-300">%25 İndirim</div>
              <div className="text-sm text-green-200">CarrefourSA'da</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Section Component
export const FeaturesSection = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      ),
      title: 'Barkod & Sesli Arama',
      description: 'Ürünlerin barkodunu okutun veya sesli arama yaparak anında fiyat karşılaştırması yapın.',
      image: 'https://images.pexels.com/photos/7534801/pexels-photo-7534801.jpeg'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Harita Üzerinden Arama',
      description: 'Size en yakın marketleri harita üzerinde görün ve ürün fiyatlarını karşılaştırın.',
      image: 'https://images.unsplash.com/photo-1647033528556-c3c57178b72a'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0a1 1 0 102 0m9 0a1 1 0 102 0" />
        </svg>
      ),
      title: 'Akıllı Sepet Karşılaştırması',
      description: 'Alışveriş listenizin tamamını farklı marketlerde karşılaştırın, en ucuz marketi bulun.',
      image: 'https://images.unsplash.com/photo-1550041499-4c5857d2b508'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: 'Fiyat Uyarıları',
      description: 'İstediğiniz ürünlerin fiyat düştüğünde anında bildirim alın, fırsatları kaçırmayın.',
      image: 'https://images.pexels.com/photos/4744707/pexels-photo-4744707.jpeg'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      title: 'İndirim & Kampanya Takibi',
      description: 'Marketlerin güncel indirimlerini ve kampanyalarını takip edin, fırsatları yakalayın.',
      image: 'https://images.pexels.com/photos/31436044/pexels-photo-31436044.jpeg'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 0v1m-2 0V6a2 2 0 00-2 0v1m2 0V4.5a2 2 0 00-2 0v1.5m2 0h.01" />
        </svg>
      ),
      title: 'Puan Kazanma Sistemi',
      description: 'Görevleri tamamlayarak puan kazanın, hediye mağazasından ödüllerle değiştirin.',
      image: 'https://images.pexels.com/photos/29502353/pexels-photo-29502353.jpeg'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Özelliklerimiz
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Alışverişinizi daha akıllı, daha ekonomik hale getiren güçlü özellikler
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="relative mb-6 overflow-hidden rounded-xl">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Stats Section Component - REMOVED as per user request

// How It Works Section Component
export const HowItWorksSection = () => {
  const steps = [
    {
      step: '01',
      title: 'Ürün Ara',
      description: 'Barkod okutun, ürün adını yazın veya sesli arama yapın',
      icon: '🔍',
      image: 'https://images.pexels.com/photos/7534801/pexels-photo-7534801.jpeg'
    },
    {
      step: '02', 
      title: 'Fiyatları Karşılaştır',
      description: 'Çevrenizdeki marketlerdeki fiyatları anında görün',
      icon: '⚖️',
      image: 'https://images.pexels.com/photos/4744707/pexels-photo-4744707.jpeg'
    },
    {
      step: '03',
      title: 'En İyi Fırsatı Bul',
      description: 'En uygun fiyatı ve en yakın marketi keşfedin',
      icon: '🎯',
      image: 'https://images.pexels.com/photos/31436044/pexels-photo-31436044.jpeg'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Nasıl Çalışır?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            3 basit adımda akıllı alışverişe başlayın
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-24 left-full w-full h-1 bg-gradient-to-r from-purple-300 to-purple-500 z-0 transform translate-x-4"></div>
              )}
              
              <div className="relative z-10 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                    {step.step}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section Component
export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Kullanıcılarımız Ne Diyor?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Binlerce memnun kullanıcımızın deneyimleri
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.location}</p>
                  <div className="flex mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Download Section Component - REMOVED as per user request

// Footer Component
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              FiyatKıyasla
            </div>
            <p className="text-gray-400">
              Akıllı alışveriş uygulaması ile her alışverişte tasarruf edin.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.739.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Özellikler</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Fiyat Karşılaştırma</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Barkod Tarama</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Sesli Arama</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Harita Görünümü</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Destek</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Yardım Merkezi</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">İletişim</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Geri Bildirim</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Sorun Bildirin</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Şirket</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Hakkımızda</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Gizlilik Politikası</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Kullanım Şartları</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 FiyatKıyasla. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

// Product Search Modal Component
export const ProductSearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.length > 2) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const results = mockProducts.filter(product => 
          product.name.toLowerCase().includes(term.toLowerCase()) ||
          product.brand.toLowerCase().includes(term.toLowerCase())
        );
        setSearchResults(results);
        setIsLoading(false);
      }, 800);
    } else {
      setSearchResults([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Ürün Ara</h2>
            <button 
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Ürün adı veya marka yazın..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors">
              📷 Barkod Tara
            </button>
            <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors">
              🎤 Sesli Ara
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <span className="ml-2 text-gray-600">Aranıyor...</span>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map(product => (
                <div key={product.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{product.name}</h3>
                      <p className="text-gray-600">{product.brand}</p>
                      <p className="text-sm text-gray-500">Barkod: {product.barcode}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">₺{product.avgPrice}</div>
                      <div className="text-sm text-gray-500">Ortalama Fiyat</div>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {product.stores.slice(0, 4).map((store, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{store.name}</span>
                          <span className="text-sm font-bold text-green-600">₺{store.price}</span>
                        </div>
                        <div className="text-xs text-gray-500">{store.distance}</div>
                        {store.discount && (
                          <span className="inline-block bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full mt-1">
                            {store.discount} İndirim
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : searchTerm.length > 2 ? (
            <div className="text-center py-8 text-gray-500">
              Aradığınız ürün bulunamadı.
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Ürün aramak için en az 3 karakter yazın.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Shopping Cart Modal Component
export const ShoppingCartModal = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([
    { id: 1, product: mockProducts[0], quantity: 2 },
    { id: 2, product: mockProducts[1], quantity: 1 },
    { id: 3, product: mockProducts[2], quantity: 3 }
  ]);

  const [selectedStore, setSelectedStore] = useState('CarrefourSA');

  const calculateTotal = (store) => {
    return cartItems.reduce((total, item) => {
      const storePrice = item.product.stores.find(s => s.name === store)?.price || item.product.avgPrice;
      return total + (storePrice * item.quantity);
    }, 0);
  };

  const stores = ['Migros', 'CarrefourSA', 'A101', 'ŞOK'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Sepetim ({cartItems.length} ürün)</h2>
            <button 
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex h-full">
          {/* Cart Items */}
          <div className="flex-1 p-6 overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">Sepetinizdeki Ürünler</h3>
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{item.product.name}</h4>
                      <p className="text-gray-600">{item.product.brand}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                      <button className="bg-purple-100 hover:bg-purple-200 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Store Comparison */}
          <div className="w-80 bg-gray-50 p-6 border-l border-gray-200 overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">Market Karşılaştırması</h3>
            <div className="space-y-3">
              {stores.map(store => (
                <div 
                  key={store} 
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedStore === store 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedStore(store)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">{store}</h4>
                      <p className="text-sm text-gray-600">Toplam</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-purple-600">
                        ₺{calculateTotal(store).toFixed(2)}
                      </div>
                      {store === 'CarrefourSA' && (
                        <span className="inline-block bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                          En Ucuz
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">Tasarruf Özeti</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>En Pahalı (Migros):</span>
                  <span>₺{calculateTotal('Migros').toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>En Ucuz (CarrefourSA):</span>
                  <span className="text-green-600">₺{calculateTotal('CarrefourSA').toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-green-600">
                  <span>Tasarruf:</span>
                  <span>₺{(calculateTotal('Migros') - calculateTotal('CarrefourSA')).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-xl font-bold hover:from-purple-700 hover:to-purple-800 transition-all">
              {selectedStore}'da Alışverişe Git
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Store Locator Modal Component
export const StoreLocatorModal = ({ isOpen, onClose }) => {
  const [selectedStore, setSelectedStore] = useState(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Yakınımdaki Marketler</h2>
            <button 
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex h-96">
          {/* Map Area */}
          <div className="flex-1 relative bg-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-lg font-medium">İnteraktif Harita</p>
                <p className="text-sm">Gerçek uygulamada buraya harita entegrasyonu gelecek</p>
              </div>
            </div>
            
            {/* Mock Map Points */}
            <div className="absolute top-16 left-20 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg cursor-pointer transform hover:scale-125 transition-transform" onClick={() => setSelectedStore(mockStores[0])}></div>
            <div className="absolute top-32 right-24 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg cursor-pointer transform hover:scale-125 transition-transform" onClick={() => setSelectedStore(mockStores[1])}></div>
            <div className="absolute bottom-24 left-32 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg cursor-pointer transform hover:scale-125 transition-transform" onClick={() => setSelectedStore(mockStores[2])}></div>
            <div className="absolute bottom-16 right-20 w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-lg cursor-pointer transform hover:scale-125 transition-transform" onClick={() => setSelectedStore(mockStores[3])}></div>
          </div>

          {/* Store List */}
          <div className="w-80 bg-gray-50 p-6 overflow-y-auto">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Konum ara..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <h3 className="font-bold text-gray-900 mb-4">Yakınımdaki Marketler</h3>
            <div className="space-y-3">
              {mockStores.map(store => (
                <div 
                  key={store.id} 
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    selectedStore?.id === store.id 
                      ? 'bg-purple-100 border-2 border-purple-300' 
                      : 'bg-white border border-gray-200 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedStore(store)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{store.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{store.address}</p>
                      <div className="flex items-center mt-2">
                        <div className="flex text-yellow-400">
                          {[...Array(Math.floor(store.rating))].map((_, i) => (
                            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-1">({store.rating})</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-purple-600">{store.distance}</div>
                      <button className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full mt-1 hover:bg-purple-200 transition-colors">
                        Yol Tarifi
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedStore && (
              <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">{selectedStore.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{selectedStore.address}</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                    📞 Ara
                  </button>
                  <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                    🗺️ Yol Tarifi
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { 
  Header, 
  HeroSection, 
  FeaturesSection, 
  StatsSection, 
  HowItWorksSection, 
  TestimonialsSection, 
  DownloadSection, 
  Footer,
  ProductSearchModal,
  ShoppingCartModal,
  StoreLocatorModal
} from './components';

function App() {
  const [isProductSearchOpen, setIsProductSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false);

  return (
    <div className="App min-h-screen bg-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Header 
                onProductSearch={() => setIsProductSearchOpen(true)}
                onCartOpen={() => setIsCartOpen(true)}
                onStoreLocator={() => setIsStoreLocatorOpen(true)}
              />
              <HeroSection onGetStarted={() => setIsProductSearchOpen(true)} />
              <FeaturesSection />
              <StatsSection />
              <HowItWorksSection />
              <TestimonialsSection />
              <DownloadSection />
              <Footer />
              
              {/* Modals */}
              <ProductSearchModal 
                isOpen={isProductSearchOpen} 
                onClose={() => setIsProductSearchOpen(false)} 
              />
              <ShoppingCartModal 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
              />
              <StoreLocatorModal 
                isOpen={isStoreLocatorOpen} 
                onClose={() => setIsStoreLocatorOpen(false)} 
              />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { 
  Header, 
  HeroSection, 
  FeaturesSection, 
  HowItWorksSection, 
  TestimonialsSection, 
  Footer,
  ProductSearchModal,
  ShoppingCartModal,
  ProfileModal
} from './components';

function App() {
  const [isProductSearchOpen, setIsProductSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="App min-h-screen bg-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Header 
                onCartOpen={() => setIsCartOpen(true)}
                onProfileOpen={() => setIsProfileOpen(true)}
              />
              <HeroSection onGetStarted={() => setIsProductSearchOpen(true)} />
              <FeaturesSection />
              <HowItWorksSection />
              <TestimonialsSection />
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
              <ProfileModal 
                isOpen={isProfileOpen} 
                onClose={() => setIsProfileOpen(false)} 
              />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
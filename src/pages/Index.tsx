
import React from 'react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import CustomerForm from '../components/CustomerForm';
import MenuPage from '../components/MenuPage';
import CartPage from '../components/CartPage';
import PaymentPage from '../components/PaymentPage';
import useStore from '../store/useStore';

const Index = () => {
  const { currentPage } = useStore();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <CustomerForm />;
      case 'menu':
        return (
          <>
            <Header />
            <MenuPage />
            <BottomNavigation />
          </>
        );
      case 'cart':
        return (
          <>
            <Header />
            <CartPage />
            <BottomNavigation />
          </>
        );
      case 'payment':
        return (
          <>
            <Header />
            <PaymentPage />
            <BottomNavigation />
          </>
        );
      default:
        return <CustomerForm />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentPage()}
    </div>
  );
};

export default Index;

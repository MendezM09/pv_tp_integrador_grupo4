import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FavoriteProducts from './View/FavoriteProducts';
import ProductDetail from './View/ProductDetail';
import Navbar from './Components/NavBar';
import ProductCard from './View/ProductCard';
import Footer from './Components/Footer';


function App() {
    return (
        <Router>
            <Navbar></Navbar>
                <div className="min-h-screen bg-gray-100 font-sans text-gray-900 antialiased">
                    <Routes>
                        <Route path="/" element={<ProductCard></ProductCard>} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/favorites" element={<FavoriteProducts />} />
                    </Routes>
                </div>
                <Footer></Footer>
        </Router>
    );
}

export default App;
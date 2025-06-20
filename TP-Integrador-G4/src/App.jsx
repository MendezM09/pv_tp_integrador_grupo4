import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux'; 
import FavoriteProducts from './View/FavoriteProducts';
import ProductDetail from './View/ProductDetail';
import Navbar from './Components/NavBar';
import ProductCard from './View/ProductCard';
import Footer from './Components/Footer'; 
import ProductForm from './View/ProducForm'; 
import { fetchProducts, createProduct } from './store/productsSlice'; 
function EditProductFormWrapper() {
  const { id } = useParams(); 
  const products = useSelector(state => state.products.entities); 

  const productToEdit = products.find(p => p.id === parseInt(id));


  if (!productToEdit) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <p>Cargando producto para editar... o el producto no fue encontrado.</p>
        <p>Asegúrate de que los productos se hayan cargado antes de intentar editar.</p>
      </div>
    );
  }

  return <ProductForm initialProduct={productToEdit} />;
}
function App() {
    const dispatch = useDispatch();

    const productsStatus = useSelector(state => state.products.status);
    const productsError = useSelector(state => state.products.error);

    useEffect(() => {
        if (productsStatus === 'idle') {
            dispatch(fetchProducts());
        }
    }, [productsStatus, dispatch]);

    return (
        <Router>
            <Navbar />
            <div className="min-h-screen bg-gray-100 font-sans text-gray-900 antialiased">
                <Routes>
                    <Route path="/" element={<ProductCard />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/favorites" element={<FavoriteProducts />} />
                    <Route path="/agregarProducto" element={<ProductForm />}/>
                    <Route path="/editar-producto/:id" element={<EditProductFormWrapper />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
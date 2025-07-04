import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { useSelector} from 'react-redux';
import FavoriteProducts from './View/FavoriteProducts';
import ProductDetail from './View/ProductDetail';
import ProductForm from './View/ProducForm';
import PublicRoute from './hooks/PublicRoute';
import PrivateRoute from './hooks/PrivateRoute';
import RegisterForm from './pages/RegisterForm';
import Login from './pages/LoginForm';
import Home from "./Components/Home";
import ProductCard from "./View/ProductCard";



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
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 font-sans text-gray-900 antialiased">
        <Routes>
          <Route path="/" exact element={<PublicRoute component={Login}></PublicRoute>} />
          <Route path="/registro" exact element={<PublicRoute component={RegisterForm}></PublicRoute>} />
          <Route element={<PrivateRoute component={Home} />}>
            <Route path="/home" element={<ProductCard />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/favorites" element={<FavoriteProducts />} />
            <Route path="/agregarProducto" element={<ProductForm />} />
            <Route path="/editar-producto/:id" element={<EditProductFormWrapper />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
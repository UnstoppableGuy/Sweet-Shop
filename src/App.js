import './scss/app.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from './Components/Layout';
import { Home } from './Pages/Home';
import { Cart } from './Pages/Cart';
import { ProductDetails } from './Pages/ProductDetails';
import { SignIn } from './Pages/SignIn';
import { Register } from './Pages/Register';
import { NotFound404 } from './Pages/NotFound404';
import { store } from './redux/store'
import { Provider, useSelector } from 'react-redux'
import { useState } from 'react';
import { ModalWindow } from './Components/ModalWindow';
import { selectStatus } from './redux/slices/authSlice';
import { UpdateUser } from './Components/UpdateUser';
import { Profile } from './Pages/Profile';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './redux/store';
import { ResponseWindow } from './Components/ResponseWindow';
import { AuthModalWindow } from './Components/AuthModalWindow';
import { AddProduct } from './Components/AddProduct';
import { UpdateProduct } from './Components/UpdateProduct';
import { AddCategory } from './Components/Admin/AddCategory';
import { AddTag } from './Components/Admin/AddTag';
import { OrderDetails } from './Components/OrderDetails';

function App() {

  const [isModalWindow, setmodalWindow] = useState(true);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />} >
              <Route index element={<Home />} />
              <Route path="/mdwindow" element={<ModalWindow />} />
              <Route path="cart" element={<Cart />} />
              <Route path="profile/order/details" element={<OrderDetails />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="profile/" element={<Profile />} />
              <Route path="sign-in" element={
                <AuthModalWindow setActive={setmodalWindow}>
                  <SignIn />
                </AuthModalWindow>
              } />
              <Route path="register" element={
                <AuthModalWindow setActive={setmodalWindow}>
                  <Register />
                </AuthModalWindow>
              } />
              <Route path="profile/feedback/response" element={
                <AuthModalWindow setActive={setmodalWindow}>
                  <ResponseWindow />
                </AuthModalWindow>
              } />

              <Route path="profile/product/add" element={
                <AuthModalWindow setActive={setmodalWindow}>
                  <AddProduct />
                </AuthModalWindow>
              } />

              <Route path="profile/product/update" element={
                <AuthModalWindow setActive={setmodalWindow}>
                  <UpdateProduct />
                </AuthModalWindow>
              } />

              <Route path="profile/category/add" element={
                <AuthModalWindow setActive={setmodalWindow}>
                  <AddCategory />
                </AuthModalWindow>
              } />

              <Route path="profile/tag/add" element={
                <AuthModalWindow setActive={setmodalWindow}>
                  <AddTag />
                </AuthModalWindow>
              } />

              <Route path="*" element={<NotFound404 />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;

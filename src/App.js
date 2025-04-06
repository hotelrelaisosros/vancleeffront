import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import RingsProductListPage from "./pages/RingsProductListPage/RingsProductListPage";

import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Contactus from "./pages/Contactus/Contactus";
import FindStore from "./pages/FindStore/FindStore";
import OrderDetails from "./pages/Order/OrderDetails";
import OrderHistory from "./pages/Order/OrderHistory";
import WishList from "./pages/Wishlist/WishList";

import ProductDetails from "./pages/Products/ProductDetails";
import ProductsList from "./pages/Products/ProductsList";

import Rings2ProductsDetails from "./pages/Rings2ProductsPage/ProductDetails";
import Rings2ProductsList from "./pages/Rings2ProductsPage/ProductsList";

import './App.css';
import CheckoutLayout from "./layouts/CheckoutLayout";
import NavbarLayout from "./layouts/NavbarLayout";
import PageNotFound from "./pages/404/PageNotFound";
import AddressList from "./pages/Address/AddressList";
import PrivacyPolicy from "./pages/static/PrivacyPolicy";

function App() {

	const token = localStorage.getItem('token');
	
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					
					{/* Checkout pages */}
					<Route path="/cart" element={<CheckoutLayout><Cart /></CheckoutLayout>} />
					<Route path="/checkout" element={ 
						<CheckoutLayout>
							<Checkout />
						</CheckoutLayout> } 
					/>

					{/* My Account pages */}
					<Route path="/my-account" element={<CheckoutLayout><OrderHistory /></CheckoutLayout>} />
					<Route path="/order/history" element={<CheckoutLayout><OrderHistory /></CheckoutLayout>} />
					<Route path="/order/history/:orderID" element={<CheckoutLayout><OrderDetails /></CheckoutLayout>} />
					<Route path="/address" element={<CheckoutLayout><AddressList /></CheckoutLayout>} />
					<Route path="/wishlist" element={<CheckoutLayout><WishList /></CheckoutLayout>} />


					{/* Public pages */}
					<Route path="/" element={<NavbarLayout><Home /></NavbarLayout>} />
					<Route path="*" element={<CheckoutLayout><PageNotFound /></CheckoutLayout>} />
					<Route path="/rings" element={<CheckoutLayout><RingsProductListPage /></CheckoutLayout>} />
					
					<Route path="/products/ring-two" element={<CheckoutLayout><Rings2ProductsList /></CheckoutLayout>} />
					<Route path="/products/ring-two/:variantID" element={<CheckoutLayout><Rings2ProductsDetails /></CheckoutLayout>} />

					<Route path="/products/category/:categoryID" element={<CheckoutLayout><ProductsList /></CheckoutLayout>} />
					<Route path="/products/:productID" element={<CheckoutLayout><ProductDetails /></CheckoutLayout>} />
					<Route path="/findstore" element={<CheckoutLayout><FindStore /></CheckoutLayout>} />
					<Route path="/contact-us" element={<NavbarLayout><Contactus /></NavbarLayout>} />
					<Route path="/privacy-policy" element={<CheckoutLayout><PrivacyPolicy /></CheckoutLayout>} />

					{/* Not in use pages */}
					{/* <Route path="/booking" element={<NavbarLayout><Booking /></NavbarLayout>} /> */}
					{/* <Route path="/payment" element={<NavbarLayout><Payment /></NavbarLayout>} /> */}
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;

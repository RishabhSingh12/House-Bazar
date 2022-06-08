import React from "react";
import HomePage from "./pages/HomePage";
import Offers from "./pages/Offers";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import Category from "./pages/Category";
import CreateListings from "./pages/CreateListings";
import Listing from "./pages/Listing";
import Contact from "./pages/Contact";
import EditListing from "./pages/EditListing";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer pauseOnHover={false} autoClose={3000} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/editlisting/:listingId" element={<EditListing />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/category/:categoryName/:listingId"
          element={<Listing />}
        />
        <Route path="/create-listing" element={<CreateListings />} />
        <Route path="/contact/:landlordId" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

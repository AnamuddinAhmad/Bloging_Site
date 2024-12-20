import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import {Outlet} from "react-router-dom";
import { login, logout } from "./app/authSlice";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) =>
        console.log("Error occured during login :: useEffect", error)
      )
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          {/* TODO: */}
          <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;

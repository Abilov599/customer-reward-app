import React from "react";
import { Route, Routes } from "react-router-dom";
import SiteRoot from "./pages/root";
import SignUp from "./pages/signup";
import SignIn from "./pages/login";
import Home from "./pages/home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="register" element={<SignUp />} />
        <Route path="/products" element={<SiteRoot />}>
          <Route index path="/products" element={<Home />} />
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;

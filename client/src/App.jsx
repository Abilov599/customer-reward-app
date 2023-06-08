import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup";
import SignIn from "./pages/login";
import Home from "./pages/home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SiteRoot />}>
          <Route index path="register" element={<SignUp />} />
          <Route element={<Home />} />
          <Route path="login" element={<SignIn />} />
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;

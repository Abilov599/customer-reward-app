import React from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SiteRoot />}>
          <Route index element={<Home />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/admin" element={<AdminRoot />}>
          <Route index element={<AdminHome />} />
          <Route path="all-users" element={<AllUsers />} />
          <Route path="bookings" element={<BookingsAdmin />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

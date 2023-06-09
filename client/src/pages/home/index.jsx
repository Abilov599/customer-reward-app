import React from "react";
import { useAtom } from "jotai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userData } from "../../atoms.js";

const Home = () => {
  const [user, setUser] = useAtom(userData);
  const navigate = useNavigate();
  const logout = async () => {
    let res = await axios.get("http://localhost:8080/logout", {
      withCredentials: true,
    });
    if (res.data.message === "SUCCESS") {
      setUser(null);
      navigate("/");
    }
  };
  return (
    <main>
      <section>
        <div className="container">
          {user.username}
          <button onClick={() => logout()}>log out</button>
        </div>
      </section>
    </main>
  );
};

export default Home;

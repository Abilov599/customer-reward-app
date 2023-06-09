import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userData } from "../../atoms.js";
import "./index.scss";

const Home = () => {
  const [user, setUser] = useAtom(userData);
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
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

  async function getAllProducts() {
    try {
      let res = await axios("http://localhost:8080/products");
      setProducts(res.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(true);
      throw error;
    }
  }

  async function buyPhone(id, price) {
    try {
      let res = await axios.post("http://localhost:8080/purchase", {
        productId: id,
        price,
        userId: user._id,
      });
      window.location.reload();
    } catch (error) {}
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <main>
      <section>
        <div className="container">
          <div>Username: {user.username}</div>
          <div>Total points: {user.points}</div>
          <button onClick={() => logout()}>log out</button>
        </div>
      </section>
      <section className="products">
        <div className="container">
          <div className="row">
            {isLoading
              ? "LOADING..."
              : !error
              ? products.map((prod) => {
                  return (
                    <div className="card" key={prod._id}>
                      <div>
                        <img width="250px" src={prod.image} alt="" />
                      </div>
                      <div>{prod.productName}</div>
                      <div>{prod.price} $</div>
                      <button onClick={() => buyPhone(prod._id, prod.price)}>
                        Buy
                      </button>
                    </div>
                  );
                })
              : "error"}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

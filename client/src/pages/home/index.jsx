import React from "react";
import { useAtom } from "jotai";
import { userData } from "../../atoms.js";

const Home = () => {
  const [user, setUser] = useAtom(userData);
  return (
    <main>
      <section>
        <div className="container">{user.username}</div>
      </section>
    </main>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useSetAtom } from "jotai";
import { userData } from "../atoms";

const SiteRoot = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const setData = useSetAtom(userData);
  async function auth() {
    try {
      let res = await axios("http://localhost:8080/user", {
        withCredentials: true,
      });
      setData(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      throw error;
    }
  }
  useEffect(() => {
    auth();
  }, []);

  if (loading) {
    return (
      <React.Fragment>
        <div>Loading...</div>
      </React.Fragment>
    );
  } else if (!error) {
    return (
      <React.Fragment>
        <Outlet />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div>unauthenticated</div>
      </React.Fragment>
    );
  }
};

export default SiteRoot;

// Example useAuth.js
import { useEffect, useState } from "react";
import axios from "axios";
import { buildBackendUrl } from "../utils/apiConfig";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(buildBackendUrl("/user/checklogin"), { withCredentials: true })
      .then((res) => {
        setUser(res.data?.message || null);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
};

export default useAuth;

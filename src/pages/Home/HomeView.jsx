import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const {user} = useUser();
  
  useEffect(() => {
    if (!user) {
      return navigate('/auth/login');
    } else {
      return navigate('/dashboard');
    }
  }, [navigate, user]);

};

export default Home;

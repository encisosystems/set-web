import { useEffect, useState } from "react";
import { fecthAbout } from "../../data/about/fecthabout";

export const useAbout = () => {

  const [showFrontend, setShowFrontend] = useState(false);
  const [showBackend, setShowBackend] = useState(false);
  const [usersBackend, setUsersBackend] = useState([]); 
  const [usersFrontend, setUsersFrontend] = useState([]);

  const toggleFrontend = () => {
    setShowFrontend(!showFrontend);
  };

  const toggleBackend = () => {
    setShowBackend(!showBackend);
  };

  const getUserCredis = () => {
    const userFetch = fecthAbout();
    const userBackend = userFetch.filter(user => user.enviroment === "backend");
    const userFrontend = userFetch.filter(user => user.enviroment === "frontend");
    setUsersBackend(userBackend);
    setUsersFrontend(userFrontend); 
  }

  useEffect(() => {
    getUserCredis();
  }, []); 

  return {
    showFrontend,
    showBackend,
    usersBackend,
    usersFrontend,
    toggleBackend,
    toggleFrontend,
  }
}

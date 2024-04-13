import React, { useEffect, useState } from "react";
import { fecthAbout } from "../../data/about/fecthabout";

export const useAbout = () => {

  const [showFrontend, setShowFrontend] = useState(false);
  const [showBackend, setShowBackend] = useState(false);
  const [usersBackend, setUsersBackend] = useState();
  const [usersFrontend, setUsersFrondtend] = useState();

  const toggleFrontend = () => {
    setShowFrontend(!showFrontend);
  };

  const toggleBackend = () => {
    setShowBackend(!showBackend);
  };


  const getUserCredis = () => {
    const userFetch = fecthAbout()
    const userBackend = userFetch.filter(user => user.enviroment == "backend");
    const userFronted = userFetch.filter(user => user.enviroment == "frontend");
    setUsersBackend(userBackend)
    setUsersFrondtend(userFronted)
  }

  useEffect(() => {
    getUserCredis();
  },[])

  return {
    showFrontend,
    showBackend,
    usersBackend,
    usersFrontend,
    toggleBackend,
    toggleFrontend,
  }
}
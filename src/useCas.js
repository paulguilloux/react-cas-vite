import { useContext, useEffect, useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import CasClient, { constant } from "react-cas-client";
import { CasUserContext } from "./context/casUserContext";

const useCas = (attempLoginWithGateway = false) => {
  const navigate = useNavigate();

  const casUserContext = useContext(CasUserContext);
  const [isLoading, setIsLoading] = useState(false);

  const casClient = new CasClient(import.meta.env.VITE_CAS_ENDPOINT, {
    version: constant.CAS_VERSION_3_0,
  });

  useEffect(() => {
    if (!casUserContext.user) {
      (async function () {
        try {
          await attemptCasLogin(attempLoginWithGateway);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, []);

  function attemptCasLogin(gateway) {
    return new Promise((resolve, reject) => {
      casClient
        .auth(gateway)
        .then((successRes) => {
          // Login user in state / locationStorage ()
          // eg. loginUser(response.user);
          casUserContext.setUser(successRes.user);
          // Update current path to trim any extra params in url
          // eg. this.props.history.replace(response.currentPath);
          setIsLoading(false);
          navigate(successRes.currentPath, {
            replace,
          });
        })
        .catch((errorRes) => {
          setIsLoading(false);
          navigate(errorRes.currentPath, {
            replace,
          });
          reject(errorRes);
        });
    });
  }

  function logout(path = "/") {
    casClient.logout("/");
  }

  return { isLoading, attemptCasLogin, logout };
};

export default useCas;

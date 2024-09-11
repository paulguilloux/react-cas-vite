import React, { useContext } from "react";
import useCas from "../useCas";
import { CasUserContext } from "../context/casUserContext";

const SecureHome = () => {
  const cas = useCas();
  const casUserContext = useContext(CasUserContext);

  console.log(casUserContext);

  if (!casUserContext.user)
    return (
      <div>
        <h2>Unauthorized</h2>
        <p>You aren't allowed to access this page.</p>
      </div>
    );

  return (
    <div>
      You are now logged in!
      <pre>{casUserContext.user || "user"}</pre>
    </div>
  );
};

export default SecureHome;

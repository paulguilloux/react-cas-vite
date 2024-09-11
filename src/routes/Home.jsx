import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useCas from "../useCas";
import { CasUserContext } from "../context/casUserContext";

const Home = () => {
  const cas = useCas();
  const casUserContext = useContext(CasUserContext);

  return (
    <>
      <div className="card">
        {casUserContext.user ? (
          <>
            <p>✅ You are logged in !</p>
          </>
        ) : (
          <>
            <p>You aren't logged in yet</p>
            <button onClick={() => cas.attemptCasLogin(false)}>Log in</button>
          </>
        )}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/secure">Go to protected page</Link>
      </div>
    </>
  );
};

export default Home;

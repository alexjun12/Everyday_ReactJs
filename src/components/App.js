import AppRouter from "components/Router";
import { useEffect, useState } from "react"; 
import { authService } from "fbase";

import "style.css";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientId, setClientId] = useState(null);
  const [fId, setFId] = useState([]);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        setClientId(user.email);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[]);
  return (
  <>
    {init ? <AppRouter isLoggedIn ={isLoggedIn} clientId = {clientId} fId = {fId} setFId = {setFId} /> : "Initializing..."}
  </>
  );
}

export default App;

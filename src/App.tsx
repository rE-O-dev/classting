import { useContext, useLayoutEffect } from 'react';

import { Context } from './context';

import RouterSwitch from './route';

import './App.css';

function App() {
  const { action } = useContext(Context);

  useLayoutEffect(() => {
    const user = localStorage.getItem("user");
    console.log(user);
    if(user) {
      action.setUser(user);
    }
  }, [])
  
  return (
      <RouterSwitch />
  );
}

export default App;

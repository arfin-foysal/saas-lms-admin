import '../src/assets/styles/_main.scss'
import { useState, useEffect } from 'react'
import { getRoute } from './Route';
import { publicRoute } from './Route/publicRoute'
import Router from './Route/Router'
import colorHandler from './utils/Theme';

const App = () => { 
  //theme color handler FROM utils/Theme.js
  colorHandler(
    "#0675F8",
    "#ffff",
    "#363636",
    "black",
    "white",
    "white",
    "#eff6fd",
  
  )

  const [allRoute, setAllRoute] = useState([...publicRoute])
  useEffect(() => {
    const route = getRoute();
    setAllRoute([...allRoute, route])
  }, [])
  return <Router allRoute={allRoute} />


}

export default App
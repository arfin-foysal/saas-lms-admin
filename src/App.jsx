import '../src/assets/styles/_main.scss'
import { useState, useEffect } from 'react'
import { getRoute } from './Route';
import { publicRoute } from './Route/publicRoute'
import Router from './Route/Router'


const App = () => {

  const [allRoute, setAllRoute] = useState([...publicRoute])
  useEffect(() => {
    const route = getRoute();
    setAllRoute([...allRoute, route])
  }, [])
  return <Router allRoute={allRoute} />


}

export default App
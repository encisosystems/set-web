import EstimationTool from "./pages/view/home";
import './App.css';
import {useEffect} from 'react';
import ReactGA from 'react-ga4';

function App() {
  
  useEffect(() => {
    ReactGA.initialize('G-GJZR0LQFJR');
  }, []);
  
  return (
    <>
      <EstimationTool />
      

    </>
  );
}

export default App;

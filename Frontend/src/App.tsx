import { useState } from "react";
import Button from "./components/Button";
import Forms from "./components/Forms";
import Table from "./components/Table";
import CloseButton from "./components/CloseButton"


function App() {
  const [tableVisible, setTableVisibility] = useState(false);

  return (
    <>
      <div>
        <h1>Weather App</h1> 
        <h2>O melhor app de previsão de tempo do IFPI!</h2>
      </div>
      <br></br>
      <div className="container">
        <div className="row justify-content-center gy-3">
          <div className="col-3 text-left">
            <Forms/>
            <Button onClick={() => setTableVisibility(true)}>Confirmar</Button>
          </div>
          {tableVisible && (
          <div className="row justify-content-center gy-3">  
            <div className="col-10 text-center">
              <Table/>
            </div>
            <div className="col-1">
              <CloseButton onClick={() => setTableVisibility(false)}/>
            </div>
          </div>)}
        </div>  
      </div>
    </>
  );
}

export default App;
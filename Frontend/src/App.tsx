import { useState } from "react";
import Button from "./components/Button";
import Forms from "./components/Forms";
import Table from "./components/Table";


function App() {
  let [tableVisible, setTableVisibility] = useState(false);

  return (
    <>
      <div>
        <h1>Weather App</h1> 
        <h2>O melhor app de previsão de tempo do IFPI!</h2>
      </div>
      <br></br>
      <div className="container text-left">
        <div className="column justify-content-center gap-10">
          <div className="col col-3 gap-1">
            <Forms/>
            <Button onClick={() => setTableVisibility(true)}>Confirmar</Button>
          </div>
          {tableVisible && (
        
          <div className="col-10">
            <Table></Table>
          </div>)}
        </div>  
      </div>
    </>
  );
}

export default App;
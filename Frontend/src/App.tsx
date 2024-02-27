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
      <div>
        <Forms/>
        <Button onClick={() => setTableVisibility(true)}>Confirmar</Button>
      </div>
      {tableVisible && (
        <div>
          <Table></Table>
        </div>)}
    </>
  );
}

export default App;
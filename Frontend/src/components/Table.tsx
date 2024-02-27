function Table() {
    return(
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Dia</th>
                    <th scope="col">Máx (°C)</th>
                    <th scope="col">Min (°C)</th>
                    <th scope="col">Nebulosidade (%)</th>
                    <th scope="col">Probabilidade de Chuva (%)</th>
                    <th scope="col">Chuva (mm)</th>
                    <th scope="col">Velocidade do vento</th>
                    <th scope="col">Descrição</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Hoje</th>
                    <td>26</td>
                    <td>22</td>
                    <td>100</td>
                    <td>100</td>
                    <td>16.01</td>
                    <td>2.93 km/h</td>
                    <td>Chuva</td>
                </tr>
                <tr>
                <th scope="row">Amanhã</th>
                    <td>26</td>
                    <td>22</td>
                    <td>100</td>
                    <td>100</td>
                    <td>16.01</td>
                    <td>2.93 km/h</td>
                    <td>Chuva</td>
                </tr>
                <tr>
                <th scope="row">Depois de amanhã</th>
                    <td>26</td>
                    <td>22</td>
                    <td>100</td>
                    <td>100</td>
                    <td>16.01</td>
                    <td>2.93 km/h</td>
                    <td>Chuva</td>
                </tr>
            </tbody>
        </table>
    );
}


export default Table;
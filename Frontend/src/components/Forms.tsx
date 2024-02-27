import Button from "./Button";


function Forms() {
    return (
        <>
            <form>
                <legend>Digite suas coordenadas</legend>
                <div className="mb-3">
                    <label htmlFor="latitude" className="form-label">Latitude</label>
                    <input type="geographic-coordinate" className="form-control" id="latitude"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="longitude" className="form-label">Logitude</label>
                    <input type="geographic-coordinate" className="form-control" id="longitude"/>
                </div>
            </form>
            
        </>
    );
}


export default Forms;
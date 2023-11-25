import { Link } from "react-router-dom";
import './create.styles.css'

function Create() {
    return (
      <div className="create-page">
        <h1>Estas en la Create</h1>
        <div className="botones-create">
        <Link to="/home">
            <button className="boton-generico">Retornar</button>
        </Link>
        </div>
      </div>
    );
  }
  
  export default Create;
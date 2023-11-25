import { Link } from "react-router-dom";
import "./detail.styles.css"

function Detail() {
    return (
      <div className="detail-page">
        <h1>Estas en el Detail</h1>
        <div className="botones-details">
        <Link to="/home">
            <button className="boton-generico">Retornar</button>
        </Link>
        </div>
      </div>
    );
  }
  
  export default Detail;
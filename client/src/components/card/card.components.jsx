import { Link } from 'react-router-dom'
import './card.styles.css'

function Card({dog}) {

  const {id, name, life_span, temperament} = dog


  return (
  
      <div className='card-container'>
        <Link to = {`/home/${id}`}>
        <h2>{name}</h2>
        <h3>{life_span}</h3>
        <p>{temperament}</p>
        </Link>
        
        
      </div>
    
  )
}

export default Card
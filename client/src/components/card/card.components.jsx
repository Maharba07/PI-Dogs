import { Link } from 'react-router-dom'
import './card.styles.css'

function Card(dog) {

  const {name, años_vida, temperaments} = dog


  return (
  
      <div className='card-container'>
        <Link to = {`/home/${id}`}>
        <h2>{name}</h2>
        <h3>{años_vida}</h3>
        <p>{temperaments}</p>
        </Link>
        
        
      </div>
    
  )
}

export default Card
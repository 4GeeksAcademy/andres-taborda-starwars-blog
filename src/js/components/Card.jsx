import PropTypes, { element } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../store/AppContext';

export const Card = ({element}) => {
  const { name, uid , image} = element
 

  const [isFavorite, setIsFavorite] = useState(false);
  const { store, actions } = useContext(Context);

  const handleClick = (e) => {
    e.preventDefault()
    isFavorite 
    ? actions.removeFavorites(uid)
    : actions.addFavorites(element)
    setIsFavorite(!isFavorite)
  }

  useEffect(() => {
    const isAdded = store.favorites.find(favorite => favorite.uid === uid && favorite.name === name)
    isAdded && setIsFavorite(true)
  }, []);

  

  return (
    <Link to={`/details/${uid}`} className="card bg-transparent text-white shadow " style={{width: "12rem", height:"25rem"}}>
      <img 
        src={image}
        className="card-img-top " 
        alt={name}
        style={{height:"12em"}}
        />
      <div className="card-body border-top border-danger border-opacity-25 border-4 align-content-center">
        <h5 className="card-title m-0">{name}</h5>        
      </div>
      <div className="card-footer">
        <button className='border-0 bg-transparent text-danger' onClick={handleClick}>
          <i className={`${isFavorite ? 'fa-solid': 'fa-regular'} fa-heart`}></i>
        </button>
      </div>
    </Link>
  )
}

Card.propTypes = {
  element: PropTypes.object

}

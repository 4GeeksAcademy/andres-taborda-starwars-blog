import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Context } from '../store/AppContext'

export const Details = () => {
  const { store, actions } = useContext(Context)
  const [props, setProps] = useState([]);

  const { details } = store
  const { id } = useParams()

  useEffect(() => {
    actions.getDetails(id)    
  }, []);

  useEffect(() => {
    if (details) {
      setProps(Object.keys(details?.properties))      
    }
  }, [details]);

  return (
    <div className='container py-5'>
      <div className="card mb-3 text-white shadow" style={{backgroundColor:"#282727"}}>
        <div className="row g-0">
          <div className="col-md-7">
            <img 
              src="https://starwars-visualguide.com/assets/img/big-placeholder.jpg" 
              className="img-fluid rounded-start border-end border-danger border-3"
              style={{width:"100%", height:"100%"}} 
              alt="..."
            />
          </div>
          <div className="col-md-5">
            <div className="card-body fs-5">
              <h1 className="card-title">{details?.properties?.name}</h1>
              <ul id='detailsList'>
                {
                  props.map(prop => (
                    <li key={prop} className='mt-1'>
                      <span className="card-text text-danger text-capitalize fw-bold">{prop}: </span>
                      <span className="card-text">{details.properties[prop]}</span>
                    </li>
                  ))
                }
              </ul>
              
             
            </div>
          </div>
        </div>
      </div>  
    </div>
  )
}

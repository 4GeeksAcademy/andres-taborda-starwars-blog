import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import { Context } from '../store/AppContext'


export const Details = () => {
  const { store, actions } = useContext(Context)
  const [props, setProps] = useState([]);
  const { result } = store
  const { id, category } = useParams()
  const  { state } = useLocation();

  useEffect(() => { 
    actions.getData({category,id})    
  }, []);

  useEffect(() => {
    if (result?.properties) {
      setProps(Object.keys(result?.properties))  
    }
  }, [result]);

  

  return (
    <div className='container py-5'>
      <div className="card mb-3 text-white shadow" style={{backgroundColor:"#282727"}}>
        <div className="row g-0">
          <div className="col-md-7" style={{height:"550px"}} >
            <img 
              src={state.image} 
              className="img-fluid rounded-start border-end border-danger border-3"
              style={{width:"100%", height:"100%", objectFit:"contain"}} 
              alt={result?.properties?.name}
            />
          </div>
          <div className="col-md-5">
            <div className="card-body fs-5">
              <h1 className="card-title">{result?.properties?.name}</h1>
              <ul id='detailsList'>
                {
                  props.map(prop => (
                    <li key={prop} className='mt-1'>
                      <span className="card-text text-danger text-capitalize fw-bold">{prop}: </span>
                      <span className="card-text">{result.properties[prop]}</span>
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

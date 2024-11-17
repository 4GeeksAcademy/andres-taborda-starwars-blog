import React from 'react'
import { Card } from './Card'


export const CardList = ({ result, category }) => {
  

  return (
    <ul className='card-group gap-4 p-5'>
      {
        result.map(element => (
          <li key={element.uid}>
            <Card element={element}/>
          </li>
        ))
      }
    </ul>
  )
}

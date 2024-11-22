import React, { useContext, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';
import { Context } from "../store/AppContext";
import { Link } from "react-router-dom";


export const Search = () => {
  const { store, actions } = useContext(Context);
  const { searchData } = store

  const searchResults = useRef(null)

  const handleChange  = useDebouncedCallback((e) => { 
    
    actions.getByName(e.target.value)
  },1000)

  
  useEffect(() => {
    actions.resetDataSearch()
    
  }, []);


  useEffect(() => {
    const { people, vehicles, planets } = searchData
    
    if (people?.length > 0 || vehicles?.length > 0 || planets?.length > 0) {
      searchResults.current.style.display = "block"
      return
    }
    searchResults.current.style.display = "none"
    
  }, [searchData]);

  return (
    <header className="bg-dark position-relative mt-5">
      <input 
        type="text" 
        name="inputSearch" 
        id="inputSearch" 
        className="input-search"
        placeholder="Search by name"
        onChange={handleChange}
      />
      <div className="position-absolute" id="searchResults" ref={searchResults}>
        {
          searchData.people?.length > 0 &&
          <ul className="list-group list-group-flush align-items-start p-2">
            <li className="list-group-item bg-transparent fs-4 fw-bold text-white">People</li>
            {
              searchData.people.map(element => (
                <Link to={`/details/people/${element.uid}`} key={element.uid} className="list-group-item bg-transparent">{element.properties.name}</Link>
              ))
            }
          </ul>
        }

        {
          searchData.vehicles?.length > 0 &&
          <ul className="list-group list-group-flush align-items-start p-2">
            <li className="list-group-item bg-transparent fs-4 fw-bold text-white">vehicles</li>
            {
              searchData.vehicles.map(element => (
                <Link to={`/details/vehicles/${element.uid}`} key={element.uid} className="list-group-item bg-transparent">{element.properties.name}</Link>
              ))
            }
          </ul>
        }

        {
          searchData.planets?.length > 0 &&
          <ul className="list-group list-group-flush align-items-start p-2">
            <li className="list-group-item bg-transparent fs-4 fw-bold text-white">Planets</li>
            {
              searchData.planets.map(element => (
                <Link to={`/details/planets/${element.uid}`} key={element.uid} className="list-group-item bg-transparent">{element.properties.name}</Link>
              ))
            }
          </ul>
        }
      </div>
    </header>
  )
}

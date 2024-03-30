import React from 'react';
import { Link } from "react-router-dom";

const Card = ({ searchInput, handleInputChange, searchItems, isEmptyResult, hero, sortedData}) => {
  return (
    <div className="card">
        <div className="search-container">
            <input 
                type="text" 
                placeholder='Find your hero!'           
                value={searchInput}
                onChange={handleInputChange}
            /> 
            <button className='button' onClick={searchItems}>Search!</button>
        </div>

        {isEmptyResult === false ? (
            <table className="hero-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Stories available</th>
                        <th>Comics available</th>
                        <th>Last Updated</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((hero) => (
                        <tr key={hero.id}>
                            <td>{hero.name}</td>
                            <td>
                                <img
                                    src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                                    alt={hero.name}
                                    className="hero-image"
                                />
                            </td>
                            <td>{hero.stories.available}</td>
                            <td>{hero.comics.available}</td>
                            <td>{hero.modified.split("T")[0]}</td>
                            <td>
                                <Link to={`/HeroDetails/${hero.id}`} key={hero.id}>
                                    <button>Link!</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <h2>Sorry, we couldn't find any hero with that name.</h2>
        )}
    </div>
  );
};

export default Card;

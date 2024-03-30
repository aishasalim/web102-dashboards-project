import React from 'react';

const Statistics = ({ searchLimit, totalAvailableStories, totalAvailableComics }) => {
  return (
    <div className="statistics">
      <div className="stat-card">
        <h2 >{searchLimit ? searchLimit.toLocaleString('en-US') : ''}</h2>
        <p>Heroes</p>
      </div>
      <div className="stat-card">
        <h2>{totalAvailableStories ? totalAvailableStories.toLocaleString('en-US') : ''}</h2>
        <p>Stories available</p>
      </div>
      <div className="stat-card">
        <h2>{totalAvailableComics ? totalAvailableComics.toLocaleString('en-US') : ''}</h2>
        <p>Comics available</p>
      </div>
    </div>
  );
};

export default Statistics;


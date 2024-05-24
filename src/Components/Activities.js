
import React from 'react';
import './Activities.css';

import camping from './images/camping.jpg';
import pottery from './images/pottery.jpg';
import privateMovieTheatre from './images/private_movie_theatre.jpg';
import treasureHunt from './images/treasure_hunt.jpg';

function Card(props) {
  return (
    <div className="card">
      <h2>{props.title}</h2>
      <img src={props.imageUrl} alt={props.imageAlt} />
      <p>{props.content}</p>
    </div>
  );
}

// Usage example:
function Activities() {
  return (
    <>
    <h3>Fun-Activities</h3>
    <div className="App">
      <Card
        title="Camping Trip"
        // imageUrl="./images/camping.jpg"
        imageUrl={camping}
        imageAlt="Camping in the wilderness"
        content="Join us for an exciting camping adventure!"
      />
      <Card
        title="Pottery Workshop"
        // imageUrl="\public\images\pottery.jpg"
        imageUrl={pottery}
        imageAlt="Pottery wheel in action"
        content="Learn the art of pottery and create beautiful pieces."
      />
      <Card
        title="Open Private Movie Time"
        // imageUrl="\public\images\private_movie_theatre.jpg"
        imageUrl={privateMovieTheatre}
        imageAlt="picture in open"
        content="Experience a movie in private open theatre."
      />
      <Card
        title="Treasure Hunt"
        // imageUrl="\public\images\treasure_hunt.jpg"
        imageUrl={treasureHunt}
        imageAlt="picture in open"
        content="Experience the thrill and joy hunting for hidden treasure."
      />

      
    </div>
    </>
  );
}

export default Activities;





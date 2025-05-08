import React from 'react';
import './PlaneCard.css';

export default function Plane(props) {
  try{
    console.log("Plane props: ", props);
  const { name, imgurl, imgsrc, infoSource, description } = props.data;
  
  return (
    <div className="plane-card">
      <div className="plane-card__media">
        <img
          className="plane-card__image"
          src={imgurl}
          alt={name}
        />
        <span className="plane-card__imgsrc">Image via {imgsrc}</span>
      </div>

      <div className="plane-card__body">
        <h2 className="plane-card__title">{name}</h2>
        <p className="plane-card__desc">{description}</p>
        <p className="plane-card__source">
          <strong>Source:</strong> {infoSource}
        </p>
      </div>
    </div>
  );
} catch(e){
  //console.log("Error in Plane component: ", e);
  return null;
}
}

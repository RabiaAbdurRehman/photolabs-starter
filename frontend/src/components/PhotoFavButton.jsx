import React, { useCallback, useState } from "react";

import FavIcon from "./FavIcon";
import "../styles/PhotoFavButton.scss";

function PhotoFavButton(props) {
  const liked = props.favPhotos.includes(props.photo.id);
  function handleClick(e) {
    //setClicked(!clicked);
    props.addFavourite(props.photo.id);
    e.stopPropagation(); //stop it from parents to access it.
  }
  return (
    <div className="photo-list__fav-icon" onClick={(e) => handleClick(e)}>
      <div className="photo-list__fav-icon-svg">
        <FavIcon displayAlert={false} selected={liked} />
      </div>
    </div>
  );
}

export default PhotoFavButton;

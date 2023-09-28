import React, { useCallback, useState } from "react";

import FavIcon from "./FavIcon";
import "../styles/PhotoFavButton.scss";

function PhotoFavButton(props) {
  //const [liked, setLiked] = useState(props.favPhotos.includes(props.photo.id));
  const liked = props.favPhotos.includes(props.photo.id);
  function handleClick(e) {
    //setLiked(!liked);
    props.addFavourite(props.photo.id);
    props.fetchPhotos();
    e.stopPropagation(); //stop it from parents to access it.
  }
  //console.log("liked items are,", liked);
  return (
    <div className="photo-list__fav-icon" onClick={handleClick}>
      <div className="photo-list__fav-icon-svg">
        <FavIcon displayAlert={false} selected={liked} />
      </div>
    </div>
  );
}

export default PhotoFavButton;

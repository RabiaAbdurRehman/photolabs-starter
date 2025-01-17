import React from "react";
import TopNavigation from "components/TopNavigationBar";
import PhotoList from "components/PhotoList";

import "../styles/HomeRoute.scss";

const HomeRoute = (props) => {
  return (
    <div className="home-route">
      <TopNavigation
        isFavPhotoExist={props.isFavPhotoExist}
        topics={props.topics}
        handleImageFetch={props.handleImageFetch}
      />
      <PhotoList
        photos={props.photos}
        toggleFavourite={props.toggleFavourite}
        onPhotoClick={props.onPhotoClick}
        favPhotos ={props.favPhotos}
      />
    </div>
  );
};

export default HomeRoute;
//const {photos, toggleFavourite, onPhotoClick} = props

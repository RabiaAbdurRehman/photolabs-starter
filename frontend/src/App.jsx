import React, { Fragment } from "react";
import { useApplicationData } from "hooks/useApplicationData";

import "./App.scss";

import HomeRoute from "routes/HomeRoute";
import PhotoDetailsModal from "routes/PhotoDetailsModal";

// Note: Rendering a single component to build components in isolation
const App = () => {
  const {
    state,
    isModalOpen,
    selectedPhoto,
    isFavPhotoExist,
    handleImageFetch,
    handleOnPhotoClick,
    handleCloseModal,
    toggleFavourite,
    handleSearch,
    fetchPhotos,
  } = useApplicationData();

  return (
    <div className="App">
      <HomeRoute
        photos={state.photos}
        topics={state.topics}
        handleImageFetch={handleImageFetch}
        onPhotoClick={handleOnPhotoClick}
        isFavPhotoExist={isFavPhotoExist}
        toggleFavourite={toggleFavourite}
        handleSearch={handleSearch}
        favPhotos = {state.isFavorited}
        fetchPhotos = {fetchPhotos}
      />
      {isModalOpen && (
        <PhotoDetailsModal
          onCloseClick={handleCloseModal}
          selectedPhoto={selectedPhoto}
          isFavPhotoExist={isFavPhotoExist}
          toggleFavourite={toggleFavourite}
          onPhotoClick={handleOnPhotoClick}
          favPhotos = {state.isFavorited}
          fetchPhotos = {fetchPhotos}
        />
      )}
    </div>
  );
};

export default App;

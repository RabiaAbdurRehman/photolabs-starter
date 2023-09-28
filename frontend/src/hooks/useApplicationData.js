import { useState, useReducer, useEffect } from "react";
import axios from "axios";

const photoState = "/api/photos"; //api/photos
const topicState = "/api/topics";
const searchItem = "/api/photos/search";

export const ACTIONS = {
  GET_PHOTOS_BY_TOPICS: "GET_PHOTOS_BY_TOPICS",
  FAV_PHOTO_ADDED: "FAV_PHOTO_ADDED",
  FAV_PHOTO_REMOVED: "FAV_PHOTO_REMOVED",
  SET_PHOTO_DATA: "SET_PHOTO_DATA",
  SET_TOPIC_DATA: "SET_TOPIC_DATA",
  SELECT_PHOTO: "SELECT_PHOTO",
  DISPLAY_PHOTO_DETAILS: "DISPLAY_PHOTO_DETAILS",
  TOGGLE_MODAL: "TOGGLE_MODAL",
  SELECTED_PHOTO_DETAIL: "SELECTED_PHOTO_DETAILS",
  SEARCH_PHOTO: "SEARCH_PHOTO",
};
const initialState = {
  isModalOpen: false,
  selectedPhoto: null,
  selectedTopic: null,
  isFavorited: [],
  photos: [], // added property for photos data
  topics: [], // added property for topics data
  searchPhoto: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PHOTO_DATA":
      return {
        ...state,
        photos: action.payload,
      };
    case "SET_TOPIC_DATA":
      return {
        ...state,
        topics: action.payload,
      };
    case "SEARCH_PHOTO":
      return {
        ...state,
        searchPhoto: action.payload,//photos instead of searchPhoto
      };
    case "TOGGLE_MODAL":
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    case "SELECTED_PHOTO_DETAILS":
      return {
        ...state,
        selectedPhoto: action.payload,
      };
    case "FAV_PHOTO_ADDED":
      return {
        ...state,
        isFavorited: [...state.isFavorited, action.payload],
      };
    case "FAV_PHOTO_REMOVED":
      return {
        ...state,
        isFavorited: state.isFavorited.filter(
          (photo) => photo !== action.payload
        ),
      };
    case "GET_PHOTOS_BY_TOPICS":
      return {
        ...state,
        selectedTopic: action.payload,
      };
    default:
      return state;
  }
};

export const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchPhotos = () => {

    axios
      .get(photoState)
      .then((response) =>
        dispatch({
          type: ACTIONS.SET_PHOTO_DATA,
          payload: response.data,
        })
      )
      .catch((error) => {
        console.error("API Error:", error);
      });
  }

  useEffect(() => {
    fetchPhotos()
  }, []);
  useEffect(() => {
    axios
      .get(topicState)
      .then((response) =>
        dispatch({
          type: ACTIONS.SET_TOPIC_DATA,
          payload: response.data,
        })
      )
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  const handleImageFetch = (topicId) => {
    axios
      .get(`/api/topics/photos/${topicId}`)
      .then((response) =>
        dispatch({
          type: ACTIONS.SEARCH_PHOTO,
          payload: response.data,
        })
      )
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  const handleSearch = (photo) => {

    axios
    .get(`/api/search/${photo}`)
    .then((response) =>


      dispatch({
        type: ACTIONS.SET_PHOTO_DATA,
        payload: response.data,
      })
    )
    .catch((error) => {
      console.error("API Error:", error);
    });
    //console.log("Response", response.data);

  }

  const handleOnPhotoClick = (photo) => {
    //console.log("handleOnPhotoClick called with photo:", photo);
    dispatch({
      type: ACTIONS.SELECTED_PHOTO_DETAIL,
      payload: photo,
    });
    dispatch({
      type: ACTIONS.TOGGLE_MODAL,
    });
  };
  const handleCloseModal = () => {
    dispatch({
      type: ACTIONS.TOGGLE_MODAL,
    });
    dispatch({
      type: ACTIONS.SELECTED_PHOTO_DETAIL,
      payload: null,
    });
  };

  const toggleFavourite = (photo) => {
    //console.log("can I see a single photo", photo)
    if (state.isFavorited.includes(photo)) {
      dispatch({
        type: ACTIONS.FAV_PHOTO_REMOVED,
        payload: photo,
      });
    } else {
      dispatch({
        type: ACTIONS.FAV_PHOTO_ADDED,
        payload: photo,
      });
    }
  };
  const isFavPhotoExist = Boolean(state.isFavorited.length);
  return {
    state,
    isModalOpen: state.isModalOpen,
    selectedPhoto: state.selectedPhoto,
    handleImageFetch,
    isFavPhotoExist,
    handleOnPhotoClick,
    handleCloseModal,
    toggleFavourite,
    handleSearch,
    fetchPhotos,
  };
};
//its adding whole array of object(photo) in isfavourited.

import axios from 'axios';
import {toast} from 'react-hot-toast'
const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;
export const getRecipes = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/random`, {
      params: {
        number: 10,
        apiKey: API_KEY,
        offset:(page - 1)*10
      },
    });
    return response.data.recipes;
  } catch (error) {
    toast.error(error.message)
    throw new Error('Failed to fetch recipes');
  }
};

export const getIndianRecipes = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/random`, {
      params: {
        number: 10,
        apiKey: API_KEY,
        offset:(page - 1)*10,
        cuisine:"indian"
      },
    });
    return response.data.recipes;
  } catch (error) {
    toast.error(error.message)
    throw new Error('Failed to fetch recipes');
  }
};

export const getItalianRecipes = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/random`, {
      params: {
        number: 10,
        apiKey: API_KEY,
        offset:(page - 1)*10,
        cuisine:"italian"
      },
    });
    return response.data.recipes;
  } catch (error) {
    toast.error(error.message)
    throw new Error('Failed to fetch recipes');
  }
};

export const getRecipeDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/${id}/information`, {
      params: {
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch recipe details');
  }
};

export const getRecipeSearch = async (keyword) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
      params: {
        apiKey: API_KEY,
        titleMatch:keyword,
        number:10
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch recipe details');
  }
};
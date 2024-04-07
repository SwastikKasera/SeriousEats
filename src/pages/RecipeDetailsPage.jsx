import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeDetails } from '../utils/api';
import RecipeDetails from '../components/RecipeDetails';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import { Rings } from 'react-loader-spinner';

const RecipeDetailsPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const data = await getRecipeDetails(id);
        setRecipe(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  return (
    <div>
      <Toaster />
      <Navbar/>
      {recipe ? <RecipeDetails recipe={recipe} /> : 
          <div className='w-full flex justify-center items-center'>
            <Rings
              visible={true}
              height="80"
              width="80"
              color="#000"
              ariaLabel="rings-loading"
              wrapperStyle={{}}
              wrapperClass=""
              />
          </div>
      }
    </div>
  );
};

export default RecipeDetailsPage;
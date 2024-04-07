import React, { useEffect, useState } from 'react';
import { getItalianRecipes } from '../utils/api';
import RecipeCard from '../components/RecipeCard';
import { Toaster } from 'react-hot-toast';
import { Rings } from 'react-loader-spinner';
import Navbar from '../components/Navbar';

const ItalianCuisine = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      try {
        const data = await getItalianRecipes(page);
        setRecipes((prevRecipes) => [...prevRecipes, ...data]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    <Navbar/>
    <div>
    <Toaster position="bottom-right" reverseOrder={false} />
      <h1 className="text-3xl text-center font-bold mb-8">Italian Cuisine</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="w-full p-4">
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
        <div className='w-full h-fit flex justify-center items-center'>
          {isLoading &&
          <Rings
            visible={true}
            height="80"
            width="80"
            color="#000"
            ariaLabel="rings-loading"
            wrapperStyle={{}}
            wrapperClass=""
            />}
        </div>
    </div>
    </>
  );
};

export default ItalianCuisine;
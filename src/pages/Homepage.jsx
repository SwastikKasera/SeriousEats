import React, { useEffect, useState } from 'react';
import { getRecipeSearch, getRecipes } from '../utils/api';
import RecipeCard from '../components/RecipeCard';
import { Toaster } from 'react-hot-toast';
import { Rings } from 'react-loader-spinner';
import Navbar from '../components/Navbar';
import { CiSearch } from "react-icons/ci";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      try {
        const data = await getRecipes(page);
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

  const handleSearchChange = (e)=>{
    setSearch(e.target.value)
  }

  const handleSearch = async ()=>{
    if(search !== ""){
      const response = await getRecipeSearch(search)
      setRecipes(response?.results)
    }
  }

  return (
    <>
    <Navbar/>
    <div>
    <Toaster position="bottom-right" reverseOrder={false} />
      <h1 className="text-5xl text-center font-bold font-prata mb-8">Recipe Book</h1>
      <div class="pt-2 flex justify-center items-center mx-auto w-80 text-gray-600">
        <input onChange={handleSearchChange} class="border border-gray-800 bg-white rounded-e-none border-e-0 w-full h-12 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search" name="search" placeholder="Search"/>
        <button onClick={handleSearch} class="bg-black h-12 w-12 flex justify-center items-center rounded-lg rounded-s-none text-white font-bold">
          <CiSearch size={22}/>
        </button>
      </div>
      {recipes.length > 0 ?<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        {recipes.length > 0 && recipes.map((recipe) => (
          <div key={recipe.id} className="w-full p-4">
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
      :
      <h2 className='font-prata text-2xl text-center w-full'>No Result Found</h2>}
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

export default HomePage;
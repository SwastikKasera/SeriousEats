import React from 'react';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';
import { FaHeartCircleCheck } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  const isVegetarian = recipe?.vegetarian;
  const shortSummary = `${(recipe?.summary || "No Description Found").slice(0, 100)}...`;
  const isPremium = recipe?.pricePerServing > 100;

  return (
    <div className="bg-gray-200 p-4 rounded-lg h-full flex flex-col border border-neutral-400 font-ubuntu">
      <div className="flex-grow relative">
        <img
          src={recipe?.image}
          alt={recipe?.title}
          className="w-full h-48 object-cover mb-4 rounded-md"
        />
        <div className={`w-fit h-4 text-xs absolute top-4 right-4 rounded-full`}>
            <span className={`${isVegetarian ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}text-sm font-semibold px-2.5 py-0.5 rounded`}>
              {isVegetarian ? "Veg" : "Non-Veg"}
            </span>
        </div>
        <div className="flex items-center mb-2">
          <h3 className="text-xl font-semibold font-prata">{recipe?.title}</h3>
        </div>
        <div className="flex mb-4">
          <span className="flex justify-center items-center gap-1 bg-blue-100 w-fit text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
          <BsFillHandThumbsUpFill />{recipe?.aggregateLikes}
          </span>
          <span className="flex justify-center items-center gap-1 bg-green-100 w-fit text-green-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
          <FaHeartCircleCheck />{recipe?.healthScore}
          </span>
          {isPremium && (
            <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-2.5 py-0.5 rounded">
              Premium
            </span>
          )}
        </div>
        <div
          className="text-gray-700 mb-4"
          dangerouslySetInnerHTML={{ __html: shortSummary }}
        />
      </div>
      <div className="mt-auto flex items-center justify-between gap-2">
        <div className="bg-white border border-black px-4 py-2 font-bold w-fit flex justify-center items-center rounded-md">
          <p>&#8377;{recipe?.pricePerServing?.toFixed(2)}</p>
        </div>
        <Link className='w-full' to={`/recipe/${recipe?.id}`}>
          <button className="bg-black w-full text-white px-4 py-2 rounded-md">
            View Recipe
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
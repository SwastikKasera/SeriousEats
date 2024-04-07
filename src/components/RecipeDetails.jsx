import React, { useState } from 'react';
import { IoIosTimer } from "react-icons/io";
import { BiDish } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { LuHeartPulse } from "react-icons/lu";
import { IoChevronBackSharp } from "react-icons/io5";
import {useNavigate} from 'react-router-dom'
import { GiBroccoli } from "react-icons/gi";
import { IoEggOutline } from "react-icons/io5";
const RecipeDetails = ({ recipe }) => {
  const isVegan = recipe?.vegan;
  const isVegetarian = recipe?.vegetarian;
  const navigate = useNavigate()
  const dishType = recipe?.dishTypes
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  const toggleIngredient = (ingredientId) => {
    if (checkedIngredients.includes(ingredientId)) {
      setCheckedIngredients(checkedIngredients.filter(id => id !== ingredientId));
    } else {
      setCheckedIngredients([...checkedIngredients, ingredientId]);
    }
  };

  
  return (
    <div className="max-w-4xl mx-auto font-ubuntu">
      <div className='w-full'>
        <button  onClick={()=> navigate(-1)} className='bg-neutral-200 text-black rounded-lg text-lg flex justify-center items-center gap-1 p-2'><IoChevronBackSharp />Back</button>
      </div>
      <div className="my-4 flex items-center">
        <h1 className="text-5xl font-prata font-bold">{recipe?.title}</h1>
      </div>
      <div className="mb-4 w-full flex justify-start relative">
        <img src={recipe?.image} alt={recipe?.title} className="w-full aspect-video rounded-lg" />
        <div className='absolute bottom-4 left-4 flex gap-3'>
          <div className='flex bg-blue-200 rounded p-1 px-2 text-blue-800 justify-center items-center gap-1 text-lg'>
            <AiOutlineLike />
            <p>{recipe?.aggregateLikes}</p>
          </div>
          <div className='flex bg-green-200 rounded p-1 px-2 text-green-800 justify-center items-center gap-1 text-lg'>
            <LuHeartPulse />
            <p>{recipe?.healthScore}</p>
          </div>
        </div>
      </div>
      <div className='w-full flex justify-start text-base items-center gap-3'>
        <div className='w-fit p-2 flex flex-col justify-center items-start'>
          <p className='text-neutral-500 '>Prep time</p>
          <div className='flex justify-center items-center gap-1'>
            <IoIosTimer size={20}/>
            <p>{recipe?.readyInMinutes}</p>
          </div>
        </div>
        <div className='w-fit p-2 flex flex-col justify-start items-start'>
          <p className='text-neutral-500 '>Servings</p>
          <div className='flex justify-center items-center gap-1'>
            <BiDish size={20}/>
            <p>{recipe?.servings}</p>
          </div>
        </div>
        <div className='w-fit p-2 flex flex-col justify-start items-start'>
          <p className='text-neutral-500 '>Author</p>
          <div className='flex justify-center items-center gap-2 '>
            <RxAvatar size={20}/>
            <p>{recipe?.creditsText}</p>
          </div>
        </div>
      </div>
      <h2 className='text-2xl font-bold mt-2 font-prata'>Dish Type</h2>
      <div className='w-full flex justify-start items-center gap-3 mt-4'>
        {dishType.map((item)=>(
            <p className='bg-white border font-semibold capitalize border-black text-neutral-800 py-1 px-2 rounded w-fit'>{item}</p>
          ))
        }
      </div>
      <div className="my-4 bg-neutral-100 p-2 rounded-lg">
        <h2 className='text-2xl font-bold mb-4 font-prata'>Description</h2>
        <p dangerouslySetInnerHTML={{__html: recipe?.summary}}/>
      </div>
      <div className="mb-2 bg-indigo-700 text-white flex gap-2 items-start justify-start p-2 rounded-lg">
        <p><IoMdInformationCircleOutline size={20} /></p>
        <div
          dangerouslySetInnerHTML={{ __html: recipe?.instructions }}
        />
      </div>
      <div className='flex gap-2'>
        <div className="mb-4 bg-white border-1 border-black h-fit p-2 rounded-lg flex flex-col justify-center items-center">
          <div>
            <div className='flex justify-start items-center gap-4'>
              <h2 className="text-4xl font-bold p-2 font-prata">
                Ingredients
              </h2>
              {isVegan && <p className='w-fit rounded-lg flex justify-center font-semibold items-center gap-2 bg-yellow-200 text-yellow-800 py-2 px-3'><IoEggOutline />Vegan</p>}
              {isVegetarian && <p className='w-fit rounded-lg flex justify-center font-semibold items-center gap-2 bg-green-200 text-green-800 py-2 px-3'><GiBroccoli />Vegetarian</p>}
            </div>
            <div>
              <div className="py-4 w-fit">
                {recipe.extendedIngredients.map((ingredient) => (
                  <div key={ingredient.id}>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={checkedIngredients.includes(ingredient.id)}
                        onChange={() => toggleIngredient(ingredient.id)}
                        className="form-checkbox accent-current h-5 w-5 text-black"
                      />
                      <span className={`ml-2 ${checkedIngredients.includes(ingredient.id) ? 'line-through text-gray-400' : ''}`}>
                        {ingredient.original}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
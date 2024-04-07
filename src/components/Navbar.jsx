import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row justify-between items-center">
        <Link to={"/"} className="flex title-font justify-center items-center font-medium text-gray-900 mb-4 md:mb-0">
          <img src={logo} width={70} className="rounded-full" alt="logo" />
          <h2 className="text-3xl font-prata">Serious Eats</h2>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to={'/'} className="mr-5 hover:text-gray-900">Home</Link>
          <Link to={'/italian'} className="mr-5 hover:text-gray-900">Italian Cuisine</Link>
          <Link to={'/indian'} className="mr-5 hover:text-gray-900">Indian Cuisine</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

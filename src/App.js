import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import RecipeDetailsPage from './pages/RecipeDetailsPage';
import IndianCuisine from './pages/IndianCuisine';
import ItalianCuisine from './pages/ItalianCuisine';
function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/italian" element={<ItalianCuisine />} />
          <Route path="/indian" element={<IndianCuisine />} />
          <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;

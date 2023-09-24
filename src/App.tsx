import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import CreatingRecipe from './pages/CreatingRecipe/CreatingRecipe';
import FullRecipe from './pages/FullRecipe/FullRecipe';
import Categories from './components/Categories/Categories';

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/react_recipes" element={<MainPage />} />
        <Route path="newRecipe" element={<CreatingRecipe />} />
        <Route path="recipe/:id" element={<FullRecipe />} />
      </Routes>
    </div>
  );
}

export default App;

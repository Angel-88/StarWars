import './App.css';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import * as React from 'react';
import Home from './view/Home/Home';
import FilmDetails from './view/FilmDetails/FilmDetails';
import DetailsCharacter from './view/CharacterDetails/CharacterDetails';

function App () {

  return (
    <>
      <Header/>
      <Routes>
        <Route
          path="/"
          index
          element={<Home/>}/>
        <Route
          path="/films/:id/"
          element={<FilmDetails/>}/>
        <Route
          path="/people/:id/"
          element={<DetailsCharacter/>}/>
      </Routes>
    </>
  );
}

export default App;

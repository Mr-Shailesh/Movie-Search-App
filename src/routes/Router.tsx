import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/error/NotFound";
import Header from "../components/Header";
import MovieDetails from "../components/MovieDetails";
import MovieListPage from "../pages/movies/MovieListPage";

const Router: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<MovieListPage />} />
        <Route path="/" element={<MovieListPage />} />
        <Route path="movie-details/:id" element={<MovieDetails />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default Router;

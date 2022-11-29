import React, { useContext } from 'react';
import AppContext from '../../../context/AppContext';
import BookCard from '../../molecules/BookCard';

const LovedTab = () => {
  const { favorites } = useContext(AppContext);
  return (
    <div>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {favorites.map((fav) => (
          <BookCard key={fav.id} id={fav.id} volumeInfo={fav.volumeInfo} />
        ))}
      </div>
      {favorites.length === 0 && (
        <p className="text-center">
          <i className="bi bi-heart"></i> &nbsp;Go love some books! &nbsp;
          <i className="bi bi-heart"></i>
        </p>
      )}
    </div>
  );
};

export default LovedTab;

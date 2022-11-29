import { useContext } from 'react';
import AppContext, { LOCAL_ID } from '../../../context/AppContext';
import { VolumeInfo } from '../../../interfaces';

const BookCard = ({ id, volumeInfo }: { volumeInfo: VolumeInfo; id: string }) => {
  const { setFavorites, favorites } = useContext(AppContext);
  const isFav = favorites.find((fav) => fav.id === id);

  const handleFavorite = () => {
    let copyFavorites = [...favorites];
    if (!isFav) {
      copyFavorites.push({ id, volumeInfo });
    } else {
      copyFavorites = copyFavorites.filter((fav) => fav.id !== id);
    }
    setFavorites(copyFavorites);
    localStorage.setItem(LOCAL_ID, JSON.stringify(copyFavorites));
  };

  return (
    <div key={id} className="card relative w-full bg-base-100 shadow-xl">
      <div className="absolute left-0 top-0 flex w-full justify-end p-3">
        <button className={`${isFav ? 'btn-primary' : ''} btn`} onClick={handleFavorite}>
          {isFav ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
        </button>
      </div>
      <figure>
        <img
          src={volumeInfo?.imageLinks?.thumbnail}
          alt={volumeInfo?.title}
          className="h-40 w-full object-cover object-center lg:aspect-square"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{volumeInfo?.title}</h2>
        <p className="mb-0 font-medium">Author(s)</p>
        <ul className="list-inside list-disc">
          {volumeInfo?.authors?.map((author) => (
            <li key={author}>{author}</li>
          ))}
          {!volumeInfo.authors && <li>No author</li>}
        </ul>
        {volumeInfo?.ratingsCount ? (
          <div className="flex items-center gap-2">
            <div className="rating rating-lg rating-half items-center">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <input
                    key={index}
                    name="rating-10"
                    className={`mask mask-star-2 ${
                      Math.round(volumeInfo.averageRating || 0) > index + 1
                        ? 'bg-amber-500'
                        : 'bg-gray-500'
                    }`}
                  />
                ))}
            </div>
            <span>
              ({volumeInfo?.averageRating} of {volumeInfo?.ratingsCount} ratings)
            </span>
          </div>
        ) : (
          <span className="text-secondary">No rating yet</span>
        )}
      </div>
    </div>
  );
};

export default BookCard;

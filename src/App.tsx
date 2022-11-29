import { useState } from 'react';
import useSWR from 'swr';
import { Rating } from 'react-simple-star-rating';
import { IResponseAPI } from './interfaces';
import { fetcher } from './services';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [tempKeyword, setTempKeyword] = useState('');
  const { data, error, isValidating } = useSWR<IResponseAPI>(
    [`https://www.googleapis.com/books/v1/volumes?q=${keyword}`],
    keyword !== '' ? fetcher : null,
    { revalidateOnFocus: false }
  );

  if (error && keyword !== '') {
    return (
      <main className="container py-4">
        <h1>Something went wrong</h1>
        {JSON.stringify(error)}
      </main>
    );
  }

  return (
    <main className="container py-4">
      <h1 className="mb-2 text-center text-4xl lg:text-left">Find Your ❣️ Books!</h1>
      <form
        className="mt-5 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          setKeyword(tempKeyword);
        }}
      >
        <input
          type="text"
          placeholder="Type a keyword"
          className="input-bordered input w-full lg:w-96"
          onBlur={() => setKeyword(tempKeyword)}
          onChange={(e) => setTempKeyword(e.target.value)}
          value={tempKeyword}
        />
        <button className="btn-primary btn" type="submit">
          <i className="bi bi-search"></i>
        </button>
      </form>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {data?.items?.map(({ volumeInfo }) => (
          <div
            key={volumeInfo?.imageLinks?.thumbnail}
            className="card w-full bg-base-100 shadow-xl"
          >
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
                {
                  !volumeInfo.authors && <li>No author</li>
                }

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
        ))}
        {isValidating &&
          Array(6)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="h-72 w-full animate-pulse rounded-lg bg-gray-300"></div>
            ))}
      </div>
    </main>
  );
}

import { useState } from 'react';
import useSWR from 'swr';
import BookCard from '../../molecules/BookCard';
import { IResponseAPI } from '../../../interfaces';
import { fetcher } from '../../../services';

const SearchTab = () => {
  const [keyword, setKeyword] = useState('');
  const [tempKeyword, setTempKeyword] = useState('');
  const { data, error, isValidating } = useSWR<IResponseAPI>(
    [`https://www.googleapis.com/books/v1/volumes?q=${keyword}`],
    keyword !== '' ? fetcher : null,
    { revalidateOnFocus: false }
  );

  if (error) {
    return (
      <div className="container py-4">
        <h1>Something went wrong</h1>
        {JSON.stringify(error)}
      </div>
    );
  }

  return (
    <>
      <form
        className="mt-5 flex justify-center gap-2"
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
        {data?.items?.map(({ id, volumeInfo }) => (
          <BookCard key={id} id={id} volumeInfo={volumeInfo} />
        ))}
        {isValidating &&
          Array(8)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="h-72 w-full animate-pulse rounded-lg bg-gray-300"></div>
            ))}
      </div>
    </>
  );
};

export default SearchTab;

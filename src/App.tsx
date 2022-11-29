import { useState } from 'react';
import useSWR from 'swr';
import LovedTab from './components/organisms/LovedTab';
import SearchTab from './components/organisms/SearchTab';
import { IResponseAPI } from './interfaces';
import { fetcher } from './services';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [tempKeyword, setTempKeyword] = useState('');
  const [activeTab, setActiveTab] = useState<'search' | 'loved'>('search');
  const { data, error, isValidating } = useSWR<IResponseAPI>(
    [`https://www.googleapis.com/books/v1/volumes?q=${keyword}`],
    keyword !== '' ? fetcher : null,
    { revalidateOnFocus: false }
  );

  if (error) {
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
      <div className="tabs flex justify-center">
        <button
          onClick={() => setActiveTab('search')}
          className={`tab tab-bordered ${activeTab === 'search' ? 'tab-active' : ''}`}
        >
          Search
        </button>
        <button
          onClick={() => setActiveTab('loved')}
          className={`tab tab-bordered ${activeTab === 'loved' ? 'tab-active' : ''}`}
        >
          Loved
        </button>
      </div>
      {activeTab === 'search' && <SearchTab />}
      {activeTab === 'loved' && <LovedTab />}
    </main>
  );
}

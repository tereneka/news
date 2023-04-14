import React from 'react';
import Logo from './components/Logo';
import { useGetTopNewsQuery } from './api/newsApi';

function App() {
  const {
    data: news,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTopNewsQuery();

  console.log(news);

  return (
    <>
      <Logo />
    </>
  );
}

export default App;

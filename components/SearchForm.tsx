import React from "react";
import { useRouter } from "next/router";

const SearchForm: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();

  const search: React.EventHandler<React.SyntheticEvent> = (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const { query } = event.currentTarget;
    if (!query || (query && !query.value)) {
      return;
    }

    router.push({
      pathname: "/search",
      query: {
        q: query.value,
      },
    });

    event.currentTarget.reset();
  };

  return (
    <form
      className={`w-full max-w-6xl mx-auto h-full flex items-center relative ${className}`}
      onSubmit={search}
    >
      <input
        type="text"
        name="query"
        className="w-full bg-transparent border-b-2 border-gray-300 focus:border-loopring-darkBlue dark:border-gray-600 dark:focus:border-loopring-dark-blue transition-colors duration-300 outline-none px-6 py-4 pr-12 text-xl"
        placeholder="Search Block, Tx, AccountID ..."
        onFocus={() => router.prefetch("/search")}
      />
      <button
        type="submit"
        className="absolute right-4 text-gray-500 hover:text-loopring-darkBlue dark:hover:text-loopring-dark-blue transition-colors duration-300"
        aria-label="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchForm;

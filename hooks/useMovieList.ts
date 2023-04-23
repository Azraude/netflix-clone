import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useMovieList = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/movies", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false, // Not refresh the movie when the user loses focus
    revalideOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useMovieList;

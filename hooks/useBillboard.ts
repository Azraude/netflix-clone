import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useBillboard = () => {
  const { data, error, isLoading } = useSWR("/api/random", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false, // Not refresh the movie when the user loses focus
    revalideOnReconnect: false,
  });
  return { data, error, isLoading };
};

export default useBillboard;

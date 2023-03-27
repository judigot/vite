import React from "react";

import { useQuery } from "@tanstack/react-query";

import Data from "./helpers/Data";

async function getData({ queryKey }: any) {
  const { searchQuery } = queryKey[1];

  console.log(searchQuery);

  return Data();
}

interface Props {
  // For assigning dynamic keys (string)
  [key: string]: string | number | Date | undefined;

  // For assigning dynamic indexes (number)
  [index: number]: string | number | Date | undefined;
}

export default ({}: Props) => {
  const [message, setMessage] = React.useState<string>(``);

  const searchRef = React.useRef<HTMLInputElement>(null!);

  const {
    data: customDataName,
    dataUpdatedAt,
    error,
    errorUpdatedAt,
    failureCount,
    failureReason,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
    isPaused,
    isLoading,
    isLoadingError,
    isPlaceholderData,
    isPreviousData,
    isRefetchError,
    isRefetching,
    isInitialLoading,
    isStale,
    isSuccess,
    refetch,
    remove,
    status,
    fetchStatus,
  } = useQuery({
    queryKey: ["users", { searchQuery: searchRef.current?.value }],
    queryFn: getData, // Function to fetch data
    //==========BEHAVIOR==========//
    cacheTime: 5 * 60000, // 5 minutes
    refetchOnWindowFocus: "always",
    refetchInterval: 30 * 1000, // Every 30 seconds
    suspense: true,
    staleTime: 30 * 1000, // Every 30 seconds
    //==========BEHAVIOR==========//
    //
    //
    initialData: () => {
      getData({ queryKey: "initialData" })
        .then((result) => {
          // Success
          return result;
        })
        .catch((error) => {
          // Failure
          throw new Error(error);
        })
        .finally(() => {
          // Finally
        });
    },
    placeholderData: { type: "This is a placeholder data." },
    onSuccess: (data: Object[]) => {
      const date = new Date(dataUpdatedAt);

      let dayOfTheWeek = date.getDay();
      const year = date.getFullYear();
      let day = date.getDate();
      const month = date.toLocaleString("default", {
        month: "long",
      });

      const time = new Date(dataUpdatedAt).toLocaleString("en-US", {
        // year: "numeric",
        // month: "numeric",
        // day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });

      setMessage(`${month} ${day}, ${year} at ${time}`);
    },
    onError: (error: Error) => {
      // throw new Error(`${error}`);
    },
    onSettled: (data: Object[] | undefined, error: Error | null) => {
      if (data) console.log(`Data is settled.`);
      if (error) console.log(`${error}`);
    },
  });

  // if (dataUpdatedAt) return setMessage(JSON.stringify(dataUpdatedAt));
  // if (error) return setMessage(JSON.stringify(error));
  // if (errorUpdatedAt) return setMessage(JSON.stringify(errorUpdatedAt));
  // if (failureCount) return setMessage(JSON.stringify(failureCount));
  // if (failureReason) return setMessage(JSON.stringify(failureReason));
  // if (isError) return setMessage(JSON.stringify(isError));
  // if (isFetched) return setMessage(JSON.stringify(isFetched));
  // if (isFetchedAfterMount)
  //   return setMessage(JSON.stringify(isFetchedAfterMount));
  // if (isFetching) return setMessage(JSON.stringify(isFetching));
  // if (isPaused) return setMessage(JSON.stringify(isPaused));
  if (isLoading)
    return (
      <>
        <h1>{JSON.stringify(isLoading)}</h1>
      </>
    );
  // if (isLoadingError) return setMessage(JSON.stringify(isLoadingError));
  // if (isPlaceholderData) return setMessage(JSON.stringify(isPlaceholderData));
  // if (isPreviousData) return setMessage(JSON.stringify(isPreviousData));
  // if (isRefetchError) return setMessage(JSON.stringify(isRefetchError));
  // if (isRefetching) return setMessage(JSON.stringify(isRefetching));
  // if (isInitialLoading) return setMessage(JSON.stringify(isInitialLoading));
  // if (isStale) return setMessage(JSON.stringify(isStale));
  // if (isSuccess) return setMessage(JSON.stringify(isSuccess));
  // if (refetch) return setMessage(JSON.stringify(refetch));
  // if (remove) return setMessage(JSON.stringify(remove));
  // if (status) return setMessage(JSON.stringify(status));
  // if (fetchStatus) return setMessage(JSON.stringify(fetchStatus));

  return (
    <>
      <React.Suspense fallback={<div>Loading...</div>}>
        <h1>{message}</h1>

        <input
          onChange={() => {
            refetch();
          }}
          autoFocus
          required
          ref={searchRef}
          type="text"
          name="username"
        />

        <p>
          <a
            href="https://tanstack.com/query/v4/docs/react/community/tkdodos-blog"
            target="_blank"
          >
            TanStack React Query Best Practices
          </a>
        </p>

        <code>{JSON.stringify(customDataName)}</code>
      </React.Suspense>
    </>
  );
}

import React from "react";

import ReactQuery from "./ReactQuery";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface Props {
  // For assigning dynamic keys (string)
  [key: string]: string | number | Date | undefined;

  // For assigning dynamic indexes (number)
  [index: number]: string | number | Date | undefined;
}

export default ({}: Props) => {
  React.useEffect(() => {}, []);

  React.useEffect(() => {
    // Runs after every successful render or state change
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQuery />
    </QueryClientProvider>
  );
}

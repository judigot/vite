import React from "react";

import ReactQuery from "./ReactQuery";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface Props {
  [key: string]: string | number | Date; // For assigning dynamic keys (string)
  [index: number]: string | number | Date; // For assigning dynamic indexes (number)
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

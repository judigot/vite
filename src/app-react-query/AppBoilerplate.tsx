import React from "react";

import ReactQuery from "./ReactQuery";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface Props {}

export default function App(props: Props) {
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

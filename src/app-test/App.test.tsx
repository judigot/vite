import React from "react";
import App from "./App";

import "@testing-library/jest-dom";

import { act, renderHook, render, screen } from "@testing-library/react";

const useCustomHook = ({ propVal }: { propVal: string }) => {
  const [name, setName] = React.useState<string>(propVal);

  const mutateData = async (mutationValue: string) => {
    await fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then(() => {
        setName(mutationValue);
      });
  };
  return { name, mutateData };
};

describe("Tester", () => {
  it("test", async () => {
    const { result } = renderHook(useCustomHook, {
      initialProps: { propVal: "Old Name" },
    });

    console.log(result.current.name);

    expect(result.current.name).toBe("Old Name");

    await act(async () => result.current.mutateData("New Name"));

    expect(result.current.name).toBe("New Name");

    console.log(result.current.name);

    render(<App isPasswordCorrect={true} />);
    const component = screen.getByTestId("admin-container");
    expect(component).toBeInTheDocument();
  });
});

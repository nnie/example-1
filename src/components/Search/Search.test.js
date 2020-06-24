import React from "react";
import { render, fireEvent, act } from "@testing-library/react";

import * as service from "../../services/githubService";

import Search from "./Search";

test("renders input", async () => {
  const { findByPlaceholderText } = render(<Search />);
  const input = await findByPlaceholderText(/Find repos/i);

  expect(input.type).toBe("text");
});

test("renders calls onSubmit", async () => {
  const onSubmit = jest.fn();
  const { findByPlaceholderText } = render(
    <Search onSubmit={onSubmit} showSuggestions />
  );
  const input = await findByPlaceholderText(/Find repos/i);

  fireEvent.submit(input);

  expect(onSubmit).not.toHaveBeenCalled();

  fireEvent.change(input, {
    target: {
      value: "test",
    },
  });

  fireEvent.submit(input);

  expect(onSubmit).toHaveBeenCalled();
});

const getUserSuggestions = jest.fn().mockReturnValue(
  Promise.resolve({
    items: [
      {
        id: 1,
        login: "test-suggestion-1",
      },
    ],
  })
);

test("not renders suggestions if searchValue is too short", async () => {
  jest
    .spyOn(service, "getUserSuggestions")
    .mockImplementation(getUserSuggestions);
  const { container, findByPlaceholderText } = render(
    <Search onSubmit={() => {}} showSuggestions />
  );
  const input = await findByPlaceholderText(/Find repos/i);
  const suggestionList = container.getElementsByTagName("ul")[0];

  await act(async () => {
    fireEvent.change(input, {
      target: {
        value: "t",
      },
    });
  });

  expect(suggestionList.children.length).toEqual(0);
});

test("renders suggestions", async () => {
  jest
    .spyOn(service, "getUserSuggestions")
    .mockImplementation(getUserSuggestions);
  const { getByText, findByPlaceholderText } = render(
    <Search onSubmit={() => {}} showSuggestions />
  );
  const input = await findByPlaceholderText(/Find repos/i);

  await act(async () => {
    fireEvent.change(input, {
      target: {
        value: "test",
      },
    });
  });

  expect(getByText(/test-suggestion/i)).toBeInTheDocument();
});

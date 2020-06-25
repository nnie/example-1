import React from "react";
import { render, fireEvent, act } from "@testing-library/react";

import * as service from "../../services/githubService";

import App from "./App";

test("renders logo", () => {
  const { getByText } = render(<App />);
  const logo = getByText(/logo.svg/i);
  expect(logo).toBeInTheDocument();
});

test("renders error alert", () => {
  const { getByRole } = render(<App />);
  const errorAlert = getByRole(/alert/i);
  expect(errorAlert).toBeInTheDocument();
});

test("renders calls onSubmit", async () => {
  const getUserRepos = jest.fn().mockReturnValue(
    Promise.resolve([
      {
        id: 1,
        name: "test-repo-1",
        size: 100,
        stargazers_count: 1,
      },
    ])
  );
  jest.spyOn(service, "getUserRepos").mockImplementation(getUserRepos);
  const { findByPlaceholderText, findAllByText } = render(<App />);
  const input = await findByPlaceholderText(/Find repos/i);

  await act(async () => {
    fireEvent.change(input, {
      target: {
        value: "test",
      },
    });
  });

  await act(async () => {
    fireEvent.submit(input);
  });

  const el = await findAllByText(/test-repo-1/i);

  expect(el.length).not.toBe(0);
});

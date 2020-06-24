import React from "react";
import { render } from "@testing-library/react";
import Repos from "./Repos";

const mockData = [
  {
    id: 1,
    name: "test-repo-name-1",
    size: 100,
    stargazers_count: 90,
  },
  {
    id: 2,
    name: "test-repo-name-2",
    size: 0,
    stargazers_count: 0,
  },
];

test("renders empty list", () => {
  const { container } = render(<Repos data={[]} />);
  const collection = container.getElementsByTagName("li");

  expect(collection.length).toBe(0);
});

test("renders repo title", () => {
  const { getAllByText } = render(<Repos data={mockData} />);

  const titles = getAllByText(/test-repo-name-2/i);

  expect(titles.length).toBe(2);
});

test("renders repo stats", () => {
  const { getByTitle } = render(<Repos data={[mockData[0]]} />);

  const stats = getByTitle("Repo stats");

  expect(stats).toBeInTheDocument();
});

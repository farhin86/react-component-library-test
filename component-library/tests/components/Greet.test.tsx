import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Greet from "../../src/Components/Greet";
import React from "react";
import "@testing-library/jest-dom/vitest";

describe("Greet", () => {
  it("Should render Hello with the name when name is provided", () => {
    render(<Greet name="Farhin" />);
    // screen.debug();
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Farhin/i);
  });

  it("Should render Login button when name is not provided", () => {
    render(<Greet />);
    // screen.debug();
    const heading = screen.getByRole("button");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Login/i);
  });
});

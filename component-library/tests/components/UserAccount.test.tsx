import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import UserAccount from "../../src/Components/UserAccount";
import React from "react";
import "@testing-library/jest-dom/vitest";

describe("UserAccount", () => {
  it("Should show name of the user", () => {
    render(<UserAccount user={{ id: 2, name: "Farhin", isAdmin: true }} />);
    const name = screen.getByText("Farhin");
    expect(name).toBeInTheDocument();
  });

  it("Should show Edit button if user is Admin", () => {
    render(<UserAccount user={{ id: 2, name: "Farhin", isAdmin: true }} />);
    const editBtn = screen.getByRole("button");
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent(/Edit/i);
  });

  it("Should not show Edit button if user is not Admin", () => {
    render(<UserAccount user={{ id: 2, name: "Farhin", isAdmin: false }} />);

    const editBtn = screen.queryByRole("button");
    expect(editBtn).not.toBeInTheDocument();
    // expect(editBtn).toHaveTextContent(/Edit/i);
  });
});

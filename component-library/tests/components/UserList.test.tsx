import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import UserList from "../../src/Components/UserList";
import "@testing-library/jest-dom/vitest";
import { User } from "../../src/Components/UserAccount";

describe("UserList", () => {
  it("Should show No users available when user list is empty", () => {
    render(<UserList users={[]} />);
    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });

  it("Should return a list of users", () => {
    const users: User[] = [
      { id: 1, name: "Banu", isAdmin: false },
      { id: 2, name: "Farhin", isAdmin: true },
    ];
    render(<UserList users={users} />);
    users.map((user) => {
      const link = screen.getByRole("link", { name: user.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/users/${user.id}`);
    });
  });
});

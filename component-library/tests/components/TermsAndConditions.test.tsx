import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TermsAndConditions from "../../src/Components/TermsAndConditions";
import React from "react";
import "@testing-library/jest-dom/vitest";
import { userEvent } from "@testing-library/user-event";

describe("TermsAndConditions", () => {
  const renderComponent = () => {
    render(<TermsAndConditions />);
    return {
      header: screen.getByRole("heading"),
      checkbox: screen.getByRole("checkbox"),
      button: screen.getByRole("button"),
    };
  };
  it("should render the header and initial state", () => {
    const { header, checkbox, button } = renderComponent();
    expect(header).toHaveTextContent("Terms & Conditions");
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  it("should enable the button when user clicks", async () => {
    const { checkbox, button } = renderComponent();
    const user = userEvent.setup();
    await user.click(checkbox);
    expect(button).toBeEnabled();
  });
});

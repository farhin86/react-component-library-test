import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProductImageGallery from "../../src/Components/ProductImageGallery";
import "@testing-library/jest-dom/vitest";

describe("ProductImageGallery", () => {
  it("Should render null when receives empty image", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("Should render null when receives empty image", () => {
    const imgUrls = ["http:/img1", "http:/img2"];
    render(<ProductImageGallery imageUrls={imgUrls} />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);

    imgUrls.forEach((url, index) => {
      expect(images[index]).toHaveAttribute("src", url);
    });
  });
});

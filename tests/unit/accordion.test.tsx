import { render, screen, fireEvent } from "@testing-library/react";
import { expect, it } from "vitest";
import { Accordion } from "@/components/ui/accordion";
import { faq } from "@/constants/faq";
it("opens and closes a real FAQ using accessible button semantics", () => {
  render(<Accordion items={faq} />);
  const trigger = screen.getByRole("button", { name: faq[0].question });
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(trigger);
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByText(faq[0].answer)).toBeVisible();
  fireEvent.click(trigger);
  expect(trigger).toHaveAttribute("aria-expanded", "false");
});

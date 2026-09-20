import { test, expect } from "@playwright/test";
test("home page renders the foundation status", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Foundation online")).toBeVisible();
});

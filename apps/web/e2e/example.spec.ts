import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/SGIF/);
});

test('login flow', async ({ page }) => {
    await page.goto('/login');
    await page.click('text=Fund Admin');
    await page.click('button:has-text("Sign In")');
    await expect(page).toHaveURL(/\/app\/dashboard/);
    await expect(page.getByText('Dashboard')).toBeVisible();
});

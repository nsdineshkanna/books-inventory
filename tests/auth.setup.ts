import dotenv from 'dotenv';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { credentials } from '../helper/test-data';

dotenv.config();

test('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/login');

  await Promise.all([
    loginPage.login(credentials.username, credentials.password),
    expect(page.getByRole('heading', { name: 'Book List' })).toBeVisible(),
    expect(page).toHaveURL('/books')
  ]);

  const cookies = await page.context().cookies();
  console.log(cookies)

  // Saving storage state to be used later
  await page.context().storageState({ path: 'admin.json' });



});
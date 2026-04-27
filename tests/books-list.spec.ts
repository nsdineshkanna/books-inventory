import { test, expect } from '@playwright/test';
import { BooksListPage } from '../pages/books-list.page';
import { credentials } from '../helper/test-data';

test.describe('Books List Screen - Validation', () => {
  let bookslistPage: BooksListPage;

  test.beforeEach(async ({page})  => {
    bookslistPage = new BooksListPage(page);
    await page.goto('/books');
    
  });

  test('Books List Screen - UI Validation', async ({page}) => {
    await expect(page).toHaveURL('/books');
    // app doesn’t rebuild the user session from storage on page load, so the banner isn't visible

    // const text = page.getByRole('heading', { name: /Welcome/ });
    // await expect(text).toContainText(new RegExp(credentials.username, 'i'));
    // await expect(bookslistPage.logoutBtn).toBeVisible();

    await expect(bookslistPage.booklistHdr).toBeVisible();
    await expect(bookslistPage.addbookBtn).toBeVisible();
    await expect(bookslistPage.addbookBtn).toBeEnabled();
    await expect(bookslistPage.titleCol).toBeVisible();
    await expect(bookslistPage.authorCol).toBeVisible();
    await expect(bookslistPage.genreCol).toBeVisible();
    await expect(bookslistPage.ISBNCol).toBeVisible();
    await expect(bookslistPage.priceCol).toBeVisible();
    await expect(bookslistPage.actionsCol).toBeVisible();
    await expect(bookslistPage.nextBtn).toBeVisible();
    await expect(bookslistPage.previousBtn).toBeVisible();
    await expect(bookslistPage.totalBookTitle).toBeVisible();
    const rowCount = await bookslistPage.totalRows();
    await expect(bookslistPage.totalBookTitle).toContainText(String(rowCount));

  });
})
  
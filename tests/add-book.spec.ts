import { test, expect } from '@playwright/test';
import { BooksListPage } from '../pages/books-list.page';
import { AddBookPage } from '../pages/add-book.page';
import { generateBook } from '../helper/book-data';

test.describe('Add Book Screen - Validation', () => {
  let bookslistPage: BooksListPage;
  let addbookPage: AddBookPage;

  test.beforeEach(async ({page})  => {
    bookslistPage = new BooksListPage(page);
    addbookPage = new AddBookPage(page);
    await page.goto('/books');
    bookslistPage.addbookBtn.click();
    
  });

  test('Add Book Screen - UI Validation', async ({page}) => {
    await expect(page).toHaveURL('/add-book');
    await expect(addbookPage.titleLbl).toBeVisible();
    await expect(addbookPage.titleTxt).toBeVisible();
    await expect(addbookPage.authorLbl).toBeVisible();
    await expect(addbookPage.authorTxt).toBeVisible();
    await expect(addbookPage.genreLbl).toBeVisible();
    await expect(addbookPage.genreDrpDown).toBeVisible();
    await expect(addbookPage.isbnLbl).toBeVisible();
    await expect(addbookPage.isbnTxt).toBeVisible();
    await expect(addbookPage.publicationDateLbl).toBeVisible();
    await expect(addbookPage.publicationDate).toBeVisible();
    await expect(addbookPage.priceLbl).toBeVisible();
    await expect(addbookPage.priceTxt).toBeVisible();

  });

  test('Add New Book', async ({page}) => {
    await expect(page).toHaveURL('/add-book');
    const book = generateBook();
    await addbookPage.addBook(book);
    await addbookPage.addnewbookBtn.click();
    // Verify book title on the book catalog page
    await expect(page.getByText(book.title)).toBeVisible();

  });
})
  
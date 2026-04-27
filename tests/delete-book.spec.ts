import { test, expect } from '@playwright/test';
import { BooksListPage } from '../pages/books-list.page';
import { AddBookPage } from '../pages/add-book.page';
import { generateBook } from '../helper/book-data';

test.describe('Delete Book', () => {
  let bookslistPage: BooksListPage;
  let addbookPage: AddBookPage;
  let book;

  test.beforeEach(async ({page})  => {
    bookslistPage = new BooksListPage(page);
    addbookPage = new AddBookPage(page);

    await page.goto('/books');
    await bookslistPage.addbookBtn.click();

    // Create new books before edit
    book = generateBook();
    await addbookPage.addBook(book);
    await addbookPage.addnewbookBtn.click();
    // Verify book title on the book catalog page
    await expect(page.getByText(book.title)).toBeVisible();

  });

  test('Delete Book', async ({page}) => {
    // click on the delete link of the new book created
    await bookslistPage.clickDeleteBook(book.title);
    // Verify data is deleted data
    await expect(page.getByText(book.title)).not.toBeVisible();

    // no confirmation screen to confirm the delete
  });

})
  
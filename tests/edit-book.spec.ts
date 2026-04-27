import { test, expect } from '@playwright/test';
import { BooksListPage } from '../pages/books-list.page';
import { AddBookPage } from '../pages/add-book.page';
import { EditBookPage } from '../pages/edit-book.page';
import { generateBook } from '../helper/book-data';

test.describe('Edit Book Screen - Validation', () => {
  let bookslistPage: BooksListPage;
  let editbookPage: EditBookPage;
  let addbookPage: AddBookPage;
  let book;

  test.beforeEach(async ({page})  => {
    bookslistPage = new BooksListPage(page);
    editbookPage = new EditBookPage(page);
    addbookPage = new AddBookPage(page);

    await page.goto('/books');
    await bookslistPage.addbookBtn.click();

    // Create new books before edit
    book = generateBook();
    await addbookPage.addBook(book);
    await addbookPage.addnewbookBtn.click();
    // Verify book title on the book catalog page
    await expect(page.getByText(book.title)).toBeVisible();
    // click on the edit link of the new book created
    await bookslistPage.clickEditBook(book.title);
  });

  test('Edit Book Screen - UI Validation', async ({page}) => {
    await expect(editbookPage.titleLbl).toBeVisible();
    await expect(editbookPage.titleTxt).toBeVisible();
    await expect(editbookPage.authorLbl).toBeVisible();
    await expect(editbookPage.authorTxt).toBeVisible()
    await expect(editbookPage.genreLbl).toBeVisible();
    await expect(editbookPage.genreTxt).toBeVisible()
    await expect(editbookPage.isbnLbl).toBeVisible();
    await expect(editbookPage.isbnTxt).toBeVisible()
    await expect(editbookPage.publicationDateLbl).toBeVisible();
    await expect(editbookPage.publicationDate).toBeVisible()
    await expect(editbookPage.priceLbl).toBeVisible();
    await expect(editbookPage.priceTxt).toBeVisible();
  });

  test('Edit Book', async ({page}) => {
    const editbook = generateBook();
    await editbookPage.editBook(editbook);
    await editbookPage.savechangesBtn.click();

    // Verify updated data
    await expect(page.getByText(editbook.title)).toBeVisible();
  });

})
  
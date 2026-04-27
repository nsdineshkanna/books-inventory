import { Page, Locator } from '@playwright/test'
import { Book } from '../helper/book-data'

export class AddBookPage {
    readonly page: Page;
    readonly addnewbookHdr: Locator;
    readonly titleLbl: Locator;
    readonly titleTxt: Locator;
    readonly authorLbl: Locator;
    readonly authorTxt: Locator;
    readonly genreLbl: Locator;
    readonly genreDrpDown: Locator;
    readonly isbnLbl: Locator;
    readonly isbnTxt: Locator;
    readonly publicationDateLbl: Locator;
    readonly publicationDate: Locator;
    readonly priceLbl: Locator;
    readonly priceTxt: Locator;
    readonly addnewbookBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleLbl = page.getByText('Title:');
        this.titleTxt = page.getByRole('textbox', { name: 'Title:'});
        this.authorLbl = page.getByText('Author:');
        this.authorTxt = page.getByRole('textbox', { name: 'Author:'});
        this.genreLbl = page.getByText('Genre:');
        this.genreDrpDown = page.getByLabel('Genre:');
        this.isbnLbl = page.getByText('ISBN:');
        this.isbnTxt = page.getByRole('textbox', { name: 'ISBN:'});
        this.publicationDateLbl = page.getByText('Publication Date:');
        this.publicationDate = page.getByRole('textbox', { name: 'Publication Date:'});
        this.priceLbl = page.getByText('Price:');
        this.priceTxt = page.getByRole('textbox', { name: 'Price:'});
        this.addnewbookBtn = page.getByRole('button', { name: 'Submit Add New Book Form' })
    }

    async addBook(book: Book) {
        await this.titleTxt.fill(book.title);
        await this.authorTxt.fill(book.author);
        await this.genreDrpDown.selectOption({ label: book.genre });
        await this.isbnTxt.fill(book.isbn);
        await this.priceTxt.fill(book.price);
        await this.publicationDate.fill(book.publicationDate);
    }

}
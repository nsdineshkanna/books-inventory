import { Page, Locator } from '@playwright/test'
import { Book } from '../helper/book-data'

export class EditBookPage {
    readonly page: Page;
    readonly editbookHdr: Locator;
    readonly titleLbl: Locator;
    readonly titleTxt: Locator;
    readonly authorLbl: Locator;
    readonly authorTxt: Locator;
    readonly genreLbl: Locator;
    readonly genreTxt: Locator;
    readonly isbnLbl: Locator;
    readonly isbnTxt: Locator;
    readonly publicationDateLbl: Locator;
    readonly publicationDate: Locator;
    readonly priceLbl: Locator;
    readonly priceTxt: Locator;
    readonly savechangesBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleLbl = page.getByText('Title', { exact: true});
        this.titleTxt = page.locator('input[name="title"]');
        this.authorLbl = page.getByText('Author');
        this.authorTxt = page.locator('input[name="author"]');
        this.genreLbl = page.getByText('Genre');
        this.genreTxt = page.locator('input[name="genre"]');
        this.isbnLbl = page.getByText('ISBN');
        this.isbnTxt = page.locator('input[name="isbn"]');
        this.publicationDateLbl = page.getByText('Publication Date');
        this.publicationDate = page.locator('input[name="publicationDate"]');
        this.priceLbl = page.getByText('Price');
        this.priceTxt = page.locator('input[name="price"]');
        this.savechangesBtn = page.getByRole('button', { name: 'Save Changes' })
    }

    async editBook(book: Book) {
        await this.titleTxt.fill(book.title);
        await this.authorTxt.fill(book.author);
        await this.genreTxt.fill(book.genre);
        await this.isbnTxt.fill(book.isbn);
        await this.priceTxt.fill(book.price);
        await this.publicationDate.fill(book.publicationDate);
    }

}
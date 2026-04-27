import { Page, Locator, expect } from '@playwright/test'

export class BooksListPage {
    // UI Components
    readonly page: Page;
    readonly welcomeHdr: Locator;
    readonly booklistHdr: Locator;
    readonly addbookBtn: Locator;
    readonly titleCol: Locator;
    readonly authorCol: Locator;
    readonly genreCol: Locator;
    readonly ISBNCol: Locator;
    readonly publicationdateCol: Locator;
    readonly priceCol: Locator;
    readonly actionsCol: Locator;
    readonly previousBtn: Locator;
    readonly nextBtn: Locator;
    readonly totalBookTitle: Locator;
    readonly logoutBtn: Locator;
    readonly tableRows: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.welcomeHdr = page.getByRole('heading', { name: 'Welcome, Admin!' });
        this.booklistHdr = page.getByRole('heading', { name: 'Book List' });
        this.addbookBtn = page.getByRole('button', { name: 'Add Book' });
        this.titleCol = page.getByRole('columnheader', { name: 'Title' });
        this.authorCol = page.getByRole('columnheader', { name: 'Author' });
        this.genreCol = page.getByRole('columnheader', { name: 'Genre' });
        this.ISBNCol =page.getByRole('columnheader', { name: 'ISBN' });
        this.publicationdateCol = page.getByRole('columnheader', { name: 'Publication Date' });
        this.priceCol = page.getByRole('columnheader', { name: 'Price' });
        this.actionsCol = page.getByRole('columnheader', { name: 'Actions' });
        this.previousBtn = page.getByRole('button', { name: 'Previous' });
        this.nextBtn = page.getByRole('button', { name: 'Next' });
        this.totalBookTitle = page.getByText('Total Book Titles:');
        this.logoutBtn = page.getByRole('button', { name: 'Log Out' });
        this.tableRows = page.locator('table tbody tr');
    }
     
    async totalRows() {
            return await this.tableRows.count();
    }

    async clickEditBook(title: string) {
        const row = await this.page.locator('tr').filter({has: this.page.getByText(title)})
        await row.getByRole('button', { name: 'Edit'}).click();
    }

    async clickDeleteBook(title: string) {
        const row = await this.page.locator('tr').filter({has: this.page.getByText(title)})
        await row.getByRole('button', { name: 'Delete'}).click();
    }

}
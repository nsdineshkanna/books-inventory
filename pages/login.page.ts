import { Page, Locator, expect } from '@playwright/test'

export class LoginPage {
    // UI Components
    readonly page: Page;
    readonly loginHdr: Locator;
    readonly usernameLbl: Locator;
    readonly usernameTxt: Locator;
    readonly passwordLbl: Locator;
    readonly passwordTxt: Locator;
    readonly showPwdBtn: Locator;
    readonly loginBtn: Locator;

    // Error message components
    readonly errorHdr: Locator;
    readonly invaliderrorLbl: Locator;
    readonly blankunameerrorHdrLbl: Locator;
    readonly blankpassworderrorHdrLbl: Locator;
    readonly blankunameerrorLbl: Locator;
    readonly blankpassworderrorLbl: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginHdr =  page.getByRole('heading', { name: 'Login' });
        this.usernameLbl = page.getByLabel('Enter your username', { exact: true});
        this.usernameTxt = page.getByRole('textbox', { name: 'Enter your username' });
        this.passwordLbl = page.getByLabel('Enter your password', { exact: true });
        this.passwordTxt = page.getByRole('textbox', { name: 'Enter your password' });
        this.showPwdBtn = page.getByRole('button', { name: 'Show password'});
        this.loginBtn =page.getByRole('button', { name: 'Submit login' });

        this.errorHdr = page.getByText('There is a problem with your submission', { exact: true});
        this.invaliderrorLbl = page.getByRole('list').getByText('Invalid username or password. Please try again.', { exact: true });
        this.blankunameerrorHdrLbl = page.getByRole('list').getByText('Please enter your username');
        this.blankpassworderrorHdrLbl = page.getByRole('list').getByText('Please enter your password');
        this.blankunameerrorLbl =  page.locator('#username-error');
        this.blankpassworderrorLbl = page.locator('#password-error');
    }

    async login(username: string, password:string) {
        await this.usernameTxt.fill(username);
        await this.passwordTxt.fill(password);
        await this.loginBtn.click();
    }

}
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { BooksListPage } from '../pages/books-list.page';
import { credentials } from '../helper/test-data';

test.describe('Login screen validation', () => {
  let loginPage: LoginPage;
  let booklistPage: BooksListPage;

  test.beforeEach(async ({page})  => {
    loginPage = new LoginPage(page);
    await page.goto('/login');
  });

  test('Login screen UI validation', async ({page}) => {
    await expect(page).toHaveURL('/login');
    await expect(loginPage.loginHdr).toBeVisible();
    await expect(loginPage.usernameLbl).toBeVisible();
    await expect(loginPage.usernameTxt).toBeVisible();
    await expect(loginPage.passwordLbl).toBeVisible();
    await expect(loginPage.passwordTxt).toBeVisible();
    await expect(loginPage.showPwdBtn).toBeVisible();
    await expect(loginPage.loginBtn).toBeVisible();
    await expect(loginPage.loginBtn).toBeEnabled();
  });

  test('Successful Login', async ({page}) => {
    await Promise.all([
      loginPage.login(credentials.username, credentials.password),
      await expect(page.getByRole('heading', { name: 'Book List' })).toBeVisible(),
      await expect(page).toHaveURL('/books')
    ]);
  });

  test('Verify welcome banner after successful login', async ({page}) => {
    await Promise.all([
      loginPage.login(credentials.username, credentials.password),
      await expect(page.getByRole('heading', { name: 'Book List' })).toBeVisible(),
      await expect(page).toHaveURL('/books')
    ]);

    const text = page.getByRole('heading', { name: /Welcome/ });
    await expect(text).toContainText(new RegExp(credentials.username, 'i'));
  });

  test('Invalid Username', async ({page}) => {
    loginPage.login('test', credentials.password)
    await expect(page).toHaveURL('/login')
    await expect(loginPage.errorHdr).toBeVisible();
    await expect(loginPage.invaliderrorLbl).toBeVisible();
  });

  test('Invalid Password', async ({page}) => {
    loginPage.login(credentials.username, 'test')
    await expect(page).toHaveURL('/login')
    await expect(loginPage.errorHdr).toBeVisible();
    await expect(loginPage.invaliderrorLbl).toBeVisible();
  });

  test('Invalid Username and Password', async ({page}) => {
    loginPage.login('test', 'test')
    await expect(page).toHaveURL('/login')
    await expect(loginPage.errorHdr).toBeVisible();
    await expect(loginPage.invaliderrorLbl).toBeVisible();
  });

  test('Blank Username', async ({page}) => {
    loginPage.login('', 'test')
    await expect(page).toHaveURL('/login')
    await expect(loginPage.errorHdr).toBeVisible();
    await expect(loginPage.invaliderrorLbl).not.toBeVisible();
    await expect(loginPage.blankunameerrorHdrLbl).toBeVisible();
    await expect(loginPage.blankpassworderrorHdrLbl).not.toBeVisible();
    await expect(loginPage.blankunameerrorLbl).toBeVisible();
    await expect(loginPage.blankpassworderrorLbl).not.toBeVisible();
  });

  test('Blank Password', async ({page}) => {
    loginPage.login('test', '')
    await expect(page).toHaveURL('/login')
    await expect(loginPage.errorHdr).toBeVisible();
    await expect(loginPage.invaliderrorLbl).not.toBeVisible();
    await expect(loginPage.blankunameerrorHdrLbl).not.toBeVisible();
    await expect(loginPage.blankpassworderrorHdrLbl).toBeVisible();
    await expect(loginPage.blankunameerrorLbl).not.toBeVisible();
    await expect(loginPage.blankpassworderrorLbl).toBeVisible();
  });

  test('Blank Username and Password', async ({page}) => {
    loginPage.login('', '')
    await expect(page).toHaveURL('/login')
    await expect(loginPage.errorHdr).toBeVisible();
    await expect(loginPage.invaliderrorLbl).not.toBeVisible();
    await expect(loginPage.blankunameerrorHdrLbl).toBeVisible();
    await expect(loginPage.blankpassworderrorHdrLbl).toBeVisible();
    await expect(loginPage.blankunameerrorLbl).toBeVisible();
    await expect(loginPage.blankpassworderrorLbl).toBeVisible();
  });

  //  @bug - logout doesn't function
  test('Logout', async({page}) => {
    booklistPage = new BooksListPage(page);
    await Promise.all([
      loginPage.login(credentials.username, credentials.password),
      await expect(page.getByRole('heading', { name: 'Book List' })).toBeVisible(),
      await expect(page).toHaveURL('/books')
    ]);

    await booklistPage.logoutBtn.click();
    await expect(page).toHaveURL('/login')

  })
})

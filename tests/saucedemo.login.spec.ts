import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/saucedemo.login.page';

test.describe('Feature: Đăng nhập (Login)', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Đăng nhập thành công với tài khoản chuẩn', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('Đăng nhập thất bại khi sai mật khẩu', async () => {
    await loginPage.login('standard_user', 'wrong_pass');
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('Đăng nhập thất bại khi tài khoản bị khóa', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out.');
  });
});
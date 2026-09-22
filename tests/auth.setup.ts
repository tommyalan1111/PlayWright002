import { test as setup, expect } from '@playwright/test';
// ✅ Đảm bảo trỏ đúng vào file saucedemo.login.page
import { LoginPage } from '../pages/saucedemo.login.page';

const authFile = 'playwright/.auth/user.json';

setup('Thực hiện đăng nhập và lưu Storage State', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Mở trang login và điền thông tin
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // 2. Kiểm tra đã chuyển hướng vào trang inventory thành công
  await expect(page).toHaveURL(/.*inventory.html/);

  // 3. Ghi file storageState
  await page.context().storageState({ path: authFile });
});
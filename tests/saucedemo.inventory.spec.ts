// tests/inventory.spec.ts
import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/saucedemo.inventory.page';

test.describe('Feature: Trang sản phẩm (Inventory)', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);

    // Mở trực tiếp trang Inventory (Playwright đã tự mang theo Session)
    await page.goto('https://www.saucedemo.com/inventory.html');
  });

  test('Hiển thị đủ 6 sản phẩm mặc định', async () => {
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
  });

  test('Thêm sản phẩm vào giỏ hàng thành công', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
  });
});
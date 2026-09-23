import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/saucedemo.inventory.page';
import { CartPage } from '../pages/saucedemo.cart.page';

test.describe('Feature: Giỏ hàng (Cart)', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    // Mở trang Inventory (sử dụng Session State đã lưu sẵn ở auth.setup.ts)
    await inventoryPage.goto();
  });

  test('Hiển thị chính xác sản phẩm đã thêm vào giỏ hàng', async ({ page }) => {
    // 1. Thêm 1 sản phẩm vào giỏ
    await inventoryPage.addToCart('sauce-labs-backpack');

    // 2. Click icon giỏ hàng để chuyển sang trang Cart
    await page.locator('.shopping_cart_link').click();

    // 3. Kiểm tra URL và sản phẩm có trong danh sách
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    const itemNames = await cartPage.getItemNames();
    expect(itemNames).toContain('Sauce Labs Backpack');
  });

  test('Xóa sản phẩm thành công ngay tại trang Cart', async ({ page }) => {
    // 1. Thêm sản phẩm và đi tới trang Cart
    await inventoryPage.addToCart('sauce-labs-backpack');
    await page.locator('.shopping_cart_link').click();

    // 2. Xóa sản phẩm khỏi giỏ
    await cartPage.removeItemBySlug('remove-sauce-labs-backpack');

    // 3. Kiểm tra giỏ hàng rỗng
    const items = await cartPage.cartItems.count();
    expect(items).toBe(0);
  });

  test('Chuyển hướng về trang sản phẩm khi nhấn Continue Shopping', async ({ page }) => {
    await cartPage.goto();
    await cartPage.clickContinueShopping();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });
});
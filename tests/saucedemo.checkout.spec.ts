import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/saucedemo.inventory.page';
import { CartPage } from '../pages/saucedemo.cart.page';
import { CheckoutPage } from '../pages/saucedemo.checkout.page';

test.describe('Feature: Thanh toán (Checkout)', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // 1. Mở trang sản phẩm & thêm 1 món vào giỏ hàng
    await inventoryPage.goto();
    await inventoryPage.addToCart('sauce-labs-backpack');

    // 2. Chuyển sang giỏ hàng và bấm Checkout
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();
  });

  test('Thanh toán thành công trọn vẹn (Happy Path)', async ({ page }) => {
    // Điền thông tin người nhận
    await checkoutPage.fillInformation('Phuc', 'Vu', '700000');
    
    // Kiểm tra đã sang trang Overview (Step Two)
    await expect(page).toHaveURL(/.*checkout-step-two.html/);

    // Xác nhận đặt hàng
    await checkoutPage.finishCheckout();

    // Kiểm tra thông báo hoàn tất thành công
    await expect(page).toHaveURL(/.*checkout-complete.html/);
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('Hiển thị thông báo lỗi khi để trống thông tin First Name', async () => {
    await checkoutPage.fillInformation('', 'Vu', '700000');
    await expect(checkoutPage.errorMessage).toContainText('Error: First Name is required');
  });
});
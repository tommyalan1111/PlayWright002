import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartTitle: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Tiêu đề trang Cart
    this.cartTitle = page.locator('.title');
    
    // Danh sách các sản phẩm đang nằm trong giỏ hàng
    this.cartItems = page.locator('.cart_item');
    
    // Nút Checkout
    this.checkoutButton = page.locator('[data-test="checkout"]');
    
    // Nút Continue Shopping (Tiếp tục mua hàng)
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  // Điều hướng trực tiếp đến trang Cart
  async goto() {
    await this.page.goto('https://www.saucedemo.com/cart.html');
  }

  // Lấy danh sách tên tất cả các sản phẩm đang có trong giỏ hàng
  async getItemNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  // Xóa một sản phẩm cụ thể theo data-test slug (ví dụ: 'remove-sauce-labs-backpack')
  async removeItemBySlug(productSlug: string) {
    await this.page.locator(`[data-test="${productSlug}"]`).click();
  }

  // Nhấn nút Checkout để chuyển sang bước thanh toán
  async clickCheckout() {
    await this.checkoutButton.click();
  }

  // Nhấn nút Continue Shopping để quay lại trang Inventory
  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }
}
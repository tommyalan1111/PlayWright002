import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
  }

  /** Thêm một sản phẩm vào giỏ hàng theo tên */
  async addItemToCart(itemName: string) {
    // Chuyển tên sản phẩm thành data-test id (ví dụ: "Sauce Labs Backpack" -> "add-to-cart-sauce-labs-backpack")
    const formattedName = itemName.toLowerCase().replace(/ /g, '-');
    const addToCartBtn = this.page.locator(`[data-test="add-to-cart-${formattedName}"]`);
    await addToCartBtn.click();
  }

// Bổ sung thêm phương thức goto này vào
  async goto() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

// Thêm phương thức addToCart linh hoạt theo tên nút (data-test slug)
  async addToCart(productSlug: string) {
    // Tìm nút add-to-cart theo data-test, ví dụ: 'add-to-cart-sauce-labs-backpack'
    await this.page.locator(`[data-test="add-to-cart-${productSlug}"]`).click();
  }

}
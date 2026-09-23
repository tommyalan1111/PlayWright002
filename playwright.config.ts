// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,

  // Bổ sung cấu hình Reporter xuất ra HTML và luôn mở trên trình duyệt
  reporter: [['html', { open: 'always' }]],

  projects: [
    // 1. Setup Project: Chạy đăng nhập trước và tạo file session
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // 2. Chromium Project: Sử dụng session đã lưu ở bước trên
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Nạp file storageState đã lưu
        storageState: 'playwright/.auth/user.json',
      },
      // Đảm bảo bước setup hoàn tất thành công mới chạy project này
      dependencies: ['setup'],
    },


    
  ],
});
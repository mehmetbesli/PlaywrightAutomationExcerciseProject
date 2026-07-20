import { test as baseTest } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Extend the base test with a custom page fixture
export const test = baseTest.extend<{}>({
  page: async ({ page }, use, testInfo) => {
    // Run the actual test
    await use(page);

    // This block executes after the test body finishes
    if (testInfo.status !== testInfo.expectedStatus) {
      const date = new Date();
      const pad = (n: number) => n.toString().padStart(2, '0');
      
      // Format: YYYY-MM-DD_HH-mm-ss (includes seconds)
      const timestamp = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}_${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}`;
      const targetDir = 'Reports/screenshotsAndVideo';

      // Ensure directory exists
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // 1. Capture manual screenshot before closing context
      const screenshotName = `screenshots_${timestamp}.png`;
      const screenshotPath = path.join(targetDir, screenshotName);
      try {
        await page.screenshot({ path: screenshotPath });
        // Attach it to the testInfo so it appears in the HTML report
        await testInfo.attach('custom-screenshot', {
          path: screenshotPath,
          contentType: 'image/png',
        });
      } catch (err) {
        console.error(`Failed to capture custom screenshot: ${err.message}`);
      }

      // 2. Get video reference
      const video = page.video();

      // 3. Manually close context to release video file lock and write the video
      try {
        await page.context().close();
      } catch (err) {
        console.error(`Failed to close context: ${err.message}`);
      }

      // 4. Save the video with our custom name and path
      if (video) {
        const videoName = `video_${timestamp}.webm`;
        const videoPath = path.join(targetDir, videoName);
        try {
          await video.saveAs(videoPath);
          // Attach it to the testInfo so it appears in the HTML report
          await testInfo.attach('custom-video', {
            path: videoPath,
            contentType: 'video/webm',
          });
        } catch (err) {
          console.error(`Failed to save custom video: ${err.message}`);
        }
      }
    }
  }
});

export { expect } from '@playwright/test';

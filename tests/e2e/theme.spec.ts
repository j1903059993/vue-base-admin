import { expect, test } from '@playwright/test'

test('theme preference survives a reload', async ({ page }) => {
  await page.goto('/login')
  await page.getByRole('button', { name: '登录' }).click()
  await page.getByRole('button', { name: '界面设置' }).click()
  await page.getByText('深色', { exact: true }).click()

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})

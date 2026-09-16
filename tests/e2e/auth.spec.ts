import { expect, test } from '@playwright/test'

test('admin can sign in and reach the dashboard', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('用户名').fill('admin')
  await page.getByLabel('密码').fill('admin123')
  await page.getByRole('button', { name: /登录/ }).click()

  await expect(page).toHaveURL(/\/dashboard$/)
  await expect(page.getByRole('heading', { name: '工作台', level: 1 })).toBeVisible()
  await expect(page.getByText('18,420')).toBeVisible()
})

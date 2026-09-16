import { expect, test } from '@playwright/test'

test('admin can create a user in the demonstration table', async ({ page }) => {
  await page.goto('/login')
  await page.getByRole('button', { name: '登录' }).click()
  await page.getByText('用户管理', { exact: true }).click()
  await page.getByRole('button', { name: '新建用户' }).click()

  const dialog = page.getByRole('dialog')
  await dialog.getByLabel('姓名').fill('测试用户')
  await dialog.getByLabel('邮箱').fill('demo@example.com')
  await dialog.getByRole('button', { name: /保\s*存/ }).click()

  await expect(page.getByText('测试用户')).toBeVisible()
  await expect(page.getByText('demo@example.com')).toBeVisible()
})

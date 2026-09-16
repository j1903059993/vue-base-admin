import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useSettingsStore } from './settings'

describe('settings store', () => {
  beforeEach(() => { localStorage.clear(); setActivePinia(createPinia()) })

  it('applies and persists the selected theme', () => {
    const settings = useSettingsStore()
    settings.setThemeMode('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem('vba-theme')).toBe('"dark"')
  })
})

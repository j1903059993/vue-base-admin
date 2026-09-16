import { describe, expect, it } from 'vitest'
import { hasPermission } from './permission'

describe('hasPermission', () => {
  it('accepts exact, scoped wildcard, and global wildcard grants', () => {
    expect(hasPermission(['system:user:list'], 'system:user:list')).toBe(true)
    expect(hasPermission(['system:*'], 'system:user:create')).toBe(true)
    expect(hasPermission(['*'], 'system:user:delete')).toBe(true)
  })

  it('rejects unrelated permissions', () => {
    expect(hasPermission(['system:user:list'], 'system:user:delete')).toBe(false)
  })
})

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { sanitize, compare } = require('../src/compare');

// ── 淨化函式 ──────────────────────────────────────────────
describe('sanitize()', () => {
  test('移除前後空白', () => {
    assert.equal(sanitize('  12345  '), '12345');
  });

  test('移除中間空白與換行', () => {
    assert.equal(sanitize('12 34\n5'), '12345');
  });

  test('移除 ASCII 控制字元（如 \\x1D 群組分隔符號）', () => {
    assert.equal(sanitize('123\x1D456'), '123456');
  });

  test('移除多個不同控制字元', () => {
    assert.equal(sanitize('\x00ABC\x1F\x7F'), 'ABC');
  });

  test('正常條碼字串不受影響', () => {
    assert.equal(sanitize('ABC-1234567'), 'ABC-1234567');
  });
});

// ── 完全比對 ──────────────────────────────────────────────
describe('compare() — exact（完全比對）', () => {
  test('相同條碼 → 符合', () => {
    assert.equal(compare('12345', '12345', 'exact'), true);
  });

  test('不同條碼 → 不符合', () => {
    assert.equal(compare('12345', '99999', 'exact'), false);
  });

  test('大小寫不同 → 不符合', () => {
    assert.equal(compare('abc', 'ABC', 'exact'), false);
  });

  test('一方含前後空白（淨化後相同）→ 符合', () => {
    assert.equal(compare('  12345  ', '12345', 'exact'), true);
  });

  test('含控制字元（淨化後相同）→ 符合', () => {
    assert.equal(compare('123\x1D45', '12345', 'exact'), true);
  });

  test('空字串比對空字串 → 符合', () => {
    assert.equal(compare('', '', 'exact'), true);
  });
});

// ── 包含比對 ──────────────────────────────────────────────
describe('compare() — partial（包含比對）', () => {
  test('短字串被長字串包含 → 符合', () => {
    assert.equal(compare('123', '00123456', 'partial'), true);
  });

  test('長字串包含短字串（參數順序反轉）→ 符合', () => {
    assert.equal(compare('00123456', '123', 'partial'), true);
  });

  test('完全相同字串 → 符合', () => {
    assert.equal(compare('12345', '12345', 'partial'), true);
  });

  test('短字串不在長字串內 → 不符合', () => {
    assert.equal(compare('999', '00123456', 'partial'), false);
  });

  test('含空白（淨化後包含）→ 符合', () => {
    assert.equal(compare(' 123 ', '00123456', 'partial'), true);
  });

  test('含控制字元（淨化後包含）→ 符合', () => {
    assert.equal(compare('123\x1D', '0012345', 'partial'), true);
  });

  test('空字串 → 任意字串都包含它 → 符合', () => {
    assert.equal(compare('', '12345', 'partial'), true);
  });
});

// ── 邊界情況 ──────────────────────────────────────────────
describe('compare() — 邊界情況', () => {
  test('未知規則 → 回傳 false', () => {
    assert.equal(compare('123', '123', 'unknown'), false);
  });

  test('兩者皆為空（exact）→ 符合', () => {
    assert.equal(compare('', '', 'exact'), true);
  });

  test('Unicode 字元（exact）→ 符合', () => {
    assert.equal(compare('條碼ABC', '條碼ABC', 'exact'), true);
  });
});

/**
 * 條碼字串淨化：
 * 1. 移除所有空白與換行（解決複製貼上造成的斷行或前後空白）
 * 2. 移除 ASCII 不可見控制字元（解決 2D 條碼帶有的 \x1D 等群組分隔符號）
 */
function sanitize(str) {
  return str.replace(/\s+/g, '').replace(/[\x00-\x1F\x7F]/g, '');
}

/**
 * 比對兩個條碼字串
 * @param {string} valA
 * @param {string} valB
 * @param {'exact'|'partial'} rule
 * @returns {boolean}
 */
function compare(valA, valB, rule) {
  const cleanA = sanitize(valA);
  const cleanB = sanitize(valB);

  if (rule === 'exact') {
    return cleanA === cleanB;
  }

  if (rule === 'partial') {
    if (cleanA.length <= cleanB.length) {
      return cleanB.includes(cleanA);
    }
    return cleanA.includes(cleanB);
  }

  return false;
}

module.exports = { sanitize, compare };

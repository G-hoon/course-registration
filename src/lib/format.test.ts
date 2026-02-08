import { describe, it, expect } from 'vitest';
import { formatPhone, formatNumber, parseNumber } from './format';

describe('formatPhone', () => {
  it('숫자만 추출하여 포맷팅한다', () => {
    expect(formatPhone('01012345678')).toBe('010-1234-5678');
  });

  it('3자리 이하는 그대로 반환한다', () => {
    expect(formatPhone('010')).toBe('010');
    expect(formatPhone('01')).toBe('01');
  });

  it('4~7자리는 앞 3자리-나머지 형태로 반환한다', () => {
    expect(formatPhone('0101')).toBe('010-1');
    expect(formatPhone('0101234')).toBe('010-1234');
  });

  it('8자리 이상은 전체 포맷을 적용한다', () => {
    expect(formatPhone('01012345')).toBe('010-1234-5');
  });

  it('11자리를 초과하면 잘라낸다', () => {
    expect(formatPhone('010123456789999')).toBe('010-1234-5678');
  });

  it('숫자가 아닌 문자는 제거한다', () => {
    expect(formatPhone('010-abcd-5678')).toBe('010-5678');
  });

  it('빈 문자열이면 빈 문자열을 반환한다', () => {
    expect(formatPhone('')).toBe('');
  });
});

describe('formatNumber', () => {
  it('숫자에 콤마를 추가한다', () => {
    expect(formatNumber('1000')).toBe('1,000');
    expect(formatNumber('1000000')).toBe('1,000,000');
  });

  it('이미 콤마가 있으면 제거 후 다시 포맷팅한다', () => {
    expect(formatNumber('1,000')).toBe('1,000');
  });

  it('숫자가 아닌 문자는 제거한다', () => {
    expect(formatNumber('abc123')).toBe('123');
  });

  it('빈 문자열이면 빈 문자열을 반환한다', () => {
    expect(formatNumber('')).toBe('');
  });

  it('한 자리 숫자는 그대로 반환한다', () => {
    expect(formatNumber('5')).toBe('5');
  });
});

describe('parseNumber', () => {
  it('콤마를 제거하고 숫자로 변환한다', () => {
    expect(parseNumber('1,000')).toBe(1000);
    expect(parseNumber('1,000,000')).toBe(1000000);
  });

  it('콤마 없는 문자열도 변환한다', () => {
    expect(parseNumber('500')).toBe(500);
  });

  it('0을 변환한다', () => {
    expect(parseNumber('0')).toBe(0);
  });
});

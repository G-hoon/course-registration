import { describe, it, expect } from 'vitest';
import { validatePassword, validateEmail, validatePhone } from './validate';

describe('validatePassword', () => {
  it('길이가 6자 미만이면 에러를 반환한다', () => {
    expect(validatePassword('ab1')).toBe(
      '비밀번호는 6자 이상 10자 이하로 입력해주세요.'
    );
  });

  it('길이가 10자 초과이면 에러를 반환한다', () => {
    expect(validatePassword('abcdef12345')).toBe(
      '비밀번호는 6자 이상 10자 이하로 입력해주세요.'
    );
  });

  it('한 가지 유형만 사용하면 에러를 반환한다', () => {
    expect(validatePassword('abcdef')).toBe(
      '영문 소문자, 대문자, 숫자 중 최소 두 가지를 조합해주세요.'
    );
    expect(validatePassword('123456')).toBe(
      '영문 소문자, 대문자, 숫자 중 최소 두 가지를 조합해주세요.'
    );
    expect(validatePassword('ABCDEF')).toBe(
      '영문 소문자, 대문자, 숫자 중 최소 두 가지를 조합해주세요.'
    );
  });

  it('소문자 + 숫자 조합이면 통과한다', () => {
    expect(validatePassword('abc123')).toBeNull();
  });

  it('대문자 + 숫자 조합이면 통과한다', () => {
    expect(validatePassword('ABC123')).toBeNull();
  });

  it('소문자 + 대문자 조합이면 통과한다', () => {
    expect(validatePassword('abcDEF')).toBeNull();
  });

  it('세 가지 유형 모두 사용하면 통과한다', () => {
    expect(validatePassword('aB3456')).toBeNull();
  });

  it('경계값 6자에서 통과한다', () => {
    expect(validatePassword('abc123')).toBeNull();
  });

  it('경계값 10자에서 통과한다', () => {
    expect(validatePassword('abcd123456')).toBeNull();
  });
});

describe('validateEmail', () => {
  it('빈 문자열이면 에러를 반환한다', () => {
    expect(validateEmail('')).toBe('이메일을 입력해주세요.');
  });

  it('올바른 이메일 형식이면 통과한다', () => {
    expect(validateEmail('user@example.com')).toBeNull();
    expect(validateEmail('test@weolbu.com')).toBeNull();
  });

  it('@가 없으면 에러를 반환한다', () => {
    expect(validateEmail('userexample.com')).toBe(
      '올바른 이메일 형식이 아닙니다.'
    );
  });

  it('도메인이 없으면 에러를 반환한다', () => {
    expect(validateEmail('user@')).toBe('올바른 이메일 형식이 아닙니다.');
  });

  it('공백이 포함되면 에러를 반환한다', () => {
    expect(validateEmail('user @example.com')).toBe(
      '올바른 이메일 형식이 아닙니다.'
    );
  });
});

describe('validatePhone', () => {
  it('빈 문자열이면 에러를 반환한다', () => {
    expect(validatePhone('')).toBe('휴대폰 번호를 입력해주세요.');
  });

  it('올바른 형식이면 통과한다', () => {
    expect(validatePhone('010-1234-5678')).toBeNull();
  });

  it('하이픈이 없으면 에러를 반환한다', () => {
    expect(validatePhone('01012345678')).toBe(
      '올바른 휴대폰 번호 형식이 아닙니다. (예: 010-1234-5678)'
    );
  });

  it('010으로 시작하지 않으면 에러를 반환한다', () => {
    expect(validatePhone('011-1234-5678')).toBe(
      '올바른 휴대폰 번호 형식이 아닙니다. (예: 010-1234-5678)'
    );
  });

  it('자릿수가 맞지 않으면 에러를 반환한다', () => {
    expect(validatePhone('010-123-5678')).toBe(
      '올바른 휴대폰 번호 형식이 아닙니다. (예: 010-1234-5678)'
    );
  });
});

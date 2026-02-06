export function validatePassword(password: string): string | null {
  if (password.length < 6 || password.length > 10) {
    return '비밀번호는 6자 이상 10자 이하로 입력해주세요.';
  }

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const typeCount = [hasLower, hasUpper, hasNumber].filter(Boolean).length;

  if (typeCount < 2) {
    return '영문 소문자, 대문자, 숫자 중 최소 두 가지를 조합해주세요.';
  }

  return null;
}

export function validateEmail(email: string): string | null {
  if (!email) return '이메일을 입력해주세요.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return '올바른 이메일 형식이 아닙니다.';
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone) return '휴대폰 번호를 입력해주세요.';
  const phoneRegex = /^010-\d{4}-\d{4}$/;
  if (!phoneRegex.test(phone)) return '올바른 휴대폰 번호 형식이 아닙니다. (예: 010-1234-5678)';
  return null;
}

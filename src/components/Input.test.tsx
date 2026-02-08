import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  it('label을 렌더링한다', () => {
    render(<Input id="test" label="이름" />);
    expect(screen.getByLabelText('이름')).toBeInTheDocument();
  });

  it('placeholder를 표시한다', () => {
    render(<Input id="test" label="이름" placeholder="홍길동" />);
    expect(screen.getByPlaceholderText('홍길동')).toBeInTheDocument();
  });

  it('에러 메시지를 표시한다', () => {
    render(<Input id="test" label="이름" error="이름을 입력해주세요." />);
    expect(screen.getByText('이름을 입력해주세요.')).toBeInTheDocument();
  });

  it('에러가 없으면 에러 메시지를 표시하지 않는다', () => {
    render(<Input id="test" label="이름" />);
    expect(
      screen.queryByText('이름을 입력해주세요.')
    ).not.toBeInTheDocument();
  });

  it('required일 때 * 표시를 렌더링한다', () => {
    render(<Input id="test" label="이름" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('required가 아닐 때 * 표시를 렌더링하지 않는다', () => {
    render(<Input id="test" label="이름" />);
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('suffix를 표시한다', () => {
    render(<Input id="test" label="가격" suffix="원" />);
    expect(screen.getByText('원')).toBeInTheDocument();
  });

  it('에러 상태일 때 input에 에러 스타일이 적용된다', () => {
    render(<Input id="test" label="이름" error="에러" />);
    const input = screen.getByLabelText('이름');
    expect(input.className).toContain('border-red-500');
  });
});

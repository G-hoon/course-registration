import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('children을 렌더링한다', () => {
    render(<Button>가입하기</Button>);
    expect(screen.getByRole('button', { name: '가입하기' })).toBeInTheDocument();
  });

  it('loading 상태에서 "처리 중..."을 표시한다', () => {
    render(<Button loading>가입하기</Button>);
    expect(screen.getByRole('button', { name: '처리 중...' })).toBeInTheDocument();
  });

  it('loading 상태에서 버튼이 비활성화된다', () => {
    render(<Button loading>가입하기</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('disabled 상태에서 버튼이 비활성화된다', () => {
    render(<Button disabled>가입하기</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('클릭 이벤트가 동작한다', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>가입하기</Button>);

    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('loading 상태에서 클릭이 동작하지 않는다', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button loading onClick={onClick}>가입하기</Button>);

    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});

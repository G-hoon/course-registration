import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Radio from './Radio';

describe('Radio', () => {
  it('label 텍스트를 렌더링한다', () => {
    render(<Radio label="수강생" value="STUDENT" />);
    expect(screen.getByText('수강생')).toBeInTheDocument();
  });

  it('radio input을 렌더링한다', () => {
    render(<Radio label="수강생" value="STUDENT" />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('value가 올바르게 설정된다', () => {
    render(<Radio label="수강생" value="STUDENT" />);
    expect(screen.getByRole('radio')).toHaveAttribute('value', 'STUDENT');
  });

  it('클릭하면 선택된다', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Radio label="수강생" value="STUDENT" onChange={onChange} />);

    await user.click(screen.getByRole('radio'));
    expect(onChange).toHaveBeenCalled();
  });

  it('name이 같은 Radio는 그룹으로 동작한다', () => {
    render(
      <>
        <Radio label="수강생" value="STUDENT" name="role" />
        <Radio label="강사" value="INSTRUCTOR" name="role" />
      </>
    );
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(2);
    expect(radios[0]).toHaveAttribute('name', 'role');
    expect(radios[1]).toHaveAttribute('name', 'role');
  });
});

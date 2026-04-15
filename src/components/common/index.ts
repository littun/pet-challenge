import styled from 'styled-components';

export const Button = styled.button<{ $variant?: 'primary' | 'secondary' | 'ghost' | 'danger', $size?: 'sm' | 'md' | 'lg' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: ${props => props.$size === 'sm' ? '0.25rem 0.5rem' : props.$size === 'lg' ? '0.75rem 1.5rem' : '0.5rem 1rem'};
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: ${props => props.$size === 'sm' ? '0.875rem' : '1rem'};
  
  ${props => {
    switch(props.$variant) {
      case 'primary':
        return `
          background-color: ${props.theme.colors.primary};
          color: white;
          &:hover { background-color: ${props.theme.colors.primaryHover}; }
        `;
      case 'secondary':
        return `
          background-color: ${props.theme.colors.surface};
          color: ${props.theme.colors.text};
          border: 1px solid ${props.theme.colors.border};
          &:hover { background-color: ${props.theme.colors.border}; }
        `;
      case 'danger':
        return `
          background-color: ${props.theme.colors.error}22;
          color: ${props.theme.colors.error};
          border: 1px solid ${props.theme.colors.error}44;
          &:hover { background-color: ${props.theme.colors.error}44; }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: ${props.theme.colors.textMuted};
          &:hover { color: ${props.theme.colors.text}; background-color: ${props.theme.colors.surface}; }
        `;
      default:
        return `
          background-color: ${props.theme.colors.surface};
          color: ${props.theme.colors.text};
          &:hover { background-color: ${props.theme.colors.border}; }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}44;
  }

  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
`;

export const Container = styled.div`
  max-width: ${props => props.theme.breakpoints.desktop};
  margin: 0 auto;
  padding: 0 1rem;
`;

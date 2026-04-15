import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { PawPrint, Info, Home } from 'lucide-react';
import { Container } from './common';

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: 1rem 0;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 800;
  color: ${props => props.theme.colors.text};
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  color: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.textMuted};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s;

  &:hover {
    color: ${props => props.theme.colors.text};
  }
`;

export const Navbar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <Nav>
      <Container>
        <NavContent>
          <Logo to="/">
            <PawPrint size={28} />
            <span>PetMatch</span>
          </Logo>
          
          <NavLinks>
            <NavLink to="/" $active={pathname === '/'}>
              <Home size={18} />
              Browse
            </NavLink>
            <NavLink to="/about" $active={pathname === '/about'}>
              <Info size={18} />
              About
            </NavLink>
          </NavLinks>
        </NavContent>
      </Container>
    </Nav>
  );
};

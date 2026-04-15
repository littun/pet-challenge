import React from 'react';
import styled from 'styled-components';
import { Container } from '../components/common';
import { User, Globe, Mail } from 'lucide-react';

const AboutWrapper = styled.div`
  padding: 8rem 0;
  max-width: 800px;
  margin: 0 auto;
`;

const Bio = styled.div`
  background: ${props => props.theme.colors.surface};
  padding: 3rem;
  border-radius: 2rem;
  border: 1px solid ${props => props.theme.colors.border};
  text-align: center;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 800;
  color: white;
`;

const Name = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Role = styled.p`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
`;

const Text = styled.p`
  color: ${props => props.theme.colors.textMuted};
  font-size: 1.125rem;
  line-height: 1.8;
  margin-bottom: 3rem;
`;

const Socials = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

const SocialLink = styled.a`
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: ${props => props.theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.text};
  transition: all 0.2s;
  border: 1px solid ${props => props.theme.colors.border};

  &:hover {
    color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const About: React.FC = () => {
  return (
    <Container>
      <AboutWrapper>
        <Bio>
          <Avatar>SK</Avatar>
          <Name>Sandeep Kumar Sahoo</Name>
          <Role>Full Stack Developer</Role>
          <Text>
            Passionately building digital experiences that blend aesthetic beauty with robust performance. 
            This project showcases a clean, responsive, and interactive pet gallery built with React, 
            TypeScript, and Styled Components. I focus on creating intuitive user journeys and 
            maintaining high code quality through modern best practices.
          </Text>
          <Socials>
            <SocialLink href="#"><User size={20} /></SocialLink>
            <SocialLink href="#"><Globe size={20} /></SocialLink>
            <SocialLink href="#"><Mail size={20} /></SocialLink>
          </Socials>
        </Bio>
      </AboutWrapper>
    </Container>
  );
};

export default About;

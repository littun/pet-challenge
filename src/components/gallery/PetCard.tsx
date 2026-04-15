import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';
import type { Pet } from '../../types/pet';
import { useNavigate } from 'react-router-dom';

const Card = styled(motion.div)<{ $selected: boolean }>`
  background: ${props => props.theme.colors.surface};
  border-radius: 1rem;
  overflow: hidden;
  border: 2px solid ${props => props.$selected ? props.theme.colors.primary : 'transparent'};
  position: relative;
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const ImageContainer = styled.div`
  aspect-ratio: 1;
  position: relative;
  background: ${props => props.theme.colors.background};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: ${props => props.theme.colors.text};
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textMuted};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const SelectionIndicator = styled.div<{ $selected: boolean }>`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: ${props => props.$selected ? props.theme.colors.primary : 'rgba(0,0,0,0.3)'};
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  color: white;
  backdrop-filter: blur(4px);
`;

const InfoButton = styled.button`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  color: white;
  backdrop-filter: blur(4px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

interface PetCardProps {
  pet: Pet;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export const PetCard: React.FC<PetCardProps> = ({ pet, isSelected, onToggle }) => {
  const navigate = useNavigate();

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/pets/${pet.id}`);
  };

  return (
    <Card 
      $selected={isSelected}
      onClick={() => onToggle(pet.id)}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <ImageContainer>
        <SelectionIndicator $selected={isSelected}>
          {isSelected && <Check size={14} strokeWidth={3} />}
        </SelectionIndicator>
        <InfoButton onClick={handleInfoClick} title="View Details">
          <Info size={14} />
        </InfoButton>
        <Image src={pet.url} alt={pet.title} loading="lazy" />
      </ImageContainer>
      <Content>
        <Title>{pet.title}</Title>
        <Description>{pet.description}</Description>
      </Content>
    </Card>
  );
};

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import type { Pet } from '../types/pet';
import { Button, Container } from '../components/common';
import { useSelection } from '../context/SelectionContext';
import { motion } from 'framer-motion';

const DetailWrapper = styled(motion.div)`
  padding: 4rem 0;
`;

const ContentGrid = styled.div`
  display: grid;
  gap: 3rem;
  grid-template-columns: 1fr;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ImageWrapper = styled.div`
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.lg};
  aspect-ratio: 4/5;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PetTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: ${props => props.theme.colors.text};
`;

const PetDescription = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.textMuted};
  line-height: 1.6;
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${props => props.theme.colors.surface};
  border-radius: 1rem;
  border: 1px solid ${props => props.theme.colors.border};
`;

const MetaLabel = styled.div`
  display: flex;
  flex-direction: column;
  
  span:first-child {
    font-size: 0.75rem;
    color: ${props => props.theme.colors.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  span:last-child {
    font-weight: 600;
  }
`;

const PetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const { selectedPetIds, toggleSelection } = useSelection();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await fetch(`/pets/${id}`);
        if (res.ok) {
          const data = await res.json();
          setPet(data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  if (loading) return <Container><p>Loading pet details...</p></Container>;
  if (!pet) return <Container><p>Pet not found.</p></Container>;

  const isSelected = selectedPetIds.has(pet.id);

  return (
    <Container>
      <DetailWrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button 
          $variant="ghost" 
          onClick={() => navigate(-1)}
          style={{ marginBottom: '2rem' }}
        >
          <ArrowLeft size={20} />
          Back to Gallery
        </Button>

        <ContentGrid>
          <ImageWrapper>
            <Image src={pet.url} alt={pet.title} />
          </ImageWrapper>

          <InfoSection>
            <div>
              <PetTitle>{pet.title}</PetTitle>
              <PetDescription>{pet.description}</PetDescription>
            </div>

            <MetaGrid>
              <MetaItem>
                <Calendar size={24} color="#6366f1" />
                <MetaLabel>
                  <span>Created At</span>
                  <span>{new Date(pet.created).toLocaleDateString()}</span>
                </MetaLabel>
              </MetaItem>
              <MetaItem>
                <FileText size={24} color="#10b981" />
                <MetaLabel>
                  <span>Est. Size</span>
                  <span>{(pet.size! / 1024 / 1024).toFixed(2)} MB</span>
                </MetaLabel>
              </MetaItem>
            </MetaGrid>

            <Button 
              $variant={isSelected ? 'secondary' : 'primary'} 
              $size="lg"
              onClick={() => toggleSelection(pet.id)}
            >
              {isSelected ? 'Deselect Pet' : 'Select for Download'}
              {isSelected && <CheckCircle2 size={20} />}
            </Button>
          </InfoSection>
        </ContentGrid>
      </DetailWrapper>
    </Container>
  );
};

export default PetDetail;

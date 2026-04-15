import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Search, SortAsc, SortDesc, Calendar, LayoutGrid } from 'lucide-react';
import { usePets } from '../hooks/usePets';
import { useSelection } from '../context/SelectionContext';
import { PetCard } from '../components/gallery/PetCard';
import { SelectionToolbar } from '../components/gallery/SelectionToolbar';
import { Button, Input, Container } from '../components/common';
import { AnimatePresence } from 'framer-motion';

const PageHeader = styled.div`
  padding: 4rem 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TitleSection = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textMuted};
  font-size: 1.25rem;
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.colors.surface};
  padding: 1.5rem;
  border-radius: 1.5rem;
  border: 1px solid ${props => props.theme.colors.border};
`;

const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
  min-width: 300px;
  
  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${props => props.theme.colors.textMuted};
  }
  
  input {
    padding-left: 2.75rem;
  }
`;

const SortGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
  padding-bottom: 8rem;

  @media (min-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatusMessage = styled.div`
  text-align: center;
  padding: 5rem 0;
  color: ${props => props.theme.colors.textMuted};
`;

type SortType = 'name-asc' | 'name-desc' | 'date-new' | 'date-old';

const Browse: React.FC = () => {
  const { pets, loading, error } = usePets();
  const { selectedPetIds, toggleSelection, selectAll, clearSelection } = useSelection();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortType>('name-asc');

  const filteredAndSortedPets = useMemo(() => {
    let result = [...pets];

    // Filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(pet => 
        pet.title.toLowerCase().includes(term) || 
        pet.description.toLowerCase().includes(term)
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc': return a.title.localeCompare(b.title);
        case 'name-desc': return b.title.localeCompare(a.title);
        case 'date-new': return new Date(b.created).getTime() - new Date(a.created).getTime();
        case 'date-old': return new Date(a.created).getTime() - new Date(b.created).getTime();
        default: return 0;
      }
    });

    return result;
  }, [pets, searchTerm, sortBy]);

  const handleSelectAll = () => {
    if (selectedPetIds.size === filteredAndSortedPets.length) {
      clearSelection();
    } else {
      selectAll(filteredAndSortedPets.map(p => p.id));
    }
  };

  if (loading) return <StatusMessage>Fetching your future best friends...</StatusMessage>;
  if (error) return <StatusMessage>Error: {error}</StatusMessage>;

  return (
    <Container>
      <PageHeader>
        <TitleSection>
          <Title>Pet Gallery</Title>
          <Subtitle>Discover and select your perfect companion</Subtitle>
        </TitleSection>

        <Controls>
          <SearchWrapper>
            <Search size={20} />
            <Input 
              placeholder="Search by name or description..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchWrapper>

          <SortGroup>
            <Button 
              $variant={sortBy.includes('name') ? 'primary' : 'secondary'} 
              $size="sm"
              onClick={() => setSortBy(sortBy === 'name-asc' ? 'name-desc' : 'name-asc')}
            >
              {sortBy === 'name-asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
              Name
            </Button>
            <Button 
              $variant={sortBy.includes('date') ? 'primary' : 'secondary'} 
              $size="sm"
              onClick={() => setSortBy(sortBy === 'date-new' ? 'date-old' : 'date-new')}
            >
              <Calendar size={16} />
              Date
            </Button>
            <Button 
              $variant="secondary" 
              $size="sm"
              onClick={handleSelectAll}
            >
              <LayoutGrid size={16} />
              {selectedPetIds.size === filteredAndSortedPets.length ? 'Deselect All' : 'Select All'}
            </Button>
          </SortGroup>
        </Controls>
      </PageHeader>

      <AnimatePresence mode="popLayout">
        {filteredAndSortedPets.length > 0 ? (
          <Grid>
            {filteredAndSortedPets.map(pet => (
              <PetCard 
                key={pet.id} 
                pet={pet} 
                isSelected={selectedPetIds.has(pet.id)}
                onToggle={toggleSelection}
              />
            ))}
          </Grid>
        ) : (
          <StatusMessage>No pets found matching your criteria.</StatusMessage>
        )}
      </AnimatePresence>

      <SelectionToolbar />
    </Container>
  );
};

export default Browse;

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { SelectionContextType } from '../types/pet';
import { mockPets } from '../api/mockData';

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export const SelectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPetIds, setSelectedPetIds] = useState<Set<string>>(new Set());
  const [totalSize, setTotalSize] = useState(0);

  useEffect(() => {
    // Persist to local storage if needed, though the requirement just says "not lose selections when navigating routes"
    // Routing state in memory is fine for that.
  }, [selectedPetIds]);

  useEffect(() => {
    const size = Array.from(selectedPetIds).reduce((acc, id) => {
      const pet = mockPets.find(p => p.id === id);
      return acc + (pet?.size || 0);
    }, 0);
    setTotalSize(size);
  }, [selectedPetIds]);

  const toggleSelection = (id: string) => {
    setSelectedPetIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAll = (ids: string[]) => {
    setSelectedPetIds(new Set(ids));
  };

  const clearSelection = () => {
    setSelectedPetIds(new Set());
  };

  return (
    <SelectionContext.Provider value={{ selectedPetIds, toggleSelection, selectAll, clearSelection, totalSize }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};

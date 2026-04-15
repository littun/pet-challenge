import { useState, useEffect } from 'react';
import type { Pet } from '../types/pet';

interface UsePetsResult {
  pets: Pet[];
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
}

export const usePets = (): UsePetsResult => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const response = await fetch('/pets');
        if (!response.ok) {
          throw new Error(`Failed to fetch pets: ${response.statusText}`);
        }
        const data = await response.json();
        setPets(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  return {
    pets,
    loading,
    error,
    isEmpty: !loading && pets.length === 0,
  };
};

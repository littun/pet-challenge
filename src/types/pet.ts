export interface Pet {
  id: string;
  title: string;
  description: string;
  url: string;
  created: string;
  size?: number; // Estimated size in bytes
}

export interface SelectionContextType {
  selectedPetIds: Set<string>;
  toggleSelection: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
  totalSize: number;
}

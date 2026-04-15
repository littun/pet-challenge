import React from 'react';
import styled from 'styled-components';
import { Download, X } from 'lucide-react';
import { Button } from '../common';
import { useSelection } from '../../context/SelectionContext';
import JSZip from 'jszip';

const ToolbarContainer = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%) translateY(${props => props.$visible ? '0' : '150%'});
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: ${props => props.theme.shadows.lg};
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 100;
  backdrop-filter: blur(12px);
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2;
`;

const Count = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const Size = styled.span`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textMuted};
`;

const Divider = styled.div`
  width: 1px;
  height: 2rem;
  background: ${props => props.theme.colors.border};
`;

const formatSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const SelectionToolbar: React.FC = () => {
  const { selectedPetIds, clearSelection, totalSize } = useSelection();
  const visible = selectedPetIds.size > 0;

  const handleDownload = async () => {
    const zip = new JSZip();
    // Simulation
    zip.folder("selected-pets");
    
    // In a real app, we'd fetch the images then add them.
    // For this challenge, we'll simulate the download.
    alert(`Simulating download of ${selectedPetIds.size} images totaling ${formatSize(totalSize)}...`);
    
    // Example of what we'd actually do if we had CORS access:
    // for (const id of Array.from(selectedPetIds)) {
    //   const pet = mockPets.find(p => p.id === id);
    //   if (pet) {
    //     const res = await fetch(pet.url);
    //     const blob = await res.blob();
    //     folder?.file(`${pet.title.replace(/\s+/g, '_')}.jpg`, blob);
    //   }
    // }
    // const content = await zip.generateAsync({ type: "blob" });
    // saveAs(content, "pets.zip");
  };

  return (
    <ToolbarContainer $visible={visible}>
      <Stats>
        <Count>{selectedPetIds.size} Selected</Count>
        <Size>Est. {formatSize(totalSize)}</Size>
      </Stats>
      
      <Divider />
      
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button $variant="primary" $size="sm" onClick={handleDownload}>
          <Download size={16} />
          Download
        </Button>
        <Button $variant="ghost" $size="sm" onClick={clearSelection}>
          <X size={16} />
          Clear
        </Button>
      </div>
    </ToolbarContainer>
  );
};

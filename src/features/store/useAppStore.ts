import { create } from 'zustand';

interface AppState {
  // File State
  file: File | null;
  setFile: (file: File | null) => void;
  
  // Processing State
  isProcessing: boolean;
  setIsProcessing: (status: boolean) => void;
  
  // Settings State
  boldIntensity: number;
  setBoldIntensity: (intensity: number) => void;
  
  // Modals Visibility
  isModalOpen: boolean;
  setIsModalOpen: (status: boolean) => void;
  
  isSettingsOpen: boolean;
  setIsSettingsOpen: (status: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  file: null,
  setFile: (file) => set({ file }),
  
  isProcessing: false,
  setIsProcessing: (status) => set({ isProcessing: status }),
  
  boldIntensity: 2,
  setBoldIntensity: (intensity) => set({ boldIntensity: intensity }),
  
  isModalOpen: false,
  setIsModalOpen: (status) => set({ isModalOpen: status }),
  
  isSettingsOpen: false,
  setIsSettingsOpen: (status) => set({ isSettingsOpen: status }),
}));

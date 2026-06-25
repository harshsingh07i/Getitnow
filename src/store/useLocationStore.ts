import { create } from 'zustand';

export interface SavedAddress {
  id: string;
  type: string;
  details: string;
}

interface LocationStore {
  address: string;
  isModalOpen: boolean;
  savedAddresses: SavedAddress[];
  setAddress: (address: string) => void;
  openModal: () => void;
  closeModal: () => void;
  addAddress: (address: Omit<SavedAddress, 'id'>) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  address: 'B35/70-S-1, Padampuri Colony, ...', // Default address
  isModalOpen: false,
  savedAddresses: [
    {
      id: '2',
      type: 'Library',
      details: 'Harsh, Banars digital library, Near Shri cheenataniya, (origence) Khojwan, Bhelupur, Varanasi'
    },
    {
      id: '3',
      type: 'Home',
      details: 'Harsh Pratap Singh, Plot no 135 jrs hostel B block Shankar dham colony durgakund Varanasi Tulsi Nagar, Khojwan, Bhelupur'
    }
  ],
  setAddress: (address) => set({ address, isModalOpen: false }), // Close modal on select
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  addAddress: (addressData) => set((state) => ({
    savedAddresses: [
      { ...addressData, id: Math.random().toString(36).substr(2, 9) },
      ...state.savedAddresses
    ]
  }))
}));

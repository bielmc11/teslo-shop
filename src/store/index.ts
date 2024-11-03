import { create } from 'zustand'

interface BearState {
    isOpen: boolean
    changeIsOpen: () => void
  
  }
  
export const useStore = create<BearState>((set) => ({
  isOpen: false,
  changeIsOpen: () => set((state) => ({ isOpen: !state.isOpen  })),
  
}))
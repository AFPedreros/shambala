import { create } from 'zustand';

type State = {
	role: string | null;
	setRole: (role: string) => void;
};

export const useStore = create<State>((set) => ({
	role: null,
	setRole: (role) => set({ role }),
}));

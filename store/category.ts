import { create } from 'zustand'

interface State {
    activeId: number
    setActiveId: (activeId: number) => void
}

const useCategoryStore = create<State>()(set => ({
    activeId: 1,
    setActiveId: activeId => set({ activeId }),
}))

export const useCategoryActiveId = () =>
    useCategoryStore(state => state.activeId)
export const useSetCategoryActiveId = () =>
    useCategoryStore(state => state.setActiveId)

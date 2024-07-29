import { create } from 'zustand'

interface State {
    activeId: number
    shouldScroll: boolean
    setActiveId: (activeId: number, shouldScroll?: boolean) => void
}

const useCategoryStore = create<State>()(set => ({
    activeId: 1,
    shouldScroll: true,
    setActiveId: (activeId, shouldScroll = true) =>
        set({ activeId, shouldScroll }),
}))

export const useCategoryActiveId = () =>
    useCategoryStore(state => ({
        categoryActiveId: state.activeId,
        shouldScroll: state.shouldScroll,
    }))

export const useSetCategoryActiveId = () =>
    useCategoryStore(state => state.setActiveId)

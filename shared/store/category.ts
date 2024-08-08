import { create } from 'zustand'

interface State {
  activeId?: string
  shouldScroll: boolean
  setActiveId: (activeId: string, shouldScroll?: boolean) => void
}

const useCategoryStore = create<State>()((set) => ({
  activeId: undefined,
  shouldScroll: true,
  setActiveId: (activeId, shouldScroll = true) => set({ activeId, shouldScroll }),
}))

export const useCategoryActiveId = () =>
  useCategoryStore((state) => ({
    categoryActiveId: state.activeId,
    shouldScroll: state.shouldScroll,
  }))

export const useSetCategoryActiveId = () => useCategoryStore((state) => state.setActiveId)

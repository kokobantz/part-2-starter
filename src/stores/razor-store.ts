import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

export interface Razor {
  id: string
  name: string
  material: string
  type: 'Adjustable' | 'Fixed'
  price: number
  inStock: boolean
}

const ALL_RAZORS: Razor[] = [
  { id: '1', name: 'Rockwell 6S Adjustable', material: 'Stainless Steel', type: 'Adjustable', price: 120, inStock: true },
  { id: '2', name: 'Rockwell 6C',            material: 'Chrome',           type: 'Fixed',      price: 80,  inStock: true },
  { id: '3', name: 'Rockwell T2',            material: 'Gunmetal',         type: 'Fixed',      price: 50,  inStock: true },
  { id: '4', name: 'Rockwell R1',            material: 'White Chrome',     type: 'Fixed',      price: 40,  inStock: true },
  { id: '5', name: 'Rockwell Model T',       material: 'Matte Black',      type: 'Adjustable', price: 150, inStock: false },
  { id: '6', name: 'Rockwell 2C',            material: 'Chrome',           type: 'Fixed',      price: 30,  inStock: true },
]

export const MATERIAL_OPTIONS = ['Chrome', 'Gunmetal', 'White Chrome', 'Rose Gold'] as const
export const TYPE_OPTIONS = ['Adjustable', 'Fixed'] as const
export type SortLabel = 'Featured' | 'Price: Low to High' | 'Price: High to Low'

interface RazorStore {
  search: string
  selectedMaterials: string[]
  selectedTypes: string[]
  inStockOnly: boolean
  sortLabel: SortLabel
  selectedId: string | null

  setSearch: (search: string) => void
  toggleMaterial: (material: string) => void
  toggleType: (type: string) => void
  toggleInStock: () => void
  removeFilter: (label: string) => void
  clearAll: () => void
  setSort: (label: SortLabel) => void
  setSelectedId: (id: string | null) => void
}

export const useRazorStore = create<RazorStore>((set) => ({
  search: '',
  selectedMaterials: [],
  selectedTypes: [],
  inStockOnly: false,
  sortLabel: 'Featured',
  selectedId: null,

  setSearch: (search) => set({ search }),

  toggleMaterial: (material) =>
    set((s) => ({
      selectedMaterials: s.selectedMaterials.includes(material)
        ? s.selectedMaterials.filter((m) => m !== material)
        : [...s.selectedMaterials, material],
    })),

  toggleType: (type) =>
    set((s) => ({
      selectedTypes: s.selectedTypes.includes(type)
        ? s.selectedTypes.filter((t) => t !== type)
        : [...s.selectedTypes, type],
    })),

  toggleInStock: () => set((s) => ({ inStockOnly: !s.inStockOnly })),

  removeFilter: (label) =>
    set((s) => {
      if (label === 'In stock') return { inStockOnly: false }
      if ((MATERIAL_OPTIONS as readonly string[]).includes(label))
        return { selectedMaterials: s.selectedMaterials.filter((m) => m !== label) }
      if ((TYPE_OPTIONS as readonly string[]).includes(label))
        return { selectedTypes: s.selectedTypes.filter((t) => t !== label) }
      return {}
    }),

  clearAll: () => set({ search: '', selectedMaterials: [], selectedTypes: [], inStockOnly: false }),

  setSort: (sortLabel) => set({ sortLabel }),

  setSelectedId: (selectedId) => set({ selectedId }),
}))

export function useFilteredRazors() {
  return useRazorStore(
    useShallow((s) => {
      let razors = ALL_RAZORS

      if (s.search) {
        const q = s.search.toLowerCase()
        razors = razors.filter((r) => r.name.toLowerCase().includes(q))
      }

      if (s.selectedMaterials.length > 0) {
        razors = razors.filter((r) => s.selectedMaterials.includes(r.material))
      }

      if (s.selectedTypes.length > 0) {
        razors = razors.filter((r) => s.selectedTypes.includes(r.type))
      }

      if (s.inStockOnly) {
        razors = razors.filter((r) => r.inStock)
      }

      if (s.sortLabel === 'Price: Low to High') return [...razors].sort((a, b) => a.price - b.price)
      if (s.sortLabel === 'Price: High to Low') return [...razors].sort((a, b) => b.price - a.price)

      return razors
    })
  )
}

export function useActiveFilterLabels() {
  return useRazorStore(
    useShallow((s) => [
      ...s.selectedMaterials,
      ...s.selectedTypes,
      ...(s.inStockOnly ? ['In stock'] : []),
    ])
  )
}

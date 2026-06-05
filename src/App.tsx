import { useState } from 'react'
import FilterPanel from '@/components/FilterPanel'
import ResultsPanel, { type Razor, type ActiveFilter } from '@/components/ResultsPanel'

const RAZORS: Razor[] = [
  { id: '1', name: 'Rockwell 6S Adjustable', material: 'Stainless Steel', price: 120 },
  { id: '2', name: 'Rockwell 6C', material: 'Chrome', price: 80 },
  { id: '3', name: 'Rockwell T2', material: 'Gunmetal', price: 50 },
  { id: '4', name: 'Rockwell R1', material: 'White Chrome', price: 40 },
  { id: '5', name: 'Rockwell Model T', material: 'Matte Black', price: 150 },
  { id: '6', name: 'Rockwell 2C', material: 'Chrome', price: 30 },
]

const INITIAL_FILTERS: ActiveFilter[] = [
  { label: 'Chrome', onRemove: () => {} },
  { label: 'Gunmetal', onRemove: () => {} },
  { label: 'Adjustable', onRemove: () => {} },
  { label: 'In stock', onRemove: () => {} },
]

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>('1')
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>(
    INITIAL_FILTERS.map((f) => ({
      ...f,
      onRemove: () => setActiveFilters((prev) => prev.filter((p) => p.label !== f.label)),
    }))
  )

  return (
    <div className="flex flex-col items-stretch gap-6 p-8 min-h-screen w-full bg-[#F5F5F4]">
      <header className="flex flex-col w-full gap-1.5">
        <span className="font-semibold text-[22px] leading-7 text-[#1A1A1A]">
          Shop Razors
        </span>
        <span className="font-normal text-sm leading-5 text-gray-500">
          Precision-engineered safety razors. Filter to find your setting.
        </span>
      </header>
      <div className="flex flex-row items-start gap-8 w-full">
        <FilterPanel />
        <ResultsPanel
          razors={RAZORS}
          totalCount={RAZORS.length}
          activeFilters={activeFilters}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>
    </div>
  )
}

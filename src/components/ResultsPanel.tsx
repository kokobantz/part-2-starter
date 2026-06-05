import RazorCard from '@/components/RazorCard'

export interface Razor {
  id: string
  name: string
  material: string
  price: number
}

export interface ActiveFilter {
  label: string
  onRemove: () => void
}

interface ResultsPanelProps {
  razors: Razor[]
  totalCount: number
  activeFilters: ActiveFilter[]
  selectedId: string | null
  onSelect: (id: string) => void
  sortLabel?: string
  onSortClick?: () => void
}

export default function ResultsPanel({
  razors,
  totalCount,
  activeFilters,
  selectedId,
  onSelect,
  sortLabel = 'Featured',
  onSortClick,
}: ResultsPanelProps) {
  return (
    <div className="flex flex-col items-stretch gap-4 w-full">
      {/* Toolbar */}
      <div className="flex flex-row justify-between items-center w-full">
        <span className="font-semibold text-[15px] text-[#1A1A1A]">
          {totalCount} razor{totalCount !== 1 ? 's' : ''}
        </span>
        <button
          onClick={onSortClick}
          className="flex flex-row items-center gap-2 px-3 py-2 bg-white border border-[#E5E5E5] rounded-lg cursor-pointer"
        >
          <span className="font-medium text-[13px] text-[#1A1A1A]">Sort: {sortLabel}</span>
          <span className="font-normal text-xs text-[#6B7280]">▾</span>
        </button>
      </div>

      {/* Active filter chips */}
      {activeFilters.length > 0 && (
        <div className="flex flex-row flex-wrap gap-2 w-full">
          {activeFilters.map((filter) => (
            <div
              key={filter.label}
              className="flex flex-row items-center gap-1.5 px-[10px] py-1.5 bg-[#EFEFEE] rounded-full"
            >
              <span className="font-medium text-[13px] text-[#1A1A1A]">{filter.label}</span>
              <button
                onClick={filter.onRemove}
                className="font-normal text-[11px] text-[#6B7280] cursor-pointer leading-none"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 2-column card grid */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {razors.map((razor) => (
          <RazorCard
            key={razor.id}
            name={razor.name}
            material={razor.material}
            price={razor.price}
            isSelected={selectedId === razor.id}
            onSelect={() => onSelect(razor.id)}
          />
        ))}
      </div>
    </div>
  )
}

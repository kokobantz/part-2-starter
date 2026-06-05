import RazorCard from '@/components/RazorCard'
import { useRazorStore, useFilteredRazors, useActiveFilterLabels } from '@/stores/razor-store'

export default function ResultsPanel() {
  const razors = useFilteredRazors()
  const activeFilterLabels = useActiveFilterLabels()
  const selectedId = useRazorStore((s) => s.selectedId)
  const sortLabel = useRazorStore((s) => s.sortLabel)
  const removeFilter = useRazorStore((s) => s.removeFilter)
  const setSelectedId = useRazorStore((s) => s.setSelectedId)

  return (
    <div className="flex flex-col items-stretch gap-4 w-full">
      {/* Toolbar */}
      <div className="flex flex-row justify-between items-center w-full">
        <span className="font-semibold text-[15px] text-[#1A1A1A]">
          {razors.length} razor{razors.length !== 1 ? 's' : ''}
        </span>
        <button className="flex flex-row items-center gap-2 px-3 py-2 bg-white border border-[#E5E5E5] rounded-lg cursor-pointer">
          <span className="font-medium text-[13px] text-[#1A1A1A]">Sort: {sortLabel}</span>
          <span className="font-normal text-xs text-[#6B7280]">▾</span>
        </button>
      </div>

      {/* Active filter chips */}
      {activeFilterLabels.length > 0 && (
        <div className="flex flex-row flex-wrap gap-2 w-full">
          {activeFilterLabels.map((label) => (
            <div
              key={label}
              className="flex flex-row items-center gap-1.5 px-[10px] py-1.5 bg-[#EFEFEE] rounded-full"
            >
              <span className="font-medium text-[13px] text-[#1A1A1A]">{label}</span>
              <button
                onClick={() => removeFilter(label)}
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
            onSelect={() => setSelectedId(razor.id)}
          />
        ))}
      </div>
    </div>
  )
}

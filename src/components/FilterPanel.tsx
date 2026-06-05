import { cn } from '@/lib/utils'
import { useRazorStore, MATERIAL_OPTIONS, TYPE_OPTIONS } from '@/stores/razor-store'

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <div
      className={cn(
        'w-[18px] h-[18px] flex items-center justify-center rounded border-[1.5px] shrink-0',
        checked ? 'bg-[#1A1A1A] border-[#1A1A1A]' : 'bg-white border-[#E5E5E5]'
      )}
    >
      {checked && (
        <span className="text-[11px] font-semibold text-white leading-none">✓</span>
      )}
    </div>
  )
}

function FilterGroup({
  label,
  options,
  selectedValues,
  onToggle,
}: {
  label: string
  options: readonly string[]
  selectedValues: string[]
  onToggle: (value: string) => void
}) {
  return (
    <div className="flex flex-col w-full gap-3">
      <span className="font-semibold text-xs tracking-[0.06em] text-[#6B7280] uppercase">
        {label}
      </span>
      <div className="flex flex-col items-stretch w-full gap-3">
        {options.map((opt) => (
          <div
            key={opt}
            className="flex flex-row items-center w-full gap-2.5 cursor-pointer select-none"
            onClick={() => onToggle(opt)}
          >
            <Checkbox checked={selectedValues.includes(opt)} />
            <span className="font-normal text-sm text-[#1A1A1A]">{opt}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface FilterPanelProps {
  className?: string
}

export default function FilterPanel({ className }: FilterPanelProps) {
  const search = useRazorStore((s) => s.search)
  const selectedMaterials = useRazorStore((s) => s.selectedMaterials)
  const selectedTypes = useRazorStore((s) => s.selectedTypes)
  const inStockOnly = useRazorStore((s) => s.inStockOnly)
  const setSearch = useRazorStore((s) => s.setSearch)
  const toggleMaterial = useRazorStore((s) => s.toggleMaterial)
  const toggleType = useRazorStore((s) => s.toggleType)
  const toggleInStock = useRazorStore((s) => s.toggleInStock)
  const clearAll = useRazorStore((s) => s.clearAll)

  return (
    <div
      className={cn(
        'flex flex-col items-stretch gap-6 p-5 w-[280px] bg-white border border-[#E5E5E5] rounded-xl shrink-0',
        className
      )}
    >
      {/* Panel Header */}
      <div className="flex flex-row justify-between items-center w-full">
        <span className="font-semibold text-base text-[#1A1A1A]">Filters</span>
        <button
          onClick={clearAll}
          className="font-medium text-[13px] text-[#6B7280] cursor-pointer"
        >
          Clear all
        </button>
      </div>

      {/* Search */}
      <div className="flex flex-row items-center w-full px-3 py-2.5 bg-[#F9F9F8] border border-[#E5E5E5] rounded-lg">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search razors"
          className="w-full bg-transparent font-normal text-sm text-[#1A1A1A] placeholder:text-[#6B7280] outline-none"
        />
      </div>

      {/* Material */}
      <FilterGroup
        label="Material"
        options={MATERIAL_OPTIONS}
        selectedValues={selectedMaterials}
        onToggle={toggleMaterial}
      />

      {/* Type */}
      <FilterGroup
        label="Type"
        options={TYPE_OPTIONS}
        selectedValues={selectedTypes}
        onToggle={toggleType}
      />

      {/* In stock toggle */}
      <div
        className="flex flex-row justify-between items-center w-full cursor-pointer select-none"
        onClick={toggleInStock}
      >
        <span className="font-normal text-sm text-[#1A1A1A]">In stock only</span>
        <div
          className={cn(
            'w-[38px] h-[22px] rounded-full flex items-center p-0.5 transition-colors',
            inStockOnly ? 'bg-[#1A1A1A] justify-end' : 'bg-[#E5E5E5] justify-start'
          )}
        >
          <div className="w-4 h-4 rounded-full bg-white" />
        </div>
      </div>
    </div>
  )
}

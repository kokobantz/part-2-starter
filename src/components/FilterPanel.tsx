import { cn } from '@/lib/utils'

interface CheckboxOption {
  label: string
  checked: boolean
}

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <div
      className={cn(
        'w-[18px] h-[18px] flex items-center justify-center rounded border-[1.5px] shrink-0',
        checked
          ? 'bg-[#1A1A1A] border-[#1A1A1A]'
          : 'bg-white border-[#E5E5E5]'
      )}
    >
      {checked && (
        <span className="text-[11px] font-semibold text-white leading-none">✓</span>
      )}
    </div>
  )
}

function FilterGroup({ label, options }: { label: string; options: CheckboxOption[] }) {
  return (
    <div className="flex flex-col w-full gap-3">
      <span className="font-semibold text-xs tracking-[0.06em] text-[#6B7280] uppercase">
        {label}
      </span>
      <div className="flex flex-col items-stretch w-full gap-3">
        {options.map((opt) => (
          <div key={opt.label} className="flex flex-row items-center w-full gap-2.5">
            <Checkbox checked={opt.checked} />
            <span className="font-normal text-sm text-[#1A1A1A]">{opt.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const MATERIAL_OPTIONS: CheckboxOption[] = [
  { label: 'Chrome', checked: true },
  { label: 'Gunmetal', checked: true },
  { label: 'White Chrome', checked: false },
  { label: 'Rose Gold', checked: false },
]

const TYPE_OPTIONS: CheckboxOption[] = [
  { label: 'Adjustable', checked: true },
  { label: 'Fixed', checked: false },
]

interface FilterPanelProps {
  className?: string
}

export default function FilterPanel({ className }: FilterPanelProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-stretch gap-6 p-5 w-[280px] bg-white border border-[#E5E5E5] rounded-xl',
        className
      )}
    >
      {/* Panel Header */}
      <div className="flex flex-row justify-between items-center w-full">
        <span className="font-semibold text-base text-[#1A1A1A]">Filters</span>
        <span className="font-medium text-[13px] text-[#6B7280] cursor-pointer">Clear all</span>
      </div>

      {/* Search */}
      <div className="flex flex-row items-center w-full px-3 py-2.5 bg-[#F9F9F8] border border-[#E5E5E5] rounded-lg">
        <span className="font-normal text-sm text-[#6B7280]">Search razors</span>
      </div>

      {/* Material filter group */}
      <FilterGroup label="Material" options={MATERIAL_OPTIONS} />

      {/* Type filter group */}
      <FilterGroup label="Type" options={TYPE_OPTIONS} />

      {/* In stock toggle */}
      <div className="flex flex-row justify-between items-center w-full">
        <span className="font-normal text-sm text-[#1A1A1A]">In stock only</span>
        <div className="w-[38px] h-[22px] rounded-full flex justify-end items-center p-0.5 bg-[#1A1A1A]">
          <div className="w-4 h-4 rounded-full bg-white" />
        </div>
      </div>
    </div>
  )
}

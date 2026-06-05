import { cn } from '@/lib/utils'

interface RazorCardProps {
  name: string
  material: string
  price: number
  isSelected: boolean
  onSelect: () => void
}

export default function RazorCard({ name, material, price, isSelected, onSelect }: RazorCardProps) {
  return (
    <div className="flex flex-col items-stretch w-full bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">
      <div className="w-full h-[150px] bg-[#ECECEB]" />

      <div className="flex flex-col w-full gap-1.5 p-[14px]">
        <span className="font-semibold text-[15px] leading-none text-[#1A1A1A]">{name}</span>
        <span className="font-normal text-[13px] text-[#6B7280]">{material}</span>

        <div className="flex flex-row justify-between items-center w-full pt-1">
          <span className="font-semibold text-base text-[#1A1A1A]">${price}</span>
          <button
            onClick={onSelect}
            className={cn(
              'flex flex-row items-center gap-1.5 px-3 py-2 rounded-lg font-medium text-[13px] cursor-pointer',
              isSelected
                ? 'bg-[#1A1A1A] text-white'
                : 'bg-white border border-[#E5E5E5] text-[#1A1A1A]'
            )}
          >
            {isSelected ? '✓ Selected' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  )
}

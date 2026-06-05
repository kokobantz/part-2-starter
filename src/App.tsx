import FilterPanel from '@/components/FilterPanel'
import ResultsPanel from '@/components/ResultsPanel'

export default function App() {
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
        <ResultsPanel />
      </div>
    </div>
  )
}

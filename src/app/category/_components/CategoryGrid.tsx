import CategoryCard from './CategoryCard'

export default function CategoryGrid() {
  return (
    <div
      className="grid grid-cols-[repeat(auto-fill,160px)] gap-[16px] justify-center
                        min-[740px]:grid-cols-[repeat(auto-fill,200px)]"
    >
      <CategoryCard />
    </div>
  )
}

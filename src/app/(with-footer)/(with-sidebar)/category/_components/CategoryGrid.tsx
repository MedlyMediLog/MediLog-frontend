import CategoryCard from './CategoryCard'
import { CATEGORY_LIST } from './category.constants'

export default function CategoryGrid() {
  return (
    <div
      className="grid grid-cols-[repeat(auto-fill,160px)] gap-[15px] justify-center
                        min-[740px]:grid-cols-[repeat(auto-fill,minmax(180px,200px))]"
    >
      {CATEGORY_LIST.map((category) => (
        <CategoryCard
          key={category.key}
          slug={category.slug}
          label={category.label}
          image={category.image}
        />
      ))}
    </div>
  )
}

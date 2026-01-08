import ProductListingShell from '@/app/product-listing/_components/ProductListingShell';

export default function ProductListingPage() {
  return (
    <div className="flex w-full">
      <aside className="hidden desktop:block">
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">

        <main className="flex-1 w-full">
          <div className="min-h-[calc(100vh-120px)]">
            <ProductListingShell />
        </div>
    </main>
      </div>
    </div>
  );
}

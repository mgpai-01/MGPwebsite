export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-gutter py-stack-sm bg-surface/95 backdrop-blur-sm z-50 border-b-2 border-outline-variant">
      <a href="#" className="flex items-center gap-3 no-underline">
        <img src="/logo.png" alt="Manufacturing Green Products" className="h-12 w-12 object-contain" />
        <div className="leading-tight hidden sm:block">
          <div className="font-headline-md font-black text-on-surface text-base">
            Manufacturing
          </div>
          <div className="font-headline-md font-black text-primary text-base">
            Green Products
          </div>
        </div>
      </a>
      <nav className="hidden md:flex gap-stack-md">
        <a href="#products" className="nav-link font-headline-md text-label-caps uppercase tracking-wider text-on-surface-variant font-medium hover:text-primary transition-all duration-200 active:scale-95">Products</a>
        <a href="#industries" className="nav-link font-headline-md text-label-caps uppercase tracking-wider text-on-surface-variant font-medium hover:text-primary transition-all duration-200 active:scale-95">Industries</a>
        <a href="#sustainability" className="nav-link font-headline-md text-label-caps uppercase tracking-wider text-on-surface-variant font-medium hover:text-primary transition-all duration-200 active:scale-95">Sustainability</a>
        <a href="#about" className="nav-link font-headline-md text-label-caps uppercase tracking-wider text-on-surface-variant font-medium hover:text-primary transition-all duration-200 active:scale-95">About</a>
        <a href="#locations" className="nav-link font-headline-md text-label-caps uppercase tracking-wider text-on-surface-variant font-medium hover:text-primary transition-all duration-200 active:scale-95">Locations</a>
      </nav>
      <a href="#quote" className="bg-primary text-on-primary font-label-caps text-label-caps px-stack-md py-stack-sm uppercase hover:bg-primary-container transition-colors no-underline">Get a Quote</a>
    </header>
  )
}

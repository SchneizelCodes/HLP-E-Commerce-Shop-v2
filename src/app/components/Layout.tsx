import { Outlet, Link } from "react-router";
import { Search, Heart, ShoppingCart, Menu, ChevronDown, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock product data for search
  const products = [
    { id: 1, name: "Luxury Massage Chair Pro", category: "Massage Chair" },
    { id: 2, name: "Executive Massage Recliner", category: "Massage Chair" },
    { id: 3, name: "Zero Gravity Massage Chair", category: "Massage Chair" },
    { id: 4, name: "Brown Mechanical Pony", category: "Mechanical Pony" },
    { id: 5, name: "Kids Ride-On Pony", category: "Mechanical Pony" },
    { id: 6, name: "Plush Mechanical Horse", category: "Mechanical Pony" },
  ];

  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const categories = ["Massage Chair", "Mechanical Pony"];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCategoryDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-semibold">Menu</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 flex flex-col gap-4">
          <Link
            to="/"
            className="text-sm hover:text-gray-600 transition-colors py-2"
            onClick={() => setIsSidebarOpen(false)}
          >
            Home
          </Link>
          <div className="border-t border-gray-200 pt-4">
            <p className="text-xs text-gray-500 mb-2">Categories</p>
            {categories.map((category) => (
              <Link
                key={category}
                to="/"
                className="block text-sm hover:text-gray-600 transition-colors py-2"
                onClick={() => setIsSidebarOpen(false)}
              >
                {category}
              </Link>
            ))}
          </div>
          <Link
            to="/login"
            className="text-sm hover:text-gray-600 transition-colors py-2"
            onClick={() => setIsSidebarOpen(false)}
          >
            Account
          </Link>
        </nav>
      </aside>

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Left: Logo and Menu Button */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black flex items-center justify-center">
                  <span className="text-white text-xs font-bold">HLP</span>
                </div>
                <span className="font-semibold hidden sm:inline">HealthyLifePhil</span>
              </Link>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Left: Category Dropdown */}
            <div className="relative flex-shrink-0" ref={categoryDropdownRef}>
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm">Categories</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 shadow-lg z-30">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to="/"
                      className="block px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                      onClick={() => setIsCategoryDropdownOpen(false)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="relative flex-1 max-w-md" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              {isSearchFocused && searchQuery && filteredProducts.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-lg max-h-64 overflow-y-auto z-30">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      to="/"
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        setSearchQuery("");
                        setIsSearchFocused(false);
                      }}
                    >
                      <p className="text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Shortcut Buttons */}
            <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
              <Link
                to="/"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
              >
                Massage Chair
              </Link>
              <Link
                to="/"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
              >
                Mechanical Pony
              </Link>
            </div>

            {/* Right: About, Help, Icons */}
            <div className="flex items-center gap-4 flex-shrink-0 ml-auto">
              <Link to="/" className="hidden md:block text-sm hover:text-gray-600 transition-colors">
                About
              </Link>
              <Link to="/" className="hidden md:block text-sm hover:text-gray-600 transition-colors">
                Help
              </Link>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <Link to="/login" className="hidden md:block text-sm hover:text-gray-600 transition-colors px-3 py-2">
                Account
              </Link>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">HealthyLifePhil</h3>
              <p className="text-sm text-gray-600">
                Where digital meets fashion
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/" className="hover:text-gray-900">New Arrivals</Link></li>
                <li><Link to="/" className="hover:text-gray-900">Best Sellers</Link></li>
                <li><Link to="/" className="hover:text-gray-900">Sale</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Help</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/" className="hover:text-gray-900">Customer Service</Link></li>
                <li><Link to="/" className="hover:text-gray-900">Shipping Info</Link></li>
                <li><Link to="/" className="hover:text-gray-900">Returns</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/" className="hover:text-gray-900">Our Story</Link></li>
                <li><Link to="/" className="hover:text-gray-900">Contact Us</Link></li>
                <li><Link to="/" className="hover:text-gray-900">Careers</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>&copy; 2026 HealthyLifePhil. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

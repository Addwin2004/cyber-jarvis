import { useState } from 'react'
import { Menu, X, Sun, Moon, Shield } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function Navbar({ activeCategory, setActiveCategory }) {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const categories = [
    { id: 'ALL', label: 'All' },
    { id: 'THREAT', label: 'Cyber News' },
    { id: 'TECH', label: 'New Tech' },
    { id: 'AI', label: 'AI' },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-bold tracking-tight text-xl hidden sm:inline-block">Cyber Jarvis</span>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-center space-x-6 text-sm font-medium">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`transition-colors hover:text-primary ${activeCategory === cat.id ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-md hover:bg-muted transition-colors"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          
          <button className="md:hidden p-2 rounded-md hover:bg-muted" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-b border-border bg-background p-4 flex flex-col space-y-2 shadow-lg absolute w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id)
                setIsOpen(false)
              }}
              className={`text-left text-sm font-medium p-3 rounded-md transition-colors ${activeCategory === cat.id ? 'bg-muted text-primary' : 'text-muted-foreground hover:bg-muted/50'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

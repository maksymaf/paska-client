import { useState } from 'react'
import { useCartStore } from '../../store/cartStore';
import CartModal from './CartModal'
import Button from './ui/Button';

const listItems = ["Головна", "Паски"]

export default function NavBar() {
  const [cartOpen, setCartOpen] = useState(false)
  const items = useCartStore(s => s.items)
  const totalCount = items.reduce((acc, i) => acc + i.quantity, 0)

  return (
    <>
      <nav className="fixed bg-card/30 flex justify-between items-center gap-3 py-3 px-3 left-1/2 top-5 translate-x-[-50%] rounded-full backdrop-blur-md text-text shadow-lg z-10 md:gap-10 md:px-5">
        <ul className="flex gap-2 text-xs md:gap-8 md:text-xl">
          {listItems.map((listItem, idx) => (
            <li key={idx} className="relative group cursor-pointer font-semibold">
              {listItem}
              <span className="absolute left-0 -bottom-1.25 w-0 h-1 rounded-xl bg-accent transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>
        <Button
          onClick={() => setCartOpen(true)}
          className="relative px-3 py-1 rounded-lg text-xs md:text-lg md:px-6 md:rounded-xl hover:bg-blue-500 hover:shadow-lg"
          variant='filled'
          size='sm'
        >
          Корзина
          {totalCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {totalCount}
            </span>
          )}
        </Button>
      </nav>

      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
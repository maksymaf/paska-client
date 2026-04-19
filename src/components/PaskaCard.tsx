import Button from "./ui/Button";
import { useCartStore } from "../../store/cartStore";

interface Paska {
  _id: string,
  name: string,
  price: number,
  description: string,
  image: string
}

interface PaskaCardProps {
  paska: Paska;
  onDetails: (paska: Paska) => void;
}

export default function PaskaCard({ paska, onDetails }: PaskaCardProps) {
  const addItem = useCartStore(s => s.addItem);

  return (
    <div className="w-75 bg-white rounded-xl p-2 transform transition-all hover:-translate-y-2 duration-200 shadow-lg hover:shadow-2xl border-2 border-accent/50 flex flex-col items-center cursor-pointer h-100 justify-between animate-fade-in">
      <img src={paska.image} alt={paska.name} className="h-40 object-cover rounded-xl" />
      <div className="p-2">
        <p className="font-bold text-lg text-center line-clamp-2">{paska.name}</p>
        <p className="text-gray-600 text-sm line-clamp-2 mt-2">{paska.description}</p>
        <p className="text-lg font-semibold text-accent mt-2">{paska.price} грн.</p>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => addItem(paska)} size="sm" className="mt-2 w-fit">Замовити</Button>
        <Button onClick={() => onDetails(paska)} variant="outline" size="sm" className="mt-2 w-fit">Докладніше</Button>
      </div>
    </div>
  );
}
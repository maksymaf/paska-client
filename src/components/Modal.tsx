import { useCartStore } from "../../store/cartStore";
import Button from "./ui/Button";

interface Paska {
  _id: string,
  name: string,
  price: number,
  description: string,
  image: string
}

interface ModalProps {
  paska: Paska | null,
  onClose: () => void
}

export default function Modal({ paska, onClose }: ModalProps) {
  const addItem = useCartStore(s => s.addItem);

  if (!paska) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl border-2 border-accent/30 flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={paska.image}
          alt={paska.name}
          className="h-52 w-full object-cover rounded-xl"
        />
        <div className="w-full">
          <p className="font-bold text-xl text-center">{paska.name}</p>
          <p className="text-gray-600 text-sm mt-3 leading-relaxed">{paska.description}</p>
          <p className="text-2xl font-semibold text-accent mt-4 text-center">{paska.price} грн.</p>
        </div>
        <div className="flex gap-3 w-full">
          <Button onClick={() => { addItem(paska); onClose(); }} className="flex-1">Замовити</Button>
          <Button onClick={onClose} variant="outline" className="flex-1">Закрити</Button>
        </div>
      </div>
    </div>
  );
}
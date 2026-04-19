import { useState, useEffect } from "react";
import Modal from "./Modal";
import PaskaCard from "./PaskaCard";

interface Paska {
  _id: string,
  name: string,
  price: number,
  description: string,
  image: string
}

export default function PaskiContainer() {
  const BASE_URL = 'https://easter-cake.onrender.com/';
  const [paskas, setPaskas] = useState<Paska[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPaska, setSelectedPaska] = useState<Paska | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(BASE_URL + 'api/pasky');
        const paskasArray = await response.json();
        setPaskas(paskasArray);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-4 items-center justify-center mt-4">
        {isLoading && <p>Завантаження...</p>}
        {paskas.map((paska, idx) => (
          <PaskaCard key={idx} paska={paska} onDetails={setSelectedPaska} />
        ))}
      </div>
      {selectedPaska && (
        <Modal paska={selectedPaska} onClose={() => setSelectedPaska(null)} />
      )}
    </>
  );
}
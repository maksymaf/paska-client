import Button from "./ui/Button"

export default function HeroSection() {
  return (
    <div className="flex w-full min-h-screen items-center justify-center px-8 md:px-20">
      <div className="flex gap-12 flex-col-reverse md:flex-row md:items-center justify-center max-w-5xl w-full">
        <div className="flex flex-col gap-4 md:w-1/2">
          <p className="text-sm font-medium text-accent uppercase tracking-wide">
            🚀 Швидке оформлення замовлення
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Справжня українська паска
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Випікаємо за традиційними рецептами вже 10 років. Замовте свіжу паску та заберіть самовивозом у зручний для вас час
          </p>
          <Button size="lg" className="mt-2 w-fit">Замовити зараз</Button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/img/paska.png"
            alt="Paska Image"
            className="w-full max-w-sm md:max-w-md object-contain drop-shadow-xl
            animate-fade-in opacity-0 animate-[fadeIn_0.5s_ease_forwards]"
          />
        </div>
      </div>
    </div>
  )
}
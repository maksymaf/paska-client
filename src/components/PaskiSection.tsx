import PaskiContainer from "./PaskiContainer";

export default function PaskiSection() {

  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-center px-8 py-2 md:px-20 max-w-275 m-auto">
      <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 text-center">
        Паски до вашого столу
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed mt-4 text-center">
        Традиційний смак, який об'єднує родину за святковим столом
      </p>
      <PaskiContainer/>
    </div>      
  )
}
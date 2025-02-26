import type React from "react"

const Hero: React.FC = () => {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/water-blog-cover.png-4xSe1EH5k3yLkK86rwolEUnTgKSd3T.jpeg"
        alt="Farmer watering crops in a green field"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40">
        <div className="mx-auto max-w-4xl px-4 pt-32 text-center text-white">
          <h1 className="mb-6 text-5xl font-bold">
            Empowering <span className="text-green-400">Farmers</span> with Real-Time Insights
          </h1>
          <p className="mb-8 text-lg">
            AgroEdge transforms traditional farming by providing farmers with real-time data, personalized
            recommendations, and innovative tools. Our platform empowers farmers to make informed decisions, optimize
            resource use, and boost productivity, fostering a sustainable future for agriculture.
          </p>
          <button className="rounded-md bg-green-500 px-8 py-3 text-lg font-medium text-white hover:bg-green-400">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero


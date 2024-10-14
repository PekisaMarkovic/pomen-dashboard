import { PropsWithChildren } from 'react'
import Heading from '../components/core/typography/Heading'
import heroImage from '../../public/images/dine-now-hero-image.jpg'
import Paragraph from '../components/core/typography/Paragraph'

type LandingLayoutProps = {
  title: string
  subtitle?: string
}

const LandingLayout = ({ children, title, subtitle }: PropsWithChildren<LandingLayoutProps>) => {
  return (
    <div className="h-screen grid grid-cols-2">
      <div className="bg-green relative overflow-hidden">
        <img
          src={heroImage}
          className="absolute top-2/4 left-1/4 -translate-y-2/4 rounded-xl"
          alt="This photo captures a serene dining experience by the sea with a wooden table adorned with an array of delectable dishes. The table is beautifully set with plates, wine glasses, and a bottle of white wine, all illuminated by the golden hues of the sunset. The Mediterranean ambiance is further enhanced by the natural surroundings of olive trees and the tranquil sea in the background. This setting not only promises a delicious meal but also a peaceful retreat in the embrace of nature."
        />
      </div>
      <div className="bg-black flex items-center justify-center">
        <div className="bg-white p-6 rounded-large w-1/2 flex flex-col items-center">
          <Heading variant="1" text={title} />
          {subtitle && <Paragraph text={subtitle} size="sm" color="grey" className="mt-2" />}
          {children}
        </div>
      </div>
    </div>
  )
}

export default LandingLayout

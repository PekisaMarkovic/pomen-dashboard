import { PropsWithChildren } from 'react'
import Heading from '@/src/components/core/typography/Heading'
import heroImage from '@/public/images/hero-bg.webp'
import Paragraph from '@/src/components/core/typography/Paragraph'
import Logo from '../icons/Logo'

type LandingLayoutProps = {
  title: string
  subtitle?: string
}

const LandingLayout = ({ children, title, subtitle }: PropsWithChildren<LandingLayoutProps>) => {
  return (
    <div className="relative h-screen grid grid-cols-2">
      <img
        className="absolute z-1 rounded-xl left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4"
        src={heroImage}
        alt="This photo captures a serene dining experience by the sea with a wooden table adorned with an array of delectable dishes. The table is beautifully set with plates, wine glasses, and a bottle of white wine, all illuminated by the golden hues of the sunset. The Mediterranean ambiance is further enhanced by the natural surroundings of olive trees and the tranquil sea in the background. This setting not only promises a delicious meal but also a peaceful retreat in the embrace of nature."
      />
      <div className="bg-green overflow-hidden flex items-center justify-center">
        <Logo type="WHITE" className="z-2 h-96 w-96 ml-20" />
      </div>

      <div className="bg-black flex items-center justify-center z-2">
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

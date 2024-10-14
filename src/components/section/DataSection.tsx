import { PropsWithChildren, ReactNode } from 'react'
import Heading from '../core/typography/Heading'
import Paragraph from '../core/typography/Paragraph'
import TooltipIcon from '../core/tooltip/TooltipIcon'

type Props = {
  title: string
  subtitle?: string
  tooltip?: string
  element?: ReactNode
}

const DataSection = ({ subtitle, title, children, element, tooltip }: PropsWithChildren<Props>) => (
  <div className={`bg-white rounded-sm border-1 border-light-grey-alt border-solid mt-4 mb-4 px-6 py-4`}>
    <div className="flex items-center justify-between">
      <div className="mb-6">
        <div className="flex gap-4 items-center">
          <Heading variant="3" text={title} size="base" color="black" />
          <TooltipIcon text={tooltip} />
        </div>
        {subtitle && <Paragraph text={subtitle} className="mt-2.5" />}
      </div>
      {element}
    </div>
    {children}
  </div>
)

export default DataSection

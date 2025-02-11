import Paragraph from '@/src/components/core/typography/Paragraph'
import Logo from '@/src/icons/Logo'
import { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

const ScreenSizeWarning = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation(['g'])

  return (
    <>
      <div className="hidden md:block">{children}</div>
      <div className="block md:hidden fixed top-0 left-0 h-full w-full flex items-center justify-center bg-green ">
        <div className="w-1/2 flex items-center justify-center flex-col">
          <Logo type="WHITE" />

          <Paragraph size="lg" color="white" className="text-center mt-8" text={t('g:screenWraning')} />
        </div>
      </div>
    </>
  )
}
export default ScreenSizeWarning

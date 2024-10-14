import { useTranslation } from 'react-i18next'
import MainButton from '../../components/core/buttons/MainButton'

type Props = {
  cancelButton?: {
    onClick: () => void
  }
}

const BottomMenu = ({ cancelButton }: Props) => {
  const { t } = useTranslation(['g'])

  return (
    <div className="pt-5 pb-6 pr-8 flex flex-row-reverse border-t-1 border-t-lighy-grey border-solid bg-white">
      <div className="flex gap-x-6 items-center">
        {cancelButton && <MainButton text={t('g:button.cancel')} variant="alternative" size="medium" onClick={cancelButton.onClick} />}
        <MainButton text={t('g:button.saveChanges')} variant="contained" size="medium" htmlType="submit" />
      </div>
    </div>
  )
}

export default BottomMenu

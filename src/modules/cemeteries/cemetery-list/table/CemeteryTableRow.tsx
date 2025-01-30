import { useTranslation } from 'react-i18next'
import Paragraph from '@/src/components/core/typography/Paragraph'
import DefaultTableRowContainer from '@/src/components/table/DefaultTableRowContainer'
import { ModalEnums } from '@/src/enum/modal'
import { ICemetery } from '@/src/interfaces/cemeteries'
import { CustomDropdown } from '@/src/interfaces/dropdown'
import { useAppDispatch } from '@/src/state/redux-hooks/reduxHooks'
import { setToEditCemetery } from '@/src/state/shared/cemeteries'
import { setModal } from '@/src/state/shared/modal'

type Props = {
  cementery: ICemetery
}

const CemeteryTableRow = ({ cementery }: Props) => {
  const { t } = useTranslation(['g:button'])
  const { address, city, name, slug } = cementery
  const dispatch = useAppDispatch()

  const checkOptions = () => {
    const options: CustomDropdown[] = [
      {
        content: {
          type: 'button',
          text: t('g:button.delete'),
          onClick: () => {},
        },
        textColor: 'red',
      },
      {
        content: {
          type: 'button',
          text: t('g:button.edit'),
          onClick: () => {
            dispatch(setToEditCemetery(cementery))
            dispatch(setModal(ModalEnums.EDIT_CEMETERY))
          },
        },
      },
    ]
    return options
  }

  return (
    <DefaultTableRowContainer cols={5} dropdownOptions={checkOptions()}>
      <div className="flex gap-x-2 py-3">
        <Paragraph text={name} size="sm" color="black" noWrap />
      </div>

      <div className="flex">
        <Paragraph text={slug} size="sm" color="black" noWrap />
      </div>

      <div className="flex">
        <Paragraph text={city?.name || ''} size="sm" color="black" noWrap />
      </div>

      <div className="col-span-2 gap-x-2 py-3">
        <Paragraph text={address} size="sm" color="black" noWrap />
      </div>
    </DefaultTableRowContainer>
  )
}

export default CemeteryTableRow

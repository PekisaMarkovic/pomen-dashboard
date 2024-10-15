import { useTranslation } from 'react-i18next'
import Paragraph from '../../../../components/core/typography/Paragraph'
import DefaultTableRowContainer from '../../../../components/table/DefaultTableRowContainer'
import { ModalEnums } from '../../../../enum/modal'
import { ICemetery } from '../../../../interfaces/cemeteries'
import { CustomDropdown } from '../../../../interfaces/dropdown'
import { useAppDispatch } from '../../../../state/redux-hooks/reduxHooks'
import { setToEditCemetery } from '../../../../state/shared/cemeteries'
import { setModal } from '../../../../state/shared/modal'

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
    <DefaultTableRowContainer dropdownOptions={checkOptions()}>
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

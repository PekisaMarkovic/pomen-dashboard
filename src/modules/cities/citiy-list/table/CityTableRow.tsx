import { useTranslation } from 'react-i18next'
import Paragraph from '@/src/components/core/typography/Paragraph'
import DefaultTableRowContainer from '@/src/components/table/DefaultTableRowContainer'
import { ModalEnums } from '@/src/enum/modal'
import { ICity } from '@/src/interfaces/cities'
import { CustomDropdown } from '@/src/interfaces/dropdown'
import { useAppDispatch } from '@/src/state/redux-hooks/reduxHooks'
import { setToEditCity } from '@/src/state/shared/cities'
import { setModal } from '@/src/state/shared/modal'

type Props = {
  city: ICity
}

const CityTableRow = ({ city }: Props) => {
  const { t } = useTranslation(['g:button'])
  const { country, code, name, slug } = city
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
            dispatch(setToEditCity(city))
            dispatch(setModal(ModalEnums.EDIT_CITY))
          },
        },
      },
    ]
    return options
  }

  return (
    <DefaultTableRowContainer cols={5} dropdownOptions={checkOptions()}>
      <div className="col-span-2 flex gap-x-2 py-3">
        <Paragraph text={name} size="sm" color="black" />
      </div>

      <div className="flex">
        <Paragraph text={code} size="sm" color="black" noWrap />
      </div>

      <div className="flex">
        <Paragraph text={slug} size="sm" color="black" noWrap />
      </div>

      <div className="flex">
        <Paragraph text={country?.name || ''} size="sm" color="black" noWrap />
      </div>
    </DefaultTableRowContainer>
  )
}

export default CityTableRow

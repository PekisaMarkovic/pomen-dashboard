import { useTranslation } from 'react-i18next'
import Paragraph from '../../../../components/core/typography/Paragraph'
import DefaultTableRowContainer from '../../../../components/table/DefaultTableRowContainer'
import { ModalEnums } from '../../../../enum/modal'
import { ICity } from '../../../../interfaces/cities'
import { CustomDropdown } from '../../../../interfaces/dropdown'
import { useAppDispatch } from '../../../../state/redux-hooks/reduxHooks'
import { setToEditCity } from '../../../../state/shared/cities'
import { setModal } from '../../../../state/shared/modal'

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
    <DefaultTableRowContainer dropdownOptions={checkOptions()}>
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

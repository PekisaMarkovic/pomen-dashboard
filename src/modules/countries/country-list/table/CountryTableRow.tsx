import { useTranslation } from 'react-i18next'
import Paragraph from '../../../../components/core/typography/Paragraph'
import DefaultTableRowContainer from '../../../../components/table/DefaultTableRowContainer'
import { ModalEnums } from '../../../../enum/modal'
import { ICountry } from '../../../../interfaces/country'
import { CustomDropdown } from '../../../../interfaces/dropdown'
import { useAppDispatch } from '../../../../state/redux-hooks/reduxHooks'
import { setToEditCountry } from '../../../../state/shared/countries'
import { setModal } from '../../../../state/shared/modal'

type Props = {
  country: ICountry
}

const CountryTableRow = ({ country }: Props) => {
  const { t } = useTranslation(['g:button'])
  const { iso, code, name, slug } = country
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
            dispatch(setToEditCountry(country))
            dispatch(setModal(ModalEnums.EDIT_COUNTRY))
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
        <Paragraph text={iso} size="sm" color="black" noWrap />
      </div>
      <div className="flex">
        <Paragraph text={code} size="sm" color="black" noWrap />
      </div>
      <div className="flex">
        <Paragraph text={slug} size="sm" color="black" noWrap />
      </div>
    </DefaultTableRowContainer>
  )
}

export default CountryTableRow

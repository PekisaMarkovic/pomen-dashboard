import { useTranslation } from 'react-i18next'
import Paragraph from '@/src/components/core/typography/Paragraph'
import DefaultTableRowContainer from '@/src/components/table/DefaultTableRowContainer'
import { ModalEnums } from '@/src/enum/modal'
import { ICountry } from '@/src/interfaces/country'
import { CustomDropdown } from '@/src/interfaces/dropdown'
import { useAppDispatch, useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { selectCountry, setCountries, setToEditCountry } from '@/src/state/shared/countries'
import { setModal } from '@/src/state/shared/modal'
import CountriesApis from '@/src/api/countries'
import { useApi } from '@/src/hooks/use-api'
import { useCallback } from 'react'
import customToast from '@/src/components/core/toast/CustomToast'

type Props = {
  country: ICountry
}

const CountryTableRow = ({ country }: Props) => {
  const { t } = useTranslation(['g:button'])
  const { iso, code, name, slug, countryId } = country
  const dispatch = useAppDispatch()
  const api = useApi()
  const { countries } = useAppSelector(selectCountry)

  const handleDelete = useCallback(async () => {
    try {
      await api.delete(CountriesApis.deleteCountry(countryId))

      if (countries) {
        dispatch(setCountries({ ...countries, items: countries.items.filter((obj) => obj.countryId !== countryId) }))
      }
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [countries, countryId])

  const checkOptions = () => {
    const options: CustomDropdown[] = [
      {
        content: {
          type: 'button',
          text: t('g:button.delete'),
          onClick: handleDelete,
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
    <DefaultTableRowContainer cols={5} dropdownOptions={checkOptions()}>
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

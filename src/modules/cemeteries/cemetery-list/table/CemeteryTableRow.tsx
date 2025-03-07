import { useTranslation } from 'react-i18next'
import Paragraph from '@/src/components/core/typography/Paragraph'
import DefaultTableRowContainer from '@/src/components/table/DefaultTableRowContainer'
import { ModalEnums } from '@/src/enum'
import { ICemetery, CustomDropdown } from '@/src/interfaces'
import { useAppDispatch, useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { selectCemeteries, setCemeteries, setToEditCemetery } from '@/src/state/shared/cemeteries'
import { setModal } from '@/src/state/shared/modal'
import { useCallback } from 'react'
import { useApi } from '@/src/hooks/use-api'
import CemeteriesApis from '@/src/api/cemeteries'
import customToast from '@/src/components/core/toast/CustomToast'

type Props = {
  cementery: ICemetery
}

const CemeteryTableRow = ({ cementery }: Props) => {
  const { t } = useTranslation(['g:button'])
  const { cemeteries } = useAppSelector(selectCemeteries)
  const api = useApi()
  const { address, city, name, slug, cemeteryId } = cementery
  const dispatch = useAppDispatch()

  const handleDelete = useCallback(async () => {
    try {
      await api.delete(CemeteriesApis.deleteCemetery(cemeteryId))

      if (cemeteries) {
        dispatch(setCemeteries({ ...cemeteries, items: cemeteries.items.filter((obj) => obj.cemeteryId !== cemeteryId) }))
      }
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [cemeteries, cemeteryId])

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

import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import InputTextSearch from '../../../../components/core/input/InputTextSearch'
import MainButton from '../../../../components/core/buttons/MainButton'
import { setModal } from '../../../../state/shared/modal'
import { useAppDispatch } from '../../../../state/redux-hooks/reduxHooks'
import { ModalEnums } from '../../../../enum/modal'

const CityTop = () => {
  const { t } = useTranslation(['g', 'tl'])
  const dispatch = useAppDispatch()

  const handleAddNew = useCallback(() => {
    dispatch(setModal(ModalEnums.ADD_CITY))
  }, [])

  return (
    <div className="mb-6 flex gap-x-6 gap-y-4 flex-wrap">
      <div className="bg-white rounded-xxxl w-96">
        <InputTextSearch name="searchTerm" placeholder={t('g:search')} />
      </div>
      <div className="ml-auto">
        <MainButton text={t('g:button.addCity')} variant="contained" size="medium" onClick={handleAddNew} />
      </div>
    </div>
  )
}

export default CityTop

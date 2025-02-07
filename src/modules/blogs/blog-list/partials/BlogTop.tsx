import { useTranslation } from 'react-i18next'
import InputTextSearch from '@/src/components/core/input/InputTextSearch'
import MainButton from '@/src/components/core/buttons/MainButton'
import { useCallback } from 'react'
import { useAppDispatch } from '@/src/state/redux-hooks/reduxHooks'
import { setModal } from '@/src/state/shared/modal'
import { ModalEnums } from '@/src/enum'

const BlogTop = () => {
  const { t } = useTranslation(['g', 'tl'])
  const dispatch = useAppDispatch()

  const handleAddNew = useCallback(() => {
    dispatch(setModal(ModalEnums.ADD_BLOG))
  }, [])

  return (
    <div className="mb-6 flex gap-x-6 gap-y-4 flex-wrap">
      <div className="bg-white rounded-xxxl w-96">
        <InputTextSearch name="searchTerm" placeholder={t('g:search')} />
      </div>
      <div className="ml-auto">
        <MainButton text={t('g:button.addBlog')} variant="contained" size="medium" onClick={handleAddNew} />
      </div>
    </div>
  )
}

export default BlogTop

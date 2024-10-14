import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import QRcodesApis from '../../../api/qrcodes'
import customToast from '../../../components/core/toast/CustomToast'
import { useApi } from '../../../hooks/use-api'
import { useAppDispatch } from '../../../state/redux-hooks/reduxHooks'
import { setQRcodes } from '../../../state/shared/qrcodes'
import QRcodeTop from './partials/QRcodeTop'
import QRcodeTable from './table/QRcodeTable'
import { useSearchParams } from 'react-router-dom'

const AllQRcodes = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const api = useApi()
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['g'])

  const fetchData = useCallback(async (page: string) => {
    try {
      const { data } = await api.get(QRcodesApis.getQRcodes(), { params: { page } })
      dispatch(setQRcodes(data))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [])

  useEffect(() => {
    fetchData(page)
  }, [page])

  return (
    <form className="bg-white rounded-sm border-1 border-light-grey-alt border-solid p-6">
      <QRcodeTop />
      <QRcodeTable />
    </form>
  )
}

export default AllQRcodes

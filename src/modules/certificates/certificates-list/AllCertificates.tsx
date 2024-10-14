import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import CertificatesApis from '../../../api/certificates'
import customToast from '../../../components/core/toast/CustomToast'
import { useApi } from '../../../hooks/use-api'
import { useAppDispatch } from '../../../state/redux-hooks/reduxHooks'
import { setCertificates } from '../../../state/shared/certificates'
import CertificatesTop from './partials/CertificatesTop'
import CertificatesTable from './table/CertificatesTable'

const AllCertificates = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const api = useApi()
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['g'])

  const fetchData = useCallback(async (page: string) => {
    try {
      const { data } = await api.get(CertificatesApis.getCertificates(), { params: { page } })
      dispatch(setCertificates(data))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [])

  useEffect(() => {
    fetchData(page)
  }, [page])

  return (
    <form className="bg-white rounded-sm border-1 border-light-grey-alt border-solid p-6">
      <CertificatesTop />
      <CertificatesTable />
    </form>
  )
}

export default AllCertificates

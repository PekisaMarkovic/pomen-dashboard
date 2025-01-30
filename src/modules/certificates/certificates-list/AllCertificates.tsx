import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import CertificatesApis from '@/src/api/certificates'
import customToast from '@/src/components/core/toast/CustomToast'
import { useApi } from '@/src/hooks/use-api'
import { useAppDispatch } from '@/src/state/redux-hooks/reduxHooks'
import { setCertificates } from '@/src/state/shared/certificates'
import CertificatesTop from '@/src/modules/certificates/certificates-list/partials/CertificatesTop'
import CertificatesTable from '@/src/modules/certificates/certificates-list/table/CertificatesTable'

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

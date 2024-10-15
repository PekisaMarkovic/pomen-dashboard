import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useSearchParams } from 'react-router-dom'
import TributesApis from '../../../../../api/tributes'
import { useAppDispatch, useAppSelector } from '../../../../../state/redux-hooks/reduxHooks'
import { useApi } from '../../../../../hooks/use-api'
import { setTributes } from '../../../../../state/shared/tributes'
import CertificatesApis from '../../../../../api/certificates'
import customToast from '../../../../../components/core/toast/CustomToast'
import { selectCertificates, setCertificateDropdownOptions } from '../../../../../state/shared/certificates'
import TributesTop from '../../../../tributes/tributes-list/partials/TributesTop'
import TributeTable from '../../../../tributes/tributes-list/table/TributeTable'

const CertificateTributes = () => {
  const { toEditCertificate } = useAppSelector(selectCertificates)
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const api = useApi()
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['g'])

  const fetchData = useCallback(async (page: string) => {
    try {
      const { data } = await api.get(TributesApis.getTributesByCertificateId(toEditCertificate!.certificateId), { params: { page } })
      dispatch(setTributes(data))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [])

  const fetchCertificateDropDown = useCallback(async () => {
    try {
      const { data } = await api.get(CertificatesApis.getCertificateOptions())
      dispatch(setCertificateDropdownOptions(data))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [])

  useEffect(() => {
    fetchCertificateDropDown()
  }, [])

  useEffect(() => {
    fetchData(page)
  }, [page])

  return (
    <form className="bg-white rounded-sm border-1 border-light-grey-alt border-solid p-6 mt-4">
      <TributesTop />
      <TributeTable />
    </form>
  )
}

export default CertificateTributes

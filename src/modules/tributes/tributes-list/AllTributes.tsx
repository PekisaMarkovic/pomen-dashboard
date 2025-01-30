import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import TributesApis from '@/src/api/tributes'
import customToast from '@/src/components/core/toast/CustomToast'
import { useApi } from '@/src/hooks/use-api'
import { useAppDispatch } from '@/src/state/redux-hooks/reduxHooks'
import { setTributes } from '@/src/state/shared/tributes'
import TributesTop from './partials/TributesTop'
import TributeTable from './table/TributeTable'
import CertificatesApis from '@/src/api/certificates'
import { setCertificateDropdownOptions } from '@/src/state/shared/certificates'
import { useSearchParams } from 'react-router-dom'
import { ModalEnums } from '@/src/enum/modal'

const AllTributes = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const api = useApi()
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['g'])

  const fetchData = useCallback(async (page: string) => {
    try {
      const { data } = await api.get(TributesApis.getTributes(), { params: { page } })
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
    <form className="bg-white rounded-sm border-1 border-light-grey-alt border-solid p-6">
      <TributesTop type={ModalEnums.ADD_TRIBUTE} />
      <TributeTable />
    </form>
  )
}

export default AllTributes

import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import TributesApis from '../../../api/tributes'
import customToast from '../../../components/core/toast/CustomToast'
import { useApi } from '../../../hooks/use-api'
import { useAppDispatch } from '../../../state/redux-hooks/reduxHooks'
import { setTributes } from '../../../state/shared/tributes'
import TributesTop from './partials/TributesTop'
import TributeTable from './table/TributeTable'
import CertificatesApis from '../../../api/certificates'
import { setCertificateDropdownOptions } from '../../../state/shared/certificates'
import { useSearchParams } from 'react-router-dom'
import { ModalEnums } from '../../../enum/modal'

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

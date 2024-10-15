import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import CertificatesApis from '../../../api/certificates'
import GetheringsApis from '../../../api/getherings'
import customToast from '../../../components/core/toast/CustomToast'
import { useApi } from '../../../hooks/use-api'
import { useAppDispatch } from '../../../state/redux-hooks/reduxHooks'
import { setCertificateDropdownOptions } from '../../../state/shared/certificates'
import { setGetherings } from '../../../state/shared/getherings'
import GetheringsTop from './partials/GetheringsTop'
import GetheringsTable from './table/GetheringsTable'
import { setCityDropdownOptions } from '../../../state/shared/cities'
import CitiesApis from '../../../api/cities'
import { useSearchParams } from 'react-router-dom'
import { ModalEnums } from '../../../enum/modal'

const AllGetherings = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const api = useApi()
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['g'])

  const fetchData = useCallback(async (page: string) => {
    try {
      const { data } = await api.get(GetheringsApis.getGetherings(), { params: { page } })
      dispatch(setGetherings(data))
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

  const fetchCityDropDown = useCallback(async () => {
    try {
      const { data } = await api.get(CitiesApis.getCityOptions())
      dispatch(setCityDropdownOptions(data))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [])

  useEffect(() => {
    fetchCertificateDropDown()
    fetchCityDropDown()
  }, [])

  useEffect(() => {
    fetchData(page)
  }, [page])

  return (
    <form className="bg-white rounded-sm border-1 border-light-grey-alt border-solid p-6">
      <GetheringsTop type={ModalEnums.ADD_GETHERING} />
      <GetheringsTable />
    </form>
  )
}

export default AllGetherings

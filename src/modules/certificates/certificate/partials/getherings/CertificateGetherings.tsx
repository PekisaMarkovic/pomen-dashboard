import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useSearchParams } from 'react-router-dom'
import { useApi } from '../../../../../hooks/use-api'
import { useAppDispatch, useAppSelector } from '../../../../../state/redux-hooks/reduxHooks'
import GetheringsApis from '../../../../../api/getherings'
import { setGetherings } from '../../../../../state/shared/getherings'
import customToast from '../../../../../components/core/toast/CustomToast'
import CertificatesApis from '../../../../../api/certificates'
import { selectCertificates, setCertificateDropdownOptions } from '../../../../../state/shared/certificates'
import CitiesApis from '../../../../../api/cities'
import { setCityDropdownOptions } from '../../../../../state/shared/cities'
import GetheringsTop from '../../../../getherings/gethering-list/partials/GetheringsTop'
import GetheringsTable from '../../../../getherings/gethering-list/table/GetheringsTable'
import DataSection from '../../../../../components/section/DataSection'
import { ModalEnums } from '../../../../../enum/modal'
import { IGethering } from '../../../../../interfaces/getherings'
import { Paginated } from '../../../../../interfaces/general'

const CertificateGetherings = () => {
  const { toEditCertificate } = useAppSelector(selectCertificates)
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const api = useApi()
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['g'])

  const fetchData = useCallback(async (page: string) => {
    try {
      const { data } = await api.get<Paginated<IGethering>>(GetheringsApis.getGetheringsByCertificateId(toEditCertificate!.certificateId), {
        params: { page },
      })
      data.items.map((item) => {
        item.certificate = toEditCertificate
        return item
      })
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
    <DataSection
      tooltip={t('certificate:getherings.tooltip')}
      title={t('certificate:getherings.title')}
      subtitle={t('certificate:getherings.subtitle')}
    >
      <GetheringsTop type={ModalEnums.ADD_GETHERING_FOR_CERTIFICAT} />
      <GetheringsTable />
    </DataSection>
  )
}

export default CertificateGetherings

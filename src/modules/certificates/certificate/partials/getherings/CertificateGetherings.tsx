import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useSearchParams } from 'react-router-dom'
import { useApi } from '@/src//hooks/use-api'
import { useAppDispatch, useAppSelector } from '@/src//state/redux-hooks/reduxHooks'
import GetheringsApis from '@/src//api/getherings'
import { setGetherings } from '@/src/state/shared/getherings'
import customToast from '@/src//components/core/toast/CustomToast'
import CertificatesApis from '@/src//api/certificates'
import { selectCertificates, setCertificateDropdownOptions } from '@/src/state/shared/certificates'
import CitiesApis from '@/src//api/cities'
import { setCityDropdownOptions } from '@/src/state/shared/cities'

import DataSection from '@/src//components/section/DataSection'
import { ModalEnums } from '@/src//enum/modal'
import { IGethering } from '@/src//interfaces/getherings'
import { Paginated } from '@/src//interfaces/general'
import GetheringsTop from '@/src/modules/getherings/gethering-list/partials/GetheringsTop'
import GetheringsTable from '@/src/modules/getherings/gethering-list/table/GetheringsTable'

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

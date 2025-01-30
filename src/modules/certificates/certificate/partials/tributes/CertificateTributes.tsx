import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useSearchParams } from 'react-router-dom'
import TributesApis from '@/src//api/tributes'
import { useAppDispatch, useAppSelector } from '@/src//state/redux-hooks/reduxHooks'
import { useApi } from '@/src//hooks/use-api'
import { setTributes } from '@/src//state/shared/tributes'
import CertificatesApis from '@/src//api/certificates'
import customToast from '@/src//components/core/toast/CustomToast'
import { selectCertificates, setCertificateDropdownOptions } from '@/src//state/shared/certificates'
import DataSection from '@/src/components/section/DataSection'
import { ModalEnums } from '@/src/enum/modal'
import { ITribute } from '@/src/interfaces/tributes'
import { Paginated } from '@/src/interfaces/general'
import TributesTop from '@/src/modules/tributes/tributes-list/partials/TributesTop'
import TributeTable from '@/src/modules/tributes/tributes-list/table/TributeTable'

const CertificateTributes = () => {
  const { toEditCertificate } = useAppSelector(selectCertificates)
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const api = useApi()
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['g', 'certificate'])

  const fetchData = useCallback(async (page: string) => {
    try {
      const { data } = await api.get<Paginated<ITribute>>(TributesApis.getTributesByCertificateId(toEditCertificate!.certificateId), {
        params: { page },
      })

      data.items.map((item) => {
        item.certificate = toEditCertificate
        return item
      })

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
    <DataSection tooltip={t('certificate:tributes.tooltip')} title={t('certificate:tributes.title')} subtitle={t('certificate:tributes.subtitle')}>
      <TributesTop type={ModalEnums.ADD_TRIBUTE_FOR_CERTIFICATE} />
      <TributeTable />
    </DataSection>
  )
}

export default CertificateTributes

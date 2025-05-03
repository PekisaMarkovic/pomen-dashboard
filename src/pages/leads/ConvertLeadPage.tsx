import CemeteriesApis from '@/src/api/cemeteries'
import CitiesApis from '@/src/api/cities'
import LeadsApis from '@/src/api/leads'
import PricingsApis from '@/src/api/pricing'
import customToast from '@/src/components/core/toast/CustomToast'
import { useApi } from '@/src/hooks/use-api'
import { mapToConvertLead } from '@/src/mapper/lead'
import ConvertLead from '@/src/modules/convert-lead/ConvertLead'
import { useAppDispatch, useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { setCemeteryDropdownOptions } from '@/src/state/shared/cemeteries'
import { setCityDropdownOptions } from '@/src/state/shared/cities'
import { selectLeads, setToConvertLead } from '@/src/state/shared/leads'
import { selectPricings, setPricingDropdownOptions } from '@/src/state/shared/pricings'
import { CREATE_CERTIFICATE_VALIDATION } from '@/src/validations/certificates/create-certificate-with-user'
import { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const ConvertLeadPage = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['g'])
  const api = useApi()
  const { toConvertLead } = useAppSelector(selectLeads)
  const { id } = useParams()

  const fetchCemeteryDropdownOptions = useCallback(async () => {
    try {
      const { data } = await api.get(CemeteriesApis.getCemeteryOptions())
      dispatch(setCemeteryDropdownOptions(data))
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

  const fetchPricingPlanDropDown = useCallback(async () => {
    try {
      const { data } = await api.get(PricingsApis.getPricingOptions())
      dispatch(setPricingDropdownOptions(data))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [])

  const fetchLead = useCallback(async () => {
    try {
      const { data } = await api.get(LeadsApis.getLeadById(Number(id)))
      dispatch(setToConvertLead(data))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [id])

  useEffect(() => {
    fetchCemeteryDropdownOptions()
    fetchCityDropDown()
    fetchPricingPlanDropDown()
  }, [])

  useEffect(() => {
    if (!toConvertLead) {
      fetchLead()
    }
  }, [toConvertLead])

  return <>{toConvertLead ? <ConvertLeadPageForm /> : null}</>
}

const ConvertLeadPageForm = () => {
  const { toConvertLead } = useAppSelector(selectLeads)
  const { dropdownOptions: pricingOptions } = useAppSelector(selectPricings)

  const methods = useForm({
    defaultValues: mapToConvertLead({
      lead: toConvertLead!,
      pricingOptions: pricingOptions.options,
    }),
    resolver: CREATE_CERTIFICATE_VALIDATION,
  })

  return (
    <FormProvider {...methods}>
      <ConvertLead />
    </FormProvider>
  )
}

export default ConvertLeadPage

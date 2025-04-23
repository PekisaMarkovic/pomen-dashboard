import CertificatesApis from '@/src/api/certificates'
import MainButton from '@/src/components/core/buttons/MainButton'
import InputText from '@/src/components/core/input/InputText'
import InputTextarea from '@/src/components/core/input/InputTextarea'
import DateSelect from '@/src/components/core/select/DateSelect'
import customToast from '@/src/components/core/toast/CustomToast'
import Heading from '@/src/components/core/typography/Heading'
import { ROUTE_NAMES } from '@/src/constatns/a-routes'
import { LeadStatusEnums } from '@/src/enum'
import { useApi } from '@/src/hooks/use-api'
import { ICertificate, Nullable } from '@/src/interfaces'
import { mapPricingDropdownToSelectOptions } from '@/src/mapper/options'
import { useAppDispatch, useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { removeToConvertLead, selectLeads } from '@/src/state/shared/leads'
import { removeModal } from '@/src/state/shared/modal'
import { selectPricings } from '@/src/state/shared/pricings'
import { useCallback, useEffect, useState } from 'react'
import { FieldValues, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import SingleSelect from '../../core/select/SingleSelect'

const ConvertLeadModal = () => {
  const { toConvertLead } = useAppSelector(selectLeads)
  const { dropdownOptions } = useAppSelector(selectPricings)
  const findPricing = dropdownOptions.options.find((pr) => pr.pricingId === toConvertLead?.pricingId)

  const methods = useForm({
    defaultValues: {
      ...toConvertLead,
      pricing: { id: `${findPricing?.pricingId}`, name: findPricing?.plan || '', value: findPricing?.price || '' },
    },
  })

  return (
    <FormProvider {...methods}>
      <ConvertLeadModalForm />
    </FormProvider>
  )
}

const ConvertLeadModalForm = () => {
  const [certificate, setCertificate] = useState<Nullable<ICertificate>>(null)
  const { toConvertLead } = useAppSelector(selectLeads)
  const { t } = useTranslation(['leads', 'g'])
  const { handleSubmit } = useFormContext()
  const dispatch = useAppDispatch()
  const api = useApi()
  const { dropdownOptions } = useAppSelector(selectPricings)
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    try {
      if (toConvertLead?.status !== LeadStatusEnums.CONVERTED) {
        navigate(`${ROUTE_NAMES.convertLead}/${toConvertLead?.leadId}`)
      } else {
        navigate(`${ROUTE_NAMES.certificates}/${certificate?.certificateId}`)
      }
    } catch {
      customToast.error(t('g:errorMessage'))
    } finally {
      dispatch(removeModal())
      dispatch(removeToConvertLead())
    }
  }

  const fetchConvertedCertificate = useCallback(async () => {
    try {
      if (toConvertLead?.status === LeadStatusEnums.CONVERTED) {
        const { data } = await api.get<ICertificate>(CertificatesApis.getCertificatesByLeadId(toConvertLead!.leadId))

        setCertificate(data)
      }
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [toConvertLead])

  useEffect(() => {
    fetchConvertedCertificate()
  }, [])

  return (
    <>
      <Heading text={t('leads:add.title')} variant="2" size="base" color="grey" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4 mt-6">
        <InputText
          isRequired
          name="firstNameForCertificate"
          label={t('leads:add.fields.firstNameForCertificate')}
          placeholder={t('leads:add.fields.firstNameForCertificatePlh')}
          disabled
        />

        <InputText
          isRequired
          name="lastNameForCertificate"
          label={t('leads:add.fields.lastNameForCertificate')}
          placeholder={t('leads:add.fields.lastNameForCertificatePlh')}
          disabled
        />

        <DateSelect
          isRequired
          name="dateOfBirth"
          label={t('leads:add.fields.dateOfBirth')}
          placeholder={t('leads:add.fields.dateOfBirthPlh')}
          isDisabled
        />

        <DateSelect
          isRequired
          name="dateOfDeath"
          label={t('leads:add.fields.dateOfDeath')}
          placeholder={t('leads:add.fields.dateOfDeathPlh')}
          isDisabled
        />

        <div className="w-full h-px bg-grey my-4" />

        {dropdownOptions.isLoad && (
          <SingleSelect
            name="pricing"
            options={mapPricingDropdownToSelectOptions(dropdownOptions.options)}
            label={t('leads:add.fields.pricing')}
            placeholder={t('leads:add.fields.pricingPlh')}
            isDisabled
          />
        )}

        <InputText isRequired name="firstName" label={t('leads:add.fields.firstName')} placeholder={t('leads:add.fields.firstNamePlh')} disabled />

        <InputText isRequired name="lastName" label={t('leads:add.fields.lastName')} placeholder={t('leads:add.fields.lastNamePlh')} disabled />

        <InputText isRequired name="address" label={t('leads:add.fields.address')} placeholder={t('leads:add.fields.addressPlh')} disabled />

        <InputText
          isRequired
          name="phoneNumber"
          label={t('leads:add.fields.phoneNumber')}
          placeholder={t('leads:add.fields.phoneNumberPlh')}
          disabled
        />

        <InputText
          isRequired
          name="phoneNumber"
          label={t('leads:add.fields.phoneNumber')}
          placeholder={t('leads:add.fields.phoneNumberPlh')}
          disabled
        />

        <InputTextarea isRequired name="note" label={t('leads:add.fields.note')} placeholder={t('leads:add.fields.notePlh')} />

        <div className="flex justify-center">
          <MainButton text={t('g:button.submit')} variant="contained" size="medium" htmlType="submit" />
        </div>
      </form>
    </>
  )
}

export default ConvertLeadModal

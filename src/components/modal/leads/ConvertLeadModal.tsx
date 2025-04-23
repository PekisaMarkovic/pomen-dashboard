import MainButton from '@/src/components/core/buttons/MainButton'
import InputText from '@/src/components/core/input/InputText'
import InputTextarea from '@/src/components/core/input/InputTextarea'
import Heading from '@/src/components/core/typography/Heading'
import { useAppDispatch, useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { removeToConvertLead, selectLeads, updateLeadsStatus } from '@/src/state/shared/leads'
import { FieldValues, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import DateSelect from '@/src/components/core/select/DateSelect'
import LeadsApis from '@/src/api/leads'
import { LeadStatusEnums } from '@/src/enum'
import { useApi } from '@/src/hooks/use-api'
import customToast from '@/src/components/core/toast/CustomToast'
import SingleSelect from '../../core/select/SingleSelect'
import { selectPricings } from '@/src/state/shared/pricings'
import { mapPricingDropdownToSelectOptions } from '@/src/mapper/options'
import { useEffect } from 'react'

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
  const { toConvertLead } = useAppSelector(selectLeads)
  const { t } = useTranslation(['leads', 'g'])
  const { handleSubmit } = useFormContext()
  const dispatch = useAppDispatch()
  const api = useApi()
  const { dropdownOptions } = useAppSelector(selectPricings)

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    try {
      await api.patch(LeadsApis.patchLeadStatus(toConvertLead!.leadId), { status: LeadStatusEnums.CONVERTED })
      dispatch(updateLeadsStatus({ leadId: toConvertLead!.leadId, status: LeadStatusEnums.CONVERTED }))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }

  useEffect(() => {
    return () => {
      dispatch(removeToConvertLead())
    }
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

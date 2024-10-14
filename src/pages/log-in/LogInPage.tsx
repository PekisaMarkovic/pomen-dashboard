import { FormProvider, useForm } from 'react-hook-form'
import LogInDetails from '../../modules/log-in/LogInDetails'
import { LOG_IN_VALIDATION } from '../../validations/log-in/log-in'
import LandingLayout from '../../layouts/LandingLayout'
import { useTranslation } from 'react-i18next'

const LogInPage = () => {
  const methods = useForm({ resolver: LOG_IN_VALIDATION })
  const { t } = useTranslation(['log-in'])

  return (
    <FormProvider {...methods}>
      <LandingLayout title={t('log-in:title')}>
        <LogInDetails />
      </LandingLayout>
    </FormProvider>
  )
}

export default LogInPage

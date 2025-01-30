import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import LandingLayout from '@/src/layouts/LandingLayout'
import SignUpDetails from '@/src/modules/log-in/SignUpDetails'
import { SIGN_UP_VALIDATION } from '@/src/validations/log-in/sign-up'

const SignUpPage = () => {
  const methods = useForm({ resolver: SIGN_UP_VALIDATION })
  const { t } = useTranslation(['log-in'])

  return (
    <FormProvider {...methods}>
      <LandingLayout title={t('log-in:titleSignUp')}>
        <SignUpDetails />
      </LandingLayout>
    </FormProvider>
  )
}

export default SignUpPage

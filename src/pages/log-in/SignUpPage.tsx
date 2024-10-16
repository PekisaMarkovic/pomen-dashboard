import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import LandingLayout from '../../layouts/LandingLayout'
import SignUpDetails from '../../modules/log-in/SignUpDetails'
import { SIGN_UP_VALIDATION } from '../../validations/log-in/sign-up'

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

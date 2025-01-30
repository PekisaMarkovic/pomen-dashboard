import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import LandingLayout from '@/src/layouts/LandingLayout'
import FirstTimeRegisterDetails from '@/src/modules/log-in/FirstTimeRegisterDetails'
import { FIRST_TIME_REGISTER_VALIDATION } from '@/src/validations/log-in/first-time-register'
import { useNavigate, useParams } from 'react-router-dom'
import { useApi } from '@/src/hooks/use-api'
import { useEffect, useState } from 'react'
import { ROUTE_NAMES } from '@/src/constatns/a-routes'
import UserApis from '@/src/api/user'
import InvalidFistTimeRegisterToken from '@/src/modules/log-in/partials/InvalidFistTimeRegisterToken'

const FirstTimeRegisterPage = () => {
  const methods = useForm({ resolver: FIRST_TIME_REGISTER_VALIDATION })
  const { t } = useTranslation(['log-in'])
  const navigate = useNavigate()
  const { token } = useParams()
  const api = useApi()
  const [isLoad, setIsLoad] = useState<boolean>(false)
  const [isValid, setIsValid] = useState<boolean>(false)

  const checkToken = async () => {
    try {
      const { data } = await api.post(UserApis.getCheckIfFistTimeRegisterIsValid(), { token })
      setIsValid(data)
    } catch {
      navigate(ROUTE_NAMES.index)
    } finally {
      setIsLoad(true)
    }
  }

  useEffect(() => {
    if (!token) {
      navigate(ROUTE_NAMES.index)
    } else {
      checkToken()
    }
  }, [])

  return (
    <FormProvider {...methods}>
      <LandingLayout title={t('log-in:titleSignUp')}>
        {isLoad && <>{isValid ? <FirstTimeRegisterDetails /> : <InvalidFistTimeRegisterToken />}</>}
      </LandingLayout>
    </FormProvider>
  )
}

export default FirstTimeRegisterPage

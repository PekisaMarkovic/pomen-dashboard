import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import LandingLayout from '../../layouts/LandingLayout'
import FirstTimeRegisterDetails from '../../modules/log-in/FirstTimeRegisterDetails'
import { FIRST_TIME_REGISTER_VALIDATION } from '../../validations/log-in/first-time-register'
import { useNavigate, useParams } from 'react-router-dom'
import { useApi } from '../../hooks/use-api'
import { useEffect, useState } from 'react'
import { ROUTE_NAMES } from '../../constatns/a-routes'
import UserApis from '../../api/user'
import InvalidFistTimeRegisterToken from '../../modules/log-in/partials/InvalidFIstTimeRegisterToken'

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

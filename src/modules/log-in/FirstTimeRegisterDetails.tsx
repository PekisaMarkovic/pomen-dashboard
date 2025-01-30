import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import AuthApis from '@/src/api/auth'
import MainButton from '@/src/components/core/buttons/MainButton'
import InputText from '@/src/components/core/input/InputText'
import customToast from '@/src/components/core/toast/CustomToast'
import { ROUTE_NAMES } from '@/src/constatns/a-routes'
import { useApi } from '@/src/hooks/use-api'
import { signIn } from '@/src/utils/auth'
import { decodeToken } from '@/src/utils/token'
import Paragraph from '@/src/components/core/typography/Paragraph'
import MainLink from '@/src/components/core/buttons/MainLink'
import { jwtDecode } from 'jwt-decode'

const FirstTimeRegisterDetails = () => {
  const { t } = useTranslation(['log-in', 'g'])
  const { handleSubmit } = useFormContext()
  const api = useApi()
  const navigate = useNavigate()
  const { token } = useParams()

  const handleSubmitForm: SubmitHandler<FieldValues> = async (values) => {
    const { phoneNumber, ...rest } = values
    try {
      const decoded = jwtDecode<{ email: string }>(token!)

      const { data } = await api.patch(AuthApis.updateFirstTimeRegister(), { email: decoded.email, token, phone: phoneNumber, ...rest })
      const tokenPayload = decodeToken(data.access_token)

      signIn(data)
      customToast.success(t('static:welcome', { name: `${tokenPayload.firstName} ${tokenPayload.lastName}` }))
      navigate(ROUTE_NAMES.dashboard)
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }

  return (
    <form className="w-full flex flex-col gap-y-4 mt-8" onSubmit={handleSubmit(handleSubmitForm)}>
      <InputText isRequired name="firstName" label={t('log-in:fields.firstName')} placeholder={t('log-in:fields.firstNamePlh')} />

      <InputText isRequired name="lastName" label={t('log-in:fields.lastName')} placeholder={t('log-in:fields.lastNamePlh')} />

      <InputText isRequired name="phoneNumber" label={t('log-in:fields.phoneNumber')} placeholder={t('log-in:fields.phoneNumberPlh')} />

      <InputText isRequired name="password" label={t('log-in:fields.password')} placeholder={t('log-in:fields.passwordPlh')} typeHtml="password" />

      <MainButton text={t('g:button.signIn')} variant="contained" size="medium" htmlType="submit" className="justify-center" />

      <div className="flex justify-center">
        <Paragraph text={t('g:button.or')} size="sm" color="dark-grey" />
      </div>

      <MainLink href={ROUTE_NAMES.signUp} text={t('log-in:register')} variant="alternative" size="medium" className="justify-center" />
    </form>
  )
}

export default FirstTimeRegisterDetails

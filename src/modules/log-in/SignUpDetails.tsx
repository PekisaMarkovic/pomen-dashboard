import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import MainLink from '../../components/core/buttons/MainLink'
import InputText from '../../components/core/input/InputText'
import customToast from '../../components/core/toast/CustomToast'
import { ROUTE_NAMES } from '../../constatns/a-routes'
import Paragraph from '../../components/core/typography/Paragraph'
import MainButton from '../../components/core/buttons/MainButton'
import { jwtDecode } from 'jwt-decode'
import { useApi } from '../../hooks/use-api'
import { decodeToken } from '../../utils/token'
import AuthApis from '../../api/auth'
import { signIn } from '../../utils/auth'

const SignUpDetails = () => {
  const { t } = useTranslation(['log-in', 'g'])
  const { handleSubmit } = useFormContext()
  const navigate = useNavigate()
  const api = useApi()
  const { token } = useParams()

  const handleSubmitForm: SubmitHandler<FieldValues> = async (values) => {
    const { phoneNumber, ...rest } = values
    try {
      const decoded = jwtDecode<{ email: string }>(token!)

      const { data } = await api.post(AuthApis.register(), { email: decoded.email, phone: phoneNumber, ...rest })
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

      <InputText isRequired name="email" label={t('log-in:fields.email')} placeholder={t('log-in:fields.emailPlh')} />

      <InputText isRequired name="phoneNumber" label={t('log-in:fields.phoneNumber')} placeholder={t('log-in:fields.phoneNumberPlh')} />

      <InputText isRequired name="password" label={t('log-in:fields.password')} placeholder={t('log-in:fields.passwordPlh')} typeHtml="password" />

      <MainButton text={t('g:button.signIn')} variant="contained" size="medium" htmlType="submit" className="justify-center" />

      <div className="flex justify-center">
        <Paragraph text={t('g:button.or')} size="sm" color="dark-grey" />
      </div>

      <MainLink href={ROUTE_NAMES.index} text={t('log-in:log-in')} variant="alternative" size="medium" className="justify-center" />
    </form>
  )
}

export default SignUpDetails

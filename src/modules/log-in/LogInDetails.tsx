import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import AuthApis from '../../api/auth'
import MainButton from '../../components/core/buttons/MainButton'
import InputText from '../../components/core/input/InputText'
import customToast from '../../components/core/toast/CustomToast'
import { ROUTE_NAMES } from '../../constatns/a-routes'
import { useApi } from '../../hooks/use-api'
import { signIn } from '../../utils/auth'
import { decodeToken } from '../../utils/token'
import Paragraph from '../../components/core/typography/Paragraph'
import MainLink from '../../components/core/buttons/MainLink'

const LogInDetails = () => {
  const { t } = useTranslation(['log-in', 'g'])
  const { handleSubmit } = useFormContext()
  const api = useApi()
  const navigate = useNavigate()

  const handleSubmitForm: SubmitHandler<FieldValues> = async (values) => {
    try {
      const { data } = await api.post(AuthApis.logIn(), values)
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
      <InputText isRequired name="email" label={t('log-in:fields.email')} placeholder={t('log-in:fields.emailPlh')} />
      <InputText isRequired name="password" label={t('log-in:fields.password')} placeholder={t('log-in:fields.passwordPlh')} typeHtml="password" />

      <MainButton text={t('g:button.signIn')} variant="contained" size="medium" htmlType="submit" className="justify-center" />

      <div className="flex justify-center">
        <Paragraph text={t('g:button.or')} size="sm" color="dark-grey" />
      </div>

      <MainLink href={ROUTE_NAMES.signUp} text={t('log-in:register')} variant="alternative" size="medium" className="justify-center" />
    </form>
  )
}

export default LogInDetails

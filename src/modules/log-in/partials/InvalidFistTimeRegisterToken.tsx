import { useTranslation } from 'react-i18next'

import { useParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import { useApi } from '../../../hooks/use-api'
import Paragraph from '../../../components/core/typography/Paragraph'
import MainButton from '../../../components/core/buttons/MainButton'
import { ROUTE_NAMES } from '../../../constatns/a-routes'
import MainLink from '../../../components/core/buttons/MainLink'
import customToast from '../../../components/core/toast/CustomToast'
import UserApis from '../../../api/user'

const InvalidFistTimeRegisterToken = () => {
  const [showInfoMessage, setShowInfoMessage] = useState<boolean>(false)
  const { t } = useTranslation(['log-in', 'g'])
  const api = useApi()
  const { token } = useParams()

  const resendToken = async () => {
    const decoded = jwtDecode<{ email: string }>(token!)

    try {
      await api.post(UserApis.resendFirstTimeRegisterToken(), { email: decoded.email })
      setShowInfoMessage(true)
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }

  return (
    <form className="w-full flex flex-col gap-y-4 mt-8">
      <Paragraph
        text={showInfoMessage ? t('log-in:sign-up.newLinkSend') : t('log-in:sign-up.tokenExpired')}
        size="lg"
        color={showInfoMessage ? 'green' : 'red'}
        className="mb-2 text-center ml-auto mr-auto"
      />

      {!showInfoMessage && (
        <>
          <MainButton
            text={t('log-in:sign-up.resendLink')}
            variant="contained"
            size="medium"
            htmlType="button"
            className="justify-center"
            onClick={resendToken}
          />

          <div className="flex justify-center">
            <Paragraph text={t('g:button.or')} size="sm" color="dark-grey" />
          </div>
        </>
      )}

      <MainLink href={ROUTE_NAMES.index} text={t('g:button.signIn')} variant="alternative" size="medium" className="justify-center" />
    </form>
  )
}

export default InvalidFistTimeRegisterToken

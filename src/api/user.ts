const base = 'users'

const getCheckIfFistTimeRegisterIsValid = () => `${base}/is-fist-time-register-token-valid`
const resendFirstTimeRegisterToken = () => `${base}/resend-first-time-registration`

const UserApis = {
  getCheckIfFistTimeRegisterIsValid,
  resendFirstTimeRegisterToken,
}

export default UserApis

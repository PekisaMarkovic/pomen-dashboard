const base = 'users'

const getCheckIfFistTimeRegisterIsValid = () => `${base}/is-fist-time-register-token-valid`
const resendFirstTimeRegisterToken = () => `${base}/resend-first-time-registration`
const patchUserProfile = (email: string) => `${base}/${email}`

const UserApis = {
  getCheckIfFistTimeRegisterIsValid,
  resendFirstTimeRegisterToken,
  patchUserProfile,
}

export default UserApis

const base = 'auth'

const logIn = () => `${base}/login`
const register = () => `${base}/register`
const refresh = () => `${base}/refresh`
const logout = () => `${base}/logout`
const imageSign = () => `${base}/image-sign`
const file = () => `${base}/file-upload`
const isUserTokenValid = () => `${base}/is-user-token-valid`
const updateFirstTimeRegister = () => `${base}/update-fist-time-register`

const AuthApis = {
  logIn,
  register,
  imageSign,
  updateFirstTimeRegister,
  refresh,
  file,
  logout,
  isUserTokenValid,
}

export default AuthApis

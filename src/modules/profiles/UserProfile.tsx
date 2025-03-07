import FileApis from '@/src/api/files'
import { FileTypeEnum, SaveDisabledEnums } from '@/src/enum'
import { useApi } from '@/src/hooks/use-api'
import { ICreateFile } from '@/src/interfaces'
import GeneralLayout from '@/src/layouts/GeneralLayout'
import UserInfo from '@/src/pages/profile/partials/UserInfo'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import customToast from '@/src/components/core/toast/CustomToast'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { handleDisableSave, handleAllowSave } from '@/src/state/shared/behaviours'
import UserApis from '@/src/api/user'
import { formatDateYearMonthDay } from '@/src/utils/date'
import { selectAuthUser, setUserProfileData } from '@/src/state/user/authSlice'

const UserProfile = () => {
  const { user } = useAppSelector(selectAuthUser)

  const { t } = useTranslation(['g', 'certificate'])

  const api = useApi()
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      const { profileImage, dateOfBirth, email, ...rest } = values
      dispatch(handleDisableSave(SaveDisabledEnums.EDIT_PROFILE))

      await api.patch(UserApis.patchUserProfile(email), {
        ...rest,
        dateOfBirth: formatDateYearMonthDay(dateOfBirth),
      })

      if (profileImage?.fileId !== null && profileImage?.fileId !== undefined) {
        const newProfile: ICreateFile = {
          height: profileImage.height,
          publicId: profileImage.publicId,
          type: FileTypeEnum.IMAGE,
          url: profileImage.url,
          fileExtension: profileImage.fileExtension,
          width: profileImage.width,
        }
        await api.post(FileApis.uploadUserProfile(email), newProfile)
      }
      if (user) {
        dispatch(
          setUserProfileData({
            user: {
              ...user,
              dateOfBirth,
              firstName: values.firstName,
              lastName: values.lastName,
              gender: values.gender,
              phoneNumber: values.phoneNumber,
              profileImage: profileImage?.url || '',
            },
          }),
        )
      }
    } catch {
      customToast.error(t('g:errorMessage'))
    } finally {
      dispatch(handleAllowSave(SaveDisabledEnums.EDIT_PROFILE))
    }
  }

  return (
    <GeneralLayout type="GENERAL_FORM" submit={onSubmit}>
      <UserInfo />
    </GeneralLayout>
  )
}

export default UserProfile

import { FileTypeEnum } from '@/src/enum'
import UserProfile from '@/src/modules/profiles/UserProfile'
import { useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { selectAuthUser } from '@/src/state/user/authSlice'
import { UPDATE_PROFILE_VALIDATION } from '@/src/validations/users/profile'
import { FormProvider, useForm } from 'react-hook-form'

const UserProfilePage = () => {
  const { user } = useAppSelector(selectAuthUser)
  const methods = useForm({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      gender: user?.gender || '',
      phoneNumber: user?.phoneNumber || '',
      email: user?.email || '',
      dateOfBirth: user?.dateOfBirth || undefined,
      profileImage: {
        type: FileTypeEnum.IMAGE,
        url: user?.profileImage || '',
      },
    },
    resolver: UPDATE_PROFILE_VALIDATION,
  })

  return (
    <FormProvider {...methods}>
      <UserProfile />
    </FormProvider>
  )
}

export default UserProfilePage

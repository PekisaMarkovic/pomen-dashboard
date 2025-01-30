import { useCallback, useEffect } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import CemeteriesApis from '@/src/api/cemeteries'
import CertificatesApis from '@/src/api/certificates'
import CitiesApis from '@/src/api/cities'
import customToast from '@/src/components/core/toast/CustomToast'
import { useApi } from '@/src/hooks/use-api'
import GeneralLayout from '@/src/layouts/GeneralLayout'
import { useAppDispatch, useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { setCemeteryDropdownOptions } from '@/src/state/shared/cemeteries'
import { selectCertificates } from '@/src/state/shared/certificates'
import { setCityDropdownOptions } from '@/src/state/shared/cities'
import { formatDateYearMonthDay } from '@/src/utils/date'
import CertificateCemeteryDetails from '@/src/modules/certificates/certificate/partials/CertificateCemeteryDetails'
import CertificateFiles from '@/src/modules/certificates/certificate/partials/CertificateFiles'
import CertificateLifeDetails from '@/src/modules/certificates/certificate/partials/CertificateLifeDetails'
import CertificateTabs from '@/src/modules/certificates/certificate/partials/CertificateTabs'
import FileApis from '@/src/api/files'
import { ICreateFile, IFile } from '@/src/interfaces/image'
import { FileTypeEnum } from '@/src/enum/file'
import { handleAllowSave, handleDisableSave } from '@/src/state/shared/behaviours'
import { SaveDisabledEnums } from '@/src/enum/behaviour'

const SingleCertificate = () => {
  const { toEditCertificate } = useAppSelector(selectCertificates)
  const { t } = useTranslation(['g', 'certificate'])
  const dispatch = useAppDispatch()
  const api = useApi()
  const navigate = useNavigate()

  const fetchCemeteryDropdownOptions = useCallback(async () => {
    try {
      const { data } = await api.get(CemeteriesApis.getCemeteryOptions())
      dispatch(setCemeteryDropdownOptions(data))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [])

  const fetchCityDropDown = useCallback(async () => {
    try {
      const { data } = await api.get(CitiesApis.getCityOptions())
      dispatch(setCityDropdownOptions(data))
    } catch {
      customToast.error(t('g:errorMessage'))
    }
  }, [])

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const {
      cemetery,
      dateOfBirth,
      images = [],
      imagesIdsToRemove = [],
      videosIdsToRemove = [],
      videos = [],
      profileImage,
      dateOfDeath,
      city,
      ...rest
    } = values

    try {
      dispatch(handleDisableSave(SaveDisabledEnums.EDIT_CERTIFICATE))

      await api.patch(CertificatesApis.patchCertificate(toEditCertificate!.certificateId), {
        cemeteryId: Number(cemetery.id),
        ...rest,
        dateOfBirth: formatDateYearMonthDay(dateOfBirth),
        dateOfDeath: formatDateYearMonthDay(dateOfDeath),
        ...(city ? { cityId: Number(city.id) } : {}),
      })

      if (!profileImage?.fileId) {
        const newProfile: ICreateFile = {
          height: profileImage.height,
          publicId: profileImage.publicId,
          type: FileTypeEnum.IMAGE,
          url: profileImage.url,
          fileExtension: profileImage.fileExtension,
          width: profileImage.width,
        }
        await api.post(FileApis.uploadCertificateProfile(toEditCertificate!.certificateId), newProfile)
      }

      const filesToAdd: ICreateFile[] = []
      const filesToRemove: number[] = []

      images.forEach((img: IFile) => {
        if (!img?.fileId) {
          filesToAdd.push({
            height: img.height,
            publicId: img.publicId,
            type: FileTypeEnum.IMAGE,
            url: img.url,
            fileExtension: img.fileExtension,
            width: img.width,
          })
        }
      })
      imagesIdsToRemove.forEach((id: number) => filesToRemove.push(Number(id)))

      videos.forEach((video: IFile) => {
        if (!video?.fileId) {
          filesToAdd.push({
            height: video.height,
            publicId: video.publicId,
            type: FileTypeEnum.VIDEO,
            url: video.url,
            fileExtension: video.fileExtension,
            width: video.width,
          })
        }
      })
      videosIdsToRemove.forEach((id: number) => filesToRemove.push(Number(id)))

      if (filesToAdd.length || filesToRemove.length) {
        await api.patch(FileApis.uploadCertificateFiles(toEditCertificate!.certificateId), { filesToAdd, filesToRemove })
      }
      customToast.success(t('certificate:successfully'))
    } catch {
      customToast.error(t('g:errorMessage'))
    } finally {
      dispatch(handleAllowSave(SaveDisabledEnums.EDIT_CERTIFICATE))
    }
  }

  const handleGoBack = useCallback(() => {
    navigate(-1)
  }, [])

  useEffect(() => {
    fetchCemeteryDropdownOptions()
    fetchCityDropDown()
  }, [])

  return (
    <GeneralLayout type="GENERAL_FORM" submit={onSubmit} backButton={{ onClick: handleGoBack }}>
      <CertificateTabs />
      <CertificateFiles />
      <CertificateLifeDetails />
      <CertificateCemeteryDetails />
    </GeneralLayout>
  )
}

export default SingleCertificate

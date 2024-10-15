import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import CustomDropdowns from '../../../../components/core/dropdowns/CustomDropdowns'
import Paragraph from '../../../../components/core/typography/Paragraph'
import { ROUTE_NAMES } from '../../../../constatns/a-routes'
import GeneralIcons from '../../../../icons/general'
import { ICertificate } from '../../../../interfaces/certificate'
import { CustomDropdown } from '../../../../interfaces/dropdown'
import { formatDateYearMonthDay } from '../../../../utils/date'

type Props = {
  certificate: ICertificate
}

const CertificateTableRow = ({ certificate }: Props) => {
  const { t } = useTranslation(['g:button'])
  const [open, setOpen] = useState<boolean>(false)
  const { biography, dateOfBirth, dateOfDeath, placeOfBirth, placeOfDeath, firstName, lastName, cemetery, location, profileImage, certificateId } =
    certificate
  const linkTo = `${ROUTE_NAMES.certificates}/${certificateId}`

  const handleOnClick = () => setOpen(!open)
  const handleClose = () => setOpen(false)

  const checkOptions = () => {
    const options: CustomDropdown[] = [
      {
        content: {
          type: 'button',
          text: t('g:button.delete'),
          onClick: () => {
            console.log('TODO')
          },
        },
        textColor: 'red',
      },
    ]
    return options
  }

  return (
    <div className={`relative pl-4 pr-6 grid grid-cols-9 border-b-1 border-b-light-grey-alt border-solid ${open ? 'z-4' : 'z-2'}`}>
      <Link to={linkTo} className="col-span-2 py-3 flex">
        {profileImage?.url ? (
          <img
            src={profileImage?.url}
            className="h-8 w-8 rounded-full mr-2"
            alt={`${firstName} ${lastName} ${cemetery?.address}, ${cemetery?.name}, ${location}`}
          />
        ) : (
          <div className="h-8 w-8 rounded-full mr-2">
            <GeneralIcons type="UserPlaceholder" />
          </div>
        )}
        <Paragraph text={`${firstName} ${lastName}`} size="sm" color="black" noWrap />
      </Link>

      <Link to={linkTo} className="flex">
        <Paragraph text={`${placeOfBirth}, ${formatDateYearMonthDay(dateOfBirth)}`} size="sm" color="black" noWrap />
      </Link>

      <Link to={linkTo} className="flex">
        <Paragraph text={`${placeOfDeath}, ${formatDateYearMonthDay(dateOfDeath)}`} size="sm" color="black" noWrap />
      </Link>

      <Link to={linkTo} className="col-span-3 py-4">
        <Paragraph text={`${cemetery?.address}, ${cemetery?.name}, (${location.x}, ${location.y})`} size="sm" color="black" noWrap />
      </Link>

      <Link to={linkTo} className="col-span-2 gap-x-2 py-4">
        <Paragraph text={biography} size="sm" color="black" noWrap />
      </Link>

      <div className={`absolute top-1/2 -translate-y-2/4 right-2 ${open ? 'z-4' : 'z-2'}`} onMouseLeave={handleClose}>
        <div className="relative">
          <GeneralIcons type="MoreIcon" className="cursor-pointer z-1" onClick={handleOnClick} />
          {open && <CustomDropdowns dropdownOptions={checkOptions()} />}
        </div>
      </div>
    </div>
  )
}

export default CertificateTableRow

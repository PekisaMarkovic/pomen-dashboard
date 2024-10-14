import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CustomDropdowns from '../../../../components/core/dropdowns/CustomDropdowns'
import Paragraph from '../../../../components/core/typography/Paragraph'
import { ModalEnums } from '../../../../enum/modal'
import GeneralIcons from '../../../../icons/general'
import { CustomDropdown } from '../../../../interfaces/dropdown'
import { ITribute } from '../../../../interfaces/tributes'
import { useAppDispatch } from '../../../../state/redux-hooks/reduxHooks'
import { setModal } from '../../../../state/shared/modal'
import { setToEditTribute } from '../../../../state/shared/tributes'

type Props = {
  tribute: ITribute
}

const TributeTableRow = ({ tribute }: Props) => {
  const { t } = useTranslation(['g:button'])
  const [open, setOpen] = useState<boolean>(false)
  const { description, firstName, lastName, certificate, status, email } = tribute
  const dispatch = useAppDispatch()

  const handleOnClick = () => setOpen(!open)
  const handleClose = () => setOpen(false)

  const checkOptions = () => {
    const options: CustomDropdown[] = [
      {
        content: {
          type: 'button',
          text: t('g:button.delete'),
          onClick: () => {},
        },
        textColor: 'red',
      },
      {
        content: {
          type: 'button',
          text: t('g:button.edit'),
          onClick: () => {
            dispatch(setToEditTribute(tribute))
            dispatch(setModal(ModalEnums.EDIT_TRIBUTE))
          },
        },
      },
    ]
    return options
  }

  return (
    <div className={`relative pl-4 pr-6 grid grid-cols-9 border-b-1 border-b-light-grey-alt border-solid ${open ? 'z-4' : 'z-2'}`} onClick={() => {}}>
      <div className="col-span-3 gap-x-3 py-3">
        <Paragraph text={description} size="sm" color="black" noWrap />
      </div>

      <div className="col-span-2">
        <Paragraph text={`${firstName} ${lastName}`} size="sm" color="black" noWrap />
      </div>

      <div className="flex">
        <Paragraph text={email} size="sm" color="black" noWrap />
      </div>

      <div className="col-span-2 gap-x-2 py-3">
        <Paragraph text={certificate?.slug || ''} size="sm" color="black" noWrap />
      </div>

      <div className="flex">
        <Paragraph text={status} size="sm" color="black" noWrap />
      </div>

      <div className={`absolute top-1/2 -translate-y-2/4 right-2 ${open ? 'z-4' : 'z-2'}`} onMouseLeave={handleClose}>
        <div className="relative">
          <GeneralIcons type="MoreIcon" className="cursor-pointer z-1" onClick={handleOnClick} />
          {open && <CustomDropdowns dropdownOptions={checkOptions()} />}
        </div>
      </div>
    </div>
  )
}

export default TributeTableRow

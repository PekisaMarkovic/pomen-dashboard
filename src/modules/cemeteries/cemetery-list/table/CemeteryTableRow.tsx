import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CustomDropdowns from '../../../../components/core/dropdowns/CustomDropdowns'
import Paragraph from '../../../../components/core/typography/Paragraph'
import { ModalEnums } from '../../../../enum/modal'
import GeneralIcons from '../../../../icons/general'
import { ICemetery } from '../../../../interfaces/cemeteries'
import { CustomDropdown } from '../../../../interfaces/dropdown'
import { useAppDispatch } from '../../../../state/redux-hooks/reduxHooks'
import { setToEditCemetery } from '../../../../state/shared/cemeteries'
import { setModal } from '../../../../state/shared/modal'

type Props = {
  cementery: ICemetery
}

const CemeteryTableRow = ({ cementery }: Props) => {
  const { t } = useTranslation(['g:button'])
  const [open, setOpen] = useState<boolean>(false)
  const { address, city, name, slug } = cementery
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
            dispatch(setToEditCemetery(cementery))
            dispatch(setModal(ModalEnums.EDIT_CEMETERY))
          },
        },
      },
    ]
    return options
  }

  return (
    <div className={`relative pl-4 pr-6 grid grid-cols-5 border-b-1 border-b-light-grey-alt border-solid ${open ? 'z-4' : 'z-2'}`} onClick={() => {}}>
      <div className="flex gap-x-2 py-3">
        <Paragraph text={name} size="sm" color="black" noWrap />
      </div>

      <div className="flex">
        <Paragraph text={slug} size="sm" color="black" noWrap />
      </div>

      <div className="flex">
        <Paragraph text={city?.name || ''} size="sm" color="black" noWrap />
      </div>

      <div className="col-span-2 gap-x-2 py-3">
        <Paragraph text={address} size="sm" color="black" noWrap />
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

export default CemeteryTableRow

import { PropsWithChildren, useCallback, useState } from 'react'
import GeneralIcons from '../../icons/general'
import { CustomDropdown } from '../../interfaces/dropdown'
import { useClickAway } from '../../hooks/use-click-outside'
import CustomDropdowns from '../core/dropdowns/CustomDropdowns'

interface DefaultTableRowContainerProps {
  isOptionsHidden?: boolean
  dropdownOptions: CustomDropdown[]
}

const DefaultTableRowContainer = ({ children, dropdownOptions, isOptionsHidden = false }: PropsWithChildren<DefaultTableRowContainerProps>) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleClose = useCallback(() => setOpen(false), [])

  const clickAwayRef = useClickAway<HTMLDivElement>({ clickAwayCallback: handleClose })

  const handleOnClick = () => setOpen(!open)

  return (
    <div className={`relative pl-4 pr-6 grid grid-cols-9 border-b-1 border-b-light-grey-alt border-solid ${open ? 'z-4' : 'z-2'}`}>
      {children}

      {!isOptionsHidden && (
        <div className={`absolute top-1/2 -translate-y-2/4 right-2 ${open ? 'z-4' : 'z-2'}`} ref={clickAwayRef}>
          <div className="relative">
            <GeneralIcons type="MoreIcon" className="cursor-pointer z-1" onClick={handleOnClick} />
            {open && <CustomDropdowns dropdownOptions={dropdownOptions} />}
          </div>
        </div>
      )}
    </div>
  )
}

export default DefaultTableRowContainer

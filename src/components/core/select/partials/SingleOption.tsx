import Paragraph from '../../typography/Paragraph'
import { SelectOption } from '../../../../interfaces/general'
import GeneralIcons from '../../../../icons/general'

type Props = {
  checked: boolean
  handleOnClick: () => void
  option: SelectOption
  noWrap?: boolean
}

const SingleOption = ({ checked, handleOnClick, option, noWrap }: Props) => (
  <div className="flex items-center gap-x-1 px-4 py-2.5 hover:bg-light-grey-transparent" onClick={handleOnClick}>
    <div>
      <GeneralIcons type={checked ? 'Check' : 'UnCheck'} />
    </div>
    <div className="w-full overflow-hidden">
      <Paragraph size="sm" color="dark-grey" text={option.name} noWrap={noWrap} />
    </div>
  </div>
)

export default SingleOption

import PagginationWithoutUrl from '../../../../components/core/paggination/PagginationWithoutUrl'
import DefaultTableSpace from '../../../../components/table/DefaultTableSpace'
import { useAppSelector } from '../../../../state/redux-hooks/reduxHooks'
import { selectQRcodes } from '../../../../state/shared/qrcodes'
import { generateArrayOfLen } from '../../../../utils/array'
import QRcodeTableHeader from './QRcodeTableHeader'
import QRcodeTableRow from './QRcodeTableRow'

const QRcodeTable = () => {
  const { qrcodes } = useAppSelector(selectQRcodes)

  const leftSpaces = 10 - (qrcodes?.items.length || 0)
  const defaultSpaces = generateArrayOfLen(leftSpaces)

  return (
    <div>
      <QRcodeTableHeader />

      {qrcodes?.items.map((c) => <QRcodeTableRow key={c.qrcodeId} qrcode={c} />)}

      {defaultSpaces.map((e) => (
        <DefaultTableSpace key={e} isLast={e === defaultSpaces.length - 1} />
      ))}

      <div className="flex flex-row-reverse py-3.5 px-4">
        <PagginationWithoutUrl totalPages={qrcodes?.meta.totalPages || 0} />
      </div>
    </div>
  )
}

export default QRcodeTable

import PagginationWithoutUrl from '../../../../components/core/paggination/PagginationWithoutUrl'
import DefaultTableSpace from '../../../../components/table/DefaultTableSpace'
import { useAppSelector } from '../../../../state/redux-hooks/reduxHooks'
import { selectCertificates } from '../../../../state/shared/certificates'
import { generateArrayOfLen } from '../../../../utils/array'
import CertificateTableHeader from './CertificateTableHeader'
import CertificateTableRow from './CertificateTableRow'

const CertificatesTable = () => {
  const { certificates } = useAppSelector(selectCertificates)

  const leftSpaces = 10 - (certificates?.items.length || 0)
  const defaultSpaces = generateArrayOfLen(leftSpaces)

  return (
    <div>
      <CertificateTableHeader />

      {certificates?.items.map((c) => <CertificateTableRow key={c.certificateId} certificate={c} />)}

      {defaultSpaces.map((e) => (
        <DefaultTableSpace key={e} isLast={e === defaultSpaces.length - 1} />
      ))}

      <div className="flex flex-row-reverse py-3.5 px-4">
        <PagginationWithoutUrl totalPages={certificates?.meta.totalPages || 0} />
      </div>
    </div>
  )
}

export default CertificatesTable

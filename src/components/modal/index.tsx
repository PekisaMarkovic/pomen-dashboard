import { useAppSelector } from '@/src/state/redux-hooks/reduxHooks'
import { selectModal } from '@/src/state/shared/modal'
import ModalConfiguration, { ModalVariant } from '@/src/components/modal/partials/ModalConfiguration'
import { ModalEnums } from '@/src/enum'
import AddCemeteryModal from '@/src/components/modal/cemeteries/AddCemeteryModal'
import EditCemeteryModal from '@/src/components/modal/cemeteries/EditCemeteryModal'
import AddCityModal from '@/src/components/modal/cities/AddCityModal'
import EditCityModal from '@/src/components/modal/cities/EditCityModal'
import AddCountryModal from '@/src/components/modal/countries/AddCountryModal'
import EditCountryModal from '@/src/components/modal/countries/EditCountryModal'
import AddGetheringModal from '@/src/components/modal/getherings/AddGetheringModal'
import EditGetheringModal from '@/src/components/modal/getherings/EditGetheringModal'
import AddTributesModal from '@/src/components/modal/tributes/AddTributesModal'
import EditTributeModal from '@/src/components/modal/tributes/EditTributeModal'
import AddTributesForCertificatModal from '@/src/components/modal/tributes/AddTributesForCertificatModal'
import AddGetheringForCertifivateModal from '@/src/components/modal/getherings/AddGetheringForCertifivateModal'
import ShowQRcodeModal from '@/src/components/modal/qrcode/ShowQRcodeModal'
import AddBlogModal from '@/src/components/modal/blogs/AddBlogModal'
import ConvertLeadModal from '@/src/components/modal/leads/ConvertLeadModal'

type Props = {
  variant?: ModalVariant
}

const MainModal = ({ variant }: Props) => {
  const { modal } = useAppSelector(selectModal)

  const modalContext = () => {
    switch (modal) {
      case ModalEnums.ADD_COUNTRY:
        return <AddCountryModal />

      case ModalEnums.EDIT_COUNTRY:
        return <EditCountryModal />

      case ModalEnums.ADD_CITY:
        return <AddCityModal />

      case ModalEnums.EDIT_CITY:
        return <EditCityModal />

      case ModalEnums.ADD_CEMETERY:
        return <AddCemeteryModal />

      case ModalEnums.EDIT_CEMETERY:
        return <EditCemeteryModal />

      case ModalEnums.CONVERT_LEAD:
        return <ConvertLeadModal />

      case ModalEnums.ADD_GETHERING:
        return <AddGetheringModal />

      case ModalEnums.EDIT_GETHERING:
        return <EditGetheringModal />

      case ModalEnums.ADD_BLOG:
        return <AddBlogModal />

      case ModalEnums.ADD_TRIBUTE:
        return <AddTributesModal />

      case ModalEnums.ADD_TRIBUTE_FOR_CERTIFICATE:
        return <AddTributesForCertificatModal />

      case ModalEnums.ADD_GETHERING_FOR_CERTIFICAT:
        return <AddGetheringForCertifivateModal />

      case ModalEnums.EDIT_TRIBUTE:
        return <EditTributeModal />

      case ModalEnums.SHOW_QRCODE:
        return <ShowQRcodeModal />
    }
  }

  return <>{modal ? <ModalConfiguration variant={variant}>{modalContext()}</ModalConfiguration> : null}</>
}

export default MainModal

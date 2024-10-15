import { useAppSelector } from '../../state/redux-hooks/reduxHooks'
import { selectModal } from '../../state/shared/modal'
import ModalConfiguration, { ModalVariant } from './partials/ModalConfiguration'
import { ModalEnums } from '../../enum/modal'
import AddCemeteryModal from './cemeteries/AddCemeteryModal'
import EditCemeteryModal from './cemeteries/EditCemeteryModal'
import AddCityModal from './cities/AddCityModal'
import EditCityModal from './cities/EditCityModal'
import AddCountryModal from './countries/AddCountryModal'
import EditCountryModal from './countries/EditCountryModal'
import AddGetheringModal from './getherings/AddGetheringModal'
import EditGetheringModal from './getherings/EditGetheringModal'
import AddTributesModal from './tributes/AddTributesModal'
import EditTributeModal from './tributes/EditTributeModal'
import AddTributesForCertificatModal from './tributes/AddTributesForCertificatModal'
import AddGetheringForCertifivateModal from './getherings/AddGetheringForCertifivateModal'
import ShowQRcodeModal from './qrcode/ShowQRcodeModal'

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

      case ModalEnums.ADD_GETHERING:
        return <AddGetheringModal />

      case ModalEnums.EDIT_GETHERING:
        return <EditGetheringModal />

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

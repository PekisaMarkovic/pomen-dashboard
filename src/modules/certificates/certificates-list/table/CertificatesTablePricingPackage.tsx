import { useTranslation } from 'react-i18next'
import { PricingPackagesEnums } from '@/src/enum'

interface CertificatesTablePricingPackageProps {
  plan: PricingPackagesEnums
}

const CertificatesTablePricingPackage = ({ plan }: CertificatesTablePricingPackageProps) => {
  const { t } = useTranslation(['pricing'])

  const text = t(`pricing:pricing-package-plan.${plan}`)

  switch (plan) {
    case PricingPackagesEnums.FREE:
      return (
        <p className="font-poppins bg-light-grey-transparent border-1 border-solid border-lighy-grey flex items-center justify-center rounded-xs text-dark-grey text-sm h-7 px-2">
          {text}
        </p>
      )
    case PricingPackagesEnums.PREMIUM:
      return (
        <p className="font-poppins bg-light-blue-transparent border-1 border-solid border-blue flex items-center justify-center rounded-xs text-blue text-sm h-7 px-2">
          {text}
        </p>
      )

    case PricingPackagesEnums.STANDARD:
      return (
        <p className="font-poppins bg-green-transparent border-1 border-solid border-green flex items-center justify-center rounded-xs text-green text-sm h-7 px-2">
          {text}
        </p>
      )

    case PricingPackagesEnums.BEGINNER:
      return (
        <p className="font-poppins bg-orange-transparent border-1 border-solid border-orange flex items-center justify-center rounded-xs text-orange text-sm h-7 px-2">
          {text}
        </p>
      )
  }
}

export default CertificatesTablePricingPackage

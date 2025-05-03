import { ILead, IPricingOption } from '@/src/interfaces'
import { mapSinglePricingDropdownToSelectOptions } from '@/src/mapper/options'

export const mapToConvertLead = ({ lead, pricingOptions }: { lead: ILead; pricingOptions: IPricingOption[] }) => {
  const foundPricingPlan = pricingOptions.find((plan) => plan.pricingId === lead.pricingId)

  return {
    firstName: lead.firstNameForCertificate,
    lastName: lead.lastNameForCertificate,
    dateOfBirth: `${lead.dateOfBirth}`,
    dateOfDeath: `${lead.dateOfDeath}`,
    placeOfBirth: '',
    placeOfDeath: '',
    biography: '',
    city: '',
    cemetery: '',
    pricingPlan: foundPricingPlan ? mapSinglePricingDropdownToSelectOptions(foundPricingPlan) : '',
    addressOrder: lead.address,
    emailNewUser: lead.email,
    firstNameNewUser: lead.firstName,
    phoneNewUser: lead.phoneNumber,
    lastNameNewUser: lead.lastName,
  }
}

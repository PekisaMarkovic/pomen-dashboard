import { PropsWithChildren } from 'react'
import { useAppSelector } from '../state/redux-hooks/reduxHooks'
import { selectBehaviours } from '../state/shared/behaviours'
import BottomMenu from './partials/BottomMenu'
import LeftMenu from './partials/LeftMenu'
import TopMenu from './partials/TopMenu'
import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form'

type GeneralLayoutProps = {
  type?: 'GENERAL' | 'GENERAL_FORM'
  submit?: SubmitHandler<FieldValues>
  isBottomHidden?: boolean
  cancelButton?: {
    onClick: () => void
  }
  backButton?: {
    onClick: () => void
  }
}

const GeneralLayoutDiv = ({ backButton, children, cancelButton, isBottomHidden }: PropsWithChildren<GeneralLayoutProps>) => {
  const { isScrollDisabled } = useAppSelector(selectBehaviours)

  return (
    <div className="relative flex flex-row h-full w-full">
      <div className="w-1/5 h-full flex">
        <LeftMenu />
      </div>
      <div className="relative w-full general-layout-content bg-light-grey-transparent">
        <TopMenu backButton={backButton} />
        <div className={`${isScrollDisabled ? 'overflow-hidden' : 'overflow-y-scroll'} h-full pt-5 px-8`}>{children}</div>
        {!isBottomHidden && <BottomMenu cancelButton={cancelButton} />}
      </div>
    </div>
  )
}

const GeneralLayoutForm = ({ backButton, children, cancelButton, isBottomHidden, submit }: PropsWithChildren<GeneralLayoutProps>) => {
  const { isScrollDisabled } = useAppSelector(selectBehaviours)
  const { handleSubmit } = useFormContext()

  return (
    <form className="relative flex flex-row h-full w-full" onSubmit={submit ? handleSubmit(submit) : undefined}>
      <div className="w-1/5 h-full flex">
        <LeftMenu />
      </div>
      <div className="relative w-full general-layout-content bg-light-grey-transparent">
        <TopMenu backButton={backButton} />
        <div className={`${isScrollDisabled ? 'overflow-hidden' : 'overflow-y-scroll'} h-full pt-5 px-8`}>{children}</div>
        {!isBottomHidden && <BottomMenu cancelButton={cancelButton} />}
      </div>
    </form>
  )
}

const GeneralLayout = ({ type = 'GENERAL', ...rest }: PropsWithChildren<GeneralLayoutProps>) => {
  switch (type) {
    case 'GENERAL_FORM':
      return <GeneralLayoutForm {...rest} />

    default:
      return <GeneralLayoutDiv {...rest} />
  }
}

export default GeneralLayout

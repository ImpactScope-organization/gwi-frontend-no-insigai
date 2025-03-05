import { TitleWithBackButton } from '../../../Components/TitleWithBackButton/TitleWithBackButton'
import { ROUTES } from '../../../routes'

export const CreateCompany = () => {
  return (
    <TitleWithBackButton title="New Company" to={ROUTES.companies.index}>
      hello
    </TitleWithBackButton>
  )
}

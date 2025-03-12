import { ButtonLink } from '../Components/ButtonLink/ButtonLink'
import { ROUTES } from '../routes'

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-16">404 - Not Found!</h1>
      <ButtonLink to={ROUTES.companies.index}>Back to Companies</ButtonLink>
    </div>
  )
}

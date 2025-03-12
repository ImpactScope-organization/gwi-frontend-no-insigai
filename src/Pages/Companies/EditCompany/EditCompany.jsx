import { TitleWithBackButton } from '../../../Components/TitleWithBackButton/TitleWithBackButton'
import { getRouteWithParams, ROUTES } from '../../../routes'
import { Form, FormikProvider } from 'formik'
import { InputText } from '../../../Components/Fields/InputText'
import { SuccessButton } from '../../../Components/Buttons/SuccessButton'
import { CheckSquareFilled } from '@ant-design/icons'
import React from 'react'
import { useEditCompany } from './useEditCompany'
import { useParams } from 'react-router-dom'

export const EditCompany = () => {
  const { companyId } = useParams()
  const { editCompanyFormik, company } = useEditCompany()

  return (
    <TitleWithBackButton
      title={`Edit ${company?.name}`}
      to={getRouteWithParams(ROUTES.companies.reports.internal, {
        companyId
      })}
    >
      <FormikProvider value={editCompanyFormik}>
        <div className="flex flex-col w-full gap-4 lg:flex-row">
          <Form className="flex flex-col gap-4 w-full">
            <div className="flex flex-col lg:w-2/3 xl:w-1/2 gap-4">
              <div className="flex flex-col w-full gap-4">
                <InputText name="name" label="Name" />
                <InputText name="companyId" label="Company Id" />
              </div>

              <div className="flex w-full gap-4">
                <SuccessButton onClick={editCompanyFormik.submitForm} icon={<CheckSquareFilled />}>
                  Save company
                </SuccessButton>
              </div>
            </div>
          </Form>
        </div>
      </FormikProvider>
    </TitleWithBackButton>
  )
}

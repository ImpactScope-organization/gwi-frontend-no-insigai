import React from 'react'
import { SpecificReportInputText } from '../../components/SpecificReportInputText/SpecificReportInputText'

export const EditQuantitativeReportComponents = ({
  quantitativePercentageCategory,
  quantitativePercentageCategoryIndex
}) => {
  return (
    <div className="card_shadow rounded-2xl py-4 px-3 flex flex-col gap-4">
      <h5 className="text-[18px] leading-[24px] font-[600]">
        {quantitativePercentageCategory.name}
      </h5>

      {quantitativePercentageCategory.components.map((component, componentIndex) => (
        <div key={component.id}>
          <SpecificReportInputText
            name={`quantitativePercentages[${quantitativePercentageCategoryIndex}].components[${componentIndex}].value`}
            label={component.name}
          />
        </div>
      ))}
    </div>
  )
}

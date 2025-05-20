import React from 'react'
import { SpecificReportInputText } from '../../components/SpecificReportInputText/SpecificReportInputText'

export const EditQuantitativeReportComponents = ({ quantitativePercentageCategory }) => {
  return (
    <div className="card_shadow rounded-2xl flex basis-4/12 flex-col gap-1 py-4 px-3">
      <h5 className="text-[18px] leading-[24px] font-[600]">
        {quantitativePercentageCategory.name}
      </h5>
      {quantitativePercentageCategory.components.map((component, index) => (
        <div key={component.id}>
          <SpecificReportInputText
            name={`quantitativePercentages[0].components[${index}].name`}
            label={component.name}
          />
        </div>
      ))}
    </div>
  )
}

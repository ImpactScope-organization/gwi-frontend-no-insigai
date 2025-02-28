import React from 'react'
import { Input } from 'antd'
import { CustomReactQuill } from '../../../../../../../../Components/CustomReactQuill/CustomReactQuill'
import { useEditSources } from './useEditSources'

export const EditSources = () => {
  const { sources, onTitleChange, onDescriptionChange, onAddSource, onDeleteSource } =
    useEditSources()

  return (
    <div className="grid grid-cols-1 gap-6">
      {sources &&
        sources?.map((source, index) => {
          return (
            <div className="mt-[32px]" key={`${index}-edit-source`}>
              <div className="flex justify-between">
                <h2 className="text-[18px] mb-[16px] leading-[24px] font-[600]">Source</h2>
                <button
                  type="button"
                  className="hover:opacity-25"
                  data-testid="SpecificReport.DeleteButton"
                  onClick={() => onDeleteSource(source, index)}
                >
                  ❌
                </button>
              </div>
              <div className="focus-within:border-primary rounded-lg p-[16px] border border-1 focus-withing:border-primary">
                <p className="text-reportGrey text-[1em] text-base font-medium">Heading</p>
                <Input
                  type="text"
                  variant="borderless"
                  value={source?.title || source?.Title}
                  onChange={(e) => onTitleChange(e, index)}
                  className="w-full border-none mt-[8px] p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden"
                />
              </div>
              <div className="focus-within:border-primary rounded-lg mt-[16px] p-[16px] border border-1 focus-withing:border-primary">
                <p className="text-reportGrey text-[1em] text-base font-medium mb-2">Text</p>
                <CustomReactQuill
                  value={source?.description || source?.Description}
                  onChange={(upcomingValue) => onDescriptionChange(upcomingValue, index)}
                />
              </div>
            </div>
          )
        })}
      <div>
        <button
          className="bg-primary rounded-lg py-[12px] flex w-full justify-center text-[#fff] text-[16px] font-[600] leading-[24px]"
          type="button"
          onClick={onAddSource}
        >
          Add Source
        </button>
      </div>
    </div>
  )
}

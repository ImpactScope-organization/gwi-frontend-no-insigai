import { Input } from 'antd'
import { CustomReactQuill } from '../../../../../../../../Components/CustomReactQuill/CustomReactQuill'
import React from 'react'
import { useSpecificReportEdit } from '../../../../useSpecificReportEdit'

export const EditSources = () => {
  const { modifyData, setModifyData } = useSpecificReportEdit()

  return (
    <div className="grid grid-cols-1 gap-6">
      {modifyData?.sources?.map((source, index) => {
        return (
          <div className="mt-[32px]" key={`${index}-edit-source`}>
            <div className="flex justify-between">
              <h2 className="text-[18px] mb-[16px] leading-[24px] font-[600]">Source</h2>
              <button
                className="hover:opacity-25"
                data-testid="SpecificReport.DeleteButton"
                onClick={() => {
                  if (
                    window.confirm(
                      `Are you sure you want to delete this Source? \n${source?.title || source?.Title}`
                    )
                  ) {
                    const upcomingSources = modifyData?.sources?.filter(
                      (_, indexToFilter) => indexToFilter !== index
                    )
                    setModifyData((prev) => ({
                      ...prev,
                      sources: upcomingSources
                    }))
                  }
                }}
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
                onChange={(e) => {
                  setModifyData((prev) => ({
                    ...prev,
                    sources: prev?.sources?.map((cSource, cIndex) => {
                      if (cIndex === index) {
                        if (cSource.hasOwnProperty('title')) {
                          return {
                            ...cSource,
                            title: e.target.value
                          }
                        } else {
                          return {
                            ...cSource,
                            Title: e.target.value
                          }
                        }
                      }
                      return cSource
                    })
                  }))
                }}
                className="w-full border-none mt-[8px] p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden"
              />
            </div>
            <div className="focus-within:border-primary rounded-lg mt-[16px] p-[16px] border border-1 focus-withing:border-primary">
              <p className="text-reportGrey text-[1em] text-base font-medium mb-2">Text</p>
              <CustomReactQuill
                value={source?.description || source?.Description}
                onChange={(upcomingValue) => {
                  setModifyData((prev) => ({
                    ...prev,
                    sources: prev?.sources?.map((cSource, cIndex) => {
                      if (cIndex === index) {
                        if (cSource.hasOwnProperty('Description')) {
                          return {
                            ...cSource,
                            Description: upcomingValue
                          }
                        } else {
                          return {
                            ...cSource,
                            description: upcomingValue
                          }
                        }
                      }
                      return cSource
                    })
                  }))
                }}
              />
            </div>
          </div>
        )
      })}
      <div>
        <button
          className="bg-primary rounded-lg py-[12px] flex w-full justify-center text-[#fff] text-[16px] font-[600] leading-[24px]"
          onClick={() => {
            const upcomingSources = [
              ...modifyData?.sources,
              {
                Title: '',
                Description: ''
              }
            ]
            setModifyData((prev) => ({
              ...prev,
              sources: upcomingSources
            }))
          }}
        >
          Add Source
        </button>
      </div>
    </div>
  )
}

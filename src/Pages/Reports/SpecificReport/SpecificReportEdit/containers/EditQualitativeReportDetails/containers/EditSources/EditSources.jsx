import { Input } from 'antd'
import { CustomReactQuill } from '../../../../../../../../Components/CustomReactQuill/CustomReactQuill'
import React, { useCallback, useEffect, useState } from 'react'
import { useFormikContext } from 'formik'
import { toJSON } from '../../../../../../../../utils/json'

export const EditSources = () => {
  const formik = useFormikContext()

  const [sourcesSet, setSourcesSet] = useState(false)
  const [sources, setSources] = useState([])

  useEffect(() => {
    if (!sourcesSet && formik.values?.sources) {
      setSources(toJSON(formik.values?.sources))
      setSourcesSet(true)
    }
  }, [formik.values?.sources, sourcesSet])

  const saveSources = useCallback(() => {
    formik.setFieldValue('sources', JSON.stringify(sources))
  }, [formik, sources])

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
                  onClick={() => {
                    if (
                      window.confirm(
                        `Are you sure you want to delete this Source? \n${source?.title || source?.Title}`
                      )
                    ) {
                      const upcomingSources = sources?.filter(
                        (_, indexToFilter) => indexToFilter !== index
                      )
                      setSources(upcomingSources)
                      saveSources()
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
                    setSources(
                      sources?.map((cSource, cIndex) => {
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
                    )
                    saveSources()
                  }}
                  className="w-full border-none mt-[8px] p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden"
                />
              </div>
              <div className="focus-within:border-primary rounded-lg mt-[16px] p-[16px] border border-1 focus-withing:border-primary">
                <p className="text-reportGrey text-[1em] text-base font-medium mb-2">Text</p>
                <CustomReactQuill
                  value={source?.description || source?.Description}
                  onChange={(upcomingValue) => {
                    setSources(
                      sources?.map((cSource, cIndex) => {
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
                    )
                    saveSources()
                  }}
                />
              </div>
            </div>
          )
        })}
      <div>
        <button
          className="bg-primary rounded-lg py-[12px] flex w-full justify-center text-[#fff] text-[16px] font-[600] leading-[24px]"
          type="button"
          onClick={() => {
            const upcomingSources = [
              ...sources,
              {
                Title: '',
                Description: ''
              }
            ]
            setSources(upcomingSources)
          }}
        >
          Add Source
        </button>
      </div>
    </div>
  )
}

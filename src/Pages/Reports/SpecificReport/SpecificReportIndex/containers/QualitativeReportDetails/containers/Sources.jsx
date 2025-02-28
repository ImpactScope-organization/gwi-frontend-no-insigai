import React, { useMemo } from 'react'
import { toJSON } from '../../../../../../../utils/json'
import { useCurrentCompanyReport } from '../../../../hooks/useCurrentCompanyReport'

export const Sources = () => {
  const { currentCompanyReport } = useCurrentCompanyReport()
  const sources = useMemo(() => toJSON(currentCompanyReport?.sources), [currentCompanyReport])

  return (
    <>
      {sources?.length > 0 && (
        <div className="mt-[32px]">
          <h2 className="text-[18px] mb-[16px] leading-[24px] font-[600]">Sources</h2>
          <div className="grid grid-cols-1 gap-6">
            {sources?.map((source, index) => {
              return source?.title && source?.description ? (
                <div className="group bg-[#F3F5F7] p-3 rounded-md" key={`${index}-read-source`}>
                  <h3 className="text-reportGrey text-[1em] text-base font-medium">
                    {source?.title}
                  </h3>
                  <div
                    className="text-darkBlack mt-[8px] text-[1em] text-base font-medium green-links"
                    dangerouslySetInnerHTML={{
                      __html: source?.description
                    }}
                  />
                </div>
              ) : (
                <React.Fragment key={`${index}-empty`} />
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

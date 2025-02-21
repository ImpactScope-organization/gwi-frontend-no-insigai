import React from 'react'

export const Sources = ({ sources }) => (
  <>
    {sources?.length > 0 && (
      <div className="mt-[32px]">
        <h2 className="text-[18px] mb-[16px] leading-[24px] font-[600]">Sources</h2>
        <div className="grid grid-cols-1 gap-6">
          {sources?.map((source, index) => {
            return (source?.title || source?.Title) &&
              (source?.description || source?.Description) ? (
              <div className="group bg-[#F3F5F7] p-3 rounded-md" key={`${index}-read-source`}>
                <p className="text-reportGrey text-[1em] text-base font-medium">
                  {source?.title || source?.Title}
                </p>
                <div
                  className="text-darkBlack mt-[8px] text-[1em] text-base font-medium green-links"
                  dangerouslySetInnerHTML={{
                    __html: source?.description || source?.Description
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

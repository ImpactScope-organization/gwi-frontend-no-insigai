export const ReportMetaItem = ({ title, content }) => (
  <div className="grid grid-cols-5 max-w-[60%]">
    <h3 className="text-reportGrey  col-span-2 text-[1em] text-base mb-1 font-medium">{title}</h3>
    <p className="text-darkBlack col-span-3 ml-4 text-[1em] text-base mb-1 font-medium">
      {content}
    </p>
  </div>
)

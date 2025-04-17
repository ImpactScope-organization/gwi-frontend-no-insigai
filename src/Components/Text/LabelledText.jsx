export const LabelledText = ({ label, children }) => {
  return (
    <div className="flex flex-col w-full">
      <label className="text-md text-darkBlack mb-1 font-semibold block">{label}</label>
      <div className="py-4 w-48 overflow-y-scroll text-sm">{children}</div>
    </div>
  )
}

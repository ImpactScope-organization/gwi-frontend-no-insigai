import { toFixed } from '../../../../../utils/number'

export const useQualitativeReportDetails = ({ currentCompanyReport }) => {
  const greenwashingRiskPercentage = toFixed(currentCompanyReport?.greenwashRiskPercentage)
  const reportingRiskPercentage = toFixed(currentCompanyReport?.reportingRiskPercentage)
  const blockchainTransactionURL = currentCompanyReport?.blockchainTransactionURL
  const blockchainFileURL = currentCompanyReport?.blockchainFileURL


  // greenwashingRiskPercentage, *
  //   reportingRiskPercentage, *
  //   blockchainTransactionURL, *
  //   blockchainFileURL, *
  //   handleSendToBlockchain,
  //   isSendToBlockchainInProgress,
  //   deleteCompanyHandler,
  //   dropdownConfiguration,
}

import React from "react";
import Step1 from "../Components/Reports/Step1";
import { useStepsContext } from "../Context/StateContext";
import Step2 from "../Components/Reports/Step2";
import AllReports from "../Components/Reports/AllReports";
import SpecificReport from "../Components/Reports/SpecificReport";
import RoughSpecificReport from "../Components/Reports/RoughSpecificReport";
import SentToRegulators from "../Components/Reports/SentToRegulators";
import LoadingPage from "../Components/loading";

const Reports = () => {
  const { step, isReportGenerating } = useStepsContext();

  return (
    <div>
      {isReportGenerating && (
        <div className="w-full h-full bg-white">
          <LoadingPage
            title="Please wait..."
            description="Please wait, report is being generated."
          />
        </div>
      )}
      {!isReportGenerating && (
        <>
          {step === "step1" && <Step1 />}
          {step === "step2" && <Step2 />}
          {/* <AllReports /> */}
          {step === "all_reports" && <AllReports />}
          {step === "specific_report" && <SpecificReport />}
          {step === "sent_to_regulators" && <SentToRegulators />}
          {step === "rough_report" && <RoughSpecificReport />}
        </>
      )}
      {/* <SpecificReport /> */}
    </div>
  );
};

export default Reports;

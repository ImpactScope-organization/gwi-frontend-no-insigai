import React, { useEffect, useState } from "react";
import BackButton from "../Shared/BackButton";
import { useStepsContext } from "../../Context/StateContext";
import { create } from "ipfs-http-client";
import axios from "axios";
import { toast } from "react-toastify";
import { smartContract } from "../../Constants";
import { ethers } from "ethers";
import apiUrl from "../../utils/baseURL";
import { formattedDate } from "../../utils/date";
import { domToPng } from "modern-screenshot";
import { useAddress } from "@thirdweb-dev/react";
import LoadingPage from "../loading";
import CustomGaugeChart from "../gauge-chart";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { Dropdown } from "antd";
import { scoringPagePrompts } from "../../utils/system-prompts";
import { captureScreen } from "../../utils/helpers";
import { RefBerklayDB } from "../../Constants/RefBerklayDB";

// IPFS
const projectId = "2V6620s2FhImATdUuY4dwIAqoI0";
const projectSecret = "2dcb0a633ee912e06834a43a3083248e";

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

// ----------------------------
const SpecificReport = () => {
  const walletAddress = useAddress();

  const [isLoading, setIsLoading] = useState(true);
  const [showStep0, setShowStep0] = useState(true);
  const [showStep1Modify, setShowStep1Modify] = useState(false);
  const {
    setStep,
    currentCompany,
    description,
    filteredCompanyData,
    currentCountry,
    sheet,
  } = useStepsContext();

  // state variables:
  const [predict, setPredict] = useState("");
  // header states
  const [sector, setSector] = useState("");
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [noOfEmployees, setnoOfEmployees] = useState("");
  const [ghgEmission, setGhgEmission] = useState("");

  // description states
  const [contradictions, setContradictions] = useState("");
  const [potentialInconsistencies, setPotentialInconsistencies] = useState("");
  const [unsubstantiatedClaims, setunsubstantiatedClaims] = useState("");
  // sources states
  const [sources, setsources] = useState([]);

  // greenwashing states
  const [vagueTermsState, setvagueTermsState] = useState({
    score: 0,
    weight: 20,
    divider: 3,
  });
  const [lackOfQuantitativeDataState, setlackOfQuantitativeDataState] =
    useState({ score: 0, weight: 20, divider: 3, divider: 1 });
  const [berkleyDBExistanceState, setberkleyDBExistanceState] = useState({
    score: 0,
    weight: 15,
    divider: 1,
  });
  const [scope3EmissionsState, setscope3EmissionsState] = useState({
    score: 0,
    weight: 15,
    divider: 2,
  });
  const [externalOffsetState, setexternalOffsetState] = useState({
    score: 0,
    weight: 20,
    divider: 2,
  });
  const [netZeroState, setnetZeroState] = useState({
    score: 0,
    weight: 15,
    divider: 2,
  });
  // Reporting risk states
  const [targetTimelinesState, settargetTimelinesState] = useState({
    score: 0,
    weight: 20,
    divider: 1,
  });
  const [stakeholdersEngagementState, setstakeholdersEngagementState] =
    useState({ score: 0, weight: 20, divider: 3 });
  const [reportsAnnuallyState, setreportsAnnuallyState] = useState({
    score: 0,
    weight: 15,
    divider: 2,
  });
  const [
    sustainabilityInformationExistsState,
    setsustainabilityInformationExistsState,
  ] = useState({
    score: 0,
    weight: 15,
    divider: 1,
  });
  const [materialityAssessmentState, setmaterialityAssessmentState] = useState({
    score: 0,
    weight: 20,
    divider: 1,
  });
  // Greenwash Risk Percentage
  let greenwashRiskPercentage = React.useMemo(() => {
    return (
      (vagueTermsState?.score * vagueTermsState?.weight) /
        vagueTermsState?.divider +
      (lackOfQuantitativeDataState?.score *
        lackOfQuantitativeDataState?.weight) /
        lackOfQuantitativeDataState?.divider +
      (reportsAnnuallyState?.score * reportsAnnuallyState?.weight) /
        reportsAnnuallyState?.divider +
      (scope3EmissionsState?.score * scope3EmissionsState?.weight) /
        scope3EmissionsState?.divider +
      (externalOffsetState?.score * externalOffsetState?.weight) /
        externalOffsetState?.divider +
      (netZeroState?.score * netZeroState?.weight) / netZeroState?.divider
    );
  }, [
    vagueTermsState,
    lackOfQuantitativeDataState,
    reportsAnnuallyState,
    scope3EmissionsState,
    externalOffsetState,
    netZeroState,
  ]);
  // Reporting Risk Percentage
  let reportingRiskPercentage = React.useMemo(() => {
    return (
      (targetTimelinesState?.score * targetTimelinesState?.weight) /
        targetTimelinesState?.divider +
      (stakeholdersEngagementState?.score *
        stakeholdersEngagementState?.weight) /
        stakeholdersEngagementState?.divider +
      (berkleyDBExistanceState?.score * berkleyDBExistanceState?.weight) /
        berkleyDBExistanceState?.divider +
      (sustainabilityInformationExistsState?.score *
        sustainabilityInformationExistsState?.weight) /
        sustainabilityInformationExistsState?.divider +
      (materialityAssessmentState?.score * materialityAssessmentState?.weight) /
        materialityAssessmentState?.divider
    );
  }, [
    targetTimelinesState,
    stakeholdersEngagementState,
    berkleyDBExistanceState,
    sustainabilityInformationExistsState,
    materialityAssessmentState,
  ]);

  // Print Report
  const [hash, setHash] = useState("");
  const [etherscanURL, setEtherscanURL] = useState("");

  const handleSendToRegulators = async () => {
    if (!walletAddress) {
      return toast.error("Please connect your wallet first");
    }

    try {
      const element = document.querySelector("#element-to-convert");
      const dataUrl = await domToPng(element);

      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], "file.png", { type: "image/png" });
      const imghash = await ipfs.add(file);
      setHash(imghash.path);
      console.log(`https://ipfs.io/ipfs/${imghash.path}`);

      // Making connection to the blockchain, getting signer wallet address and connecting to our smart contract
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        smartContract.address,
        smartContract.abi,
        signer
      );

      // calling our smart contract function
      const tx = await contract.addImageHash(
        `https://ipfs.io/ipfs/${imghash.path}`
      );
      const receipt = await tx.wait();
      const txHash = receipt.transactionHash;
      const etherscanUrl = `https://sepolia.etherscan.io/tx/${txHash}`;
      setEtherscanURL(etherscanUrl);

      // Sending to regulators
      axios
        .post(`${apiUrl}/api/report/updateSendToRegulators`, {
          companyName: currentCompany,
          contradiction: predict,
          claims: JSON.stringify(filteredCompanyData),
          age: reportDataUpdate.age,
          priority: reportDataUpdate.priority,
          sentToRegulators: "true",
          sendToRegulatorsTimeStamp: formattedDate,
          IPFSHash: imghash.path,
          etherscanURL: etherscanUrl,
          jurisdiction: currentCountry,
          dataSources: Object.keys(filteredCompanyData)
            .filter((key) => filteredCompanyData[key])
            .join(", "),
        })
        .then((res) => {
          console.log("res: ", res);
          toast.success("Report has been sent to regulators");
          setStep("all_reports");
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  // update report age priority

  const [reportDataUpdate, setReportDataUpdate] = useState({
    priority: "Low",
    age: "Recent",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setReportDataUpdate((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log("final: ", reportDataUpdate);
  };

  // ===================================

  // // GPT Response
  useEffect(() => {
    console.log("===============sheet data=====================");
    console.log(sheet[0]);
    console.log("====================================");
    const loadData = async () => {
      try {
        setIsLoading(true);
        const gptPrompt = await axios.get(`${apiUrl}/api/prompt`);

        let prompt = (gptPrompt?.data?.result?.prompt).toString();
        let concatenatedData = `${prompt}\n \n${JSON.stringify(
          filteredCompanyData
        )}`;

        if (prompt) {
          let res1 = await axios.post(`${apiUrl}/api/gpt/prompt`, {
            targetCompanyName: currentCompany,
            description: `companyName: ${currentCompany},data: ${JSON.stringify(
              filteredCompanyData
            )}`,
            systemPrompts: scoringPagePrompts?.companyDetails,
          });
          const cAPI = await axios.post(`${apiUrl}/api/gpt/prompt`, {
            targetCompanyName: currentCompany,
            description: concatenatedData,
            systemPrompts: scoringPagePrompts?.contradictionPrompt,
          });
          const piAPI = await axios.post(`${apiUrl}/api/gpt/prompt`, {
            targetCompanyName: currentCompany,
            description: concatenatedData,
            systemPrompts: scoringPagePrompts?.potentialInconsistencies,
          });
          const ucAPI = await axios.post(`${apiUrl}/api/gpt/prompt`, {
            targetCompanyName: currentCompany,
            description: concatenatedData,
            systemPrompts: scoringPagePrompts?.unsubstantiatedClaims,
          });
          const sourcesAPI = await axios.post(`${apiUrl}/api/gpt/prompt`, {
            targetCompanyName: currentCompany,
            description: JSON.stringify(filteredCompanyData),
            systemPrompts: scoringPagePrompts?.sources,
          });
          res1 = JSON.parse(res1?.data?.response);
          setAnnualRevenue(res1?.annualRevenue ?? "-");
          setnoOfEmployees(res1?.totalEmployees ?? "-");
          setGhgEmission(res1?.GHGemissions ?? "-");
          setSector(res1?.sector ?? "-");

          setContradictions(cAPI?.data?.response);
          setPotentialInconsistencies(piAPI?.data?.response);
          setunsubstantiatedClaims(ucAPI?.data?.response);
          setsources(JSON.parse(sourcesAPI?.data?.response));

          // ==================================
          const vagueTerms = await axios.post(`${apiUrl}/api/gpt/prompt`, {
            targetCompanyName: currentCompany,
            description: `companyName: ${currentCompany},data: ${JSON.stringify(
              filteredCompanyData
            )}`,
            systemPrompts: scoringPagePrompts?.vagueTerms,
          });
          const lackOfQuantitativeData = await axios.post(
            `${apiUrl}/api/gpt/prompt`,
            {
              targetCompanyName: currentCompany,
              description: `companyName: ${currentCompany},data: ${JSON.stringify(
                filteredCompanyData
              )}`,
              systemPrompts: scoringPagePrompts?.lackOfQuantitativeData,
            }
          );
          const scope3Emissions = await axios.post(`${apiUrl}/api/gpt/prompt`, {
            targetCompanyName: currentCompany,
            description: `companyName: ${currentCompany},data: ${JSON.stringify(
              filteredCompanyData
            )}`,
            systemPrompts: scoringPagePrompts?.scope3Emissions,
          });
          const externalOffset = await axios.post(`${apiUrl}/api/gpt/prompt`, {
            targetCompanyName: currentCompany,
            description: `companyName: ${currentCompany},data: ${JSON.stringify(
              filteredCompanyData
            )}`,
            systemPrompts: scoringPagePrompts?.externalOffset,
          });

          const netZero = await axios.post(`${apiUrl}/api/gpt/prompt`, {
            targetCompanyName: currentCompany,
            description: `companyName: ${currentCompany},data: ${JSON.stringify(
              filteredCompanyData
            )}`,
            systemPrompts: scoringPagePrompts?.netZero,
          });

          // ======================Update Greenwash risk states===========================
          setvagueTermsState((prev) => ({
            ...prev,
            score: vagueTerms?.data?.response,
          }));
          setlackOfQuantitativeDataState((prev) => ({
            ...prev,
            score: lackOfQuantitativeData?.data?.response,
          }));
          setscope3EmissionsState((prev) => ({
            ...prev,
            score: scope3Emissions?.data?.response,
          }));
          setexternalOffsetState((prev) => ({
            ...prev,
            score: externalOffset?.data?.response,
          }));
          setnetZeroState((prev) => ({
            ...prev,
            score: netZero?.data?.response,
          }));

          // ==================================
          const targetTimelines = await axios.post(`${apiUrl}/api/gpt/prompt`, {
            targetCompanyName: currentCompany,
            description: `companyName: ${currentCompany},data: ${JSON.stringify(
              filteredCompanyData
            )}`,
            systemPrompts: scoringPagePrompts?.targetTimelines,
          });
          const stakeholdersEngagement = await axios.post(
            `${apiUrl}/api/gpt/prompt`,
            {
              targetCompanyName: currentCompany,
              description: `companyName: ${currentCompany},data: ${JSON.stringify(
                filteredCompanyData
              )}`,
              systemPrompts: scoringPagePrompts?.stakeholdersEngagement,
            }
          );
          const reportsAnnually = await axios.post(`${apiUrl}/api/gpt/prompt`, {
            targetCompanyName: currentCompany,
            description: `companyName: ${currentCompany},data: ${JSON.stringify(
              filteredCompanyData
            )}`,
            systemPrompts: scoringPagePrompts?.reportsAnnually,
          });
          const sustainabilityInformationExists = await axios.post(
            `${apiUrl}/api/gpt/prompt`,
            {
              targetCompanyName: currentCompany,
              description: `companyName: ${currentCompany},data: ${JSON.stringify(
                filteredCompanyData
              )}`,
              systemPrompts:
                scoringPagePrompts?.sustainabilityInformationExists,
            }
          );
          const materialityAssessment = await axios.post(
            `${apiUrl}/api/gpt/prompt`,
            {
              targetCompanyName: currentCompany,
              description: `companyName: ${currentCompany},data: ${JSON.stringify(
                filteredCompanyData
              )}`,
              systemPrompts: scoringPagePrompts?.materialityAssessment,
            }
          );

          // ======================Update Reporting risk states===========================
          settargetTimelinesState((prev) => ({
            ...prev,
            score: targetTimelines?.data?.response,
          }));
          setstakeholdersEngagementState((prev) => ({
            ...prev,
            score: stakeholdersEngagement?.data?.response,
          }));
          setreportsAnnuallyState((prev) => ({
            ...prev,
            score: reportsAnnually?.data?.response,
          }));
          setsustainabilityInformationExistsState((prev) => ({
            ...prev,
            score: sustainabilityInformationExists?.data?.response,
          }));
          setmaterialityAssessmentState((prev) => ({
            ...prev,
            score: materialityAssessment?.data?.response,
          }));

          setIsLoading(false);
        } else {
          setIsLoading(false);
          console.log("no exist");
        }
      } catch (error) {
        setIsLoading(false);
        console.log("error: ", error);
      }
    };
    // loadData();
  }, []);

  if (isLoading) {
    return (
      <LoadingPage
        title="Please wait..."
        description="Please wait, report is being generated."
      />
    );
  }
  return (
    <div>
      <BackButton setStep={() => setStep("all_reports")} />

      {/* Specific Report */}
      <div
        id="report-container"
        className="flex flex-col md:flex-row gap-6 my-10 px-16 max-w-[1120px] mx-auto"
      >
        <div
          id="element-to-convert"
          style={{
            boxShadow:
              "0px 33px 32px -16px rgba(0, 0, 0, 0.10), 0px 0px 16px 4px rgba(0, 0, 0, 0.04)",
          }}
          className="basis-8/12 p-[16px] mx-auto rounded-2xl "
        >
          {/* Top */}

          <div>
            <p className="mb-1 leading-[24px] text-sm text-reportGrey font-medium">
              {formattedDate}
            </p>
            <h1 className="leading-[64px] text-[#000] text-2xl font-bold">
              {currentCompany}
            </h1>
            <div className="mt-[16px] grid grid-cols-5 max-w-[60%]">
              <p className="text-reportGrey  col-span-2 text-[1em] text-base mb-1 font-md">
                Jurisdiction
              </p>
              <p className="text-blackText col-span-3 ml-4 text-[1em] text-base mb-1 font-md">
                {currentCountry}
              </p>
              <p className="text-reportGrey col-span-2 text-[1em] text-base mb-1 font-md">
                Sector
              </p>
              <p className="text-blackText col-span-3 ml-4 text-[1em] text-base mb-1 font-md">
                {sector}
              </p>
              <p className="text-reportGrey col-span-2 text-[1em] text-base mb-1 font-md">
                Annual Revenue
              </p>
              <p className="text-blackText col-span-3 ml-4 text-[1em] text-base mb-1 font-md">
                {annualRevenue}
              </p>
              <p className="text-reportGrey col-span-2 text-[1em] text-base mb-1 font-md">
                Employees
              </p>
              <p className="text-blackText col-span-3 ml-4 text-[1em] text-base mb-1 font-md">
                {noOfEmployees}
              </p>
            </div>
            {/* Links */}
            <div className="mb-5 mt-2">
              {hash && (
                <>
                  <p className="mb-1  text-[#6C7275] text-base font-semibold">
                    <span className="font-bold"> Hash: </span>
                    <a
                      // href={`https://gateway.pinata.cloud/ipfs/${hash}`}
                      href={`https://ipfs.io/ipfs/${hash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#3FDD78] cursor-pointer"
                    >
                      {" "}
                      {hash}
                    </a>
                  </p>
                  <p className=" text-[#6C7275] text-base font-semibold">
                    <span className="font-bold"> Etherscan URL: </span>
                    <a
                      href={etherscanURL}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#3FDD78]"
                    >
                      {" "}
                      {etherscanURL}{" "}
                    </a>
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Contradiction */}
          <div className="bg-[#F3F5F7] mt-[32px] p-3 rounded-md mb-5">
            <p className="text-reportGrey text-[1em] text-base font-md">
              Contradictions
            </p>
            <p className="text-blackText mt-[8px] text-[1em] text-base  font-md">
              {contradictions &&
                contradictions
                  ?.split("\n")
                  ?.filter((item) => item !== "\n")
                  ?.map((text) => (
                    <>
                      {text}
                      <br />
                      <br />
                    </>
                  ))}
            </p>
          </div>
          {/*    Potential inconsistencies */}
          <div className="bg-[#F3F5F7] mt-[32px] p-3 rounded-md mb-5">
            <p className="text-reportGrey text-[1em] text-base font-md">
              Potential inconsistencies
            </p>
            <p className="text-blackText mt-[8px] text-[1em] text-base  font-md ">
              {potentialInconsistencies > "" &&
                potentialInconsistencies
                  ?.split("\n")
                  ?.filter((item) => item !== "\n")
                  ?.map((text) => (
                    <>
                      {text}
                      <br />
                      <br />
                    </>
                  ))}
            </p>
          </div>
          {/* Unsubstantiated claims */}
          <div className="bg-[#F3F5F7] mt-[32px] p-3 rounded-md mb-5">
            <p className="text-reportGrey text-[1em] text-base font-md">
              Unsubstantiated claims
            </p>
            <p className="text-blackText mt-[8px] text-[1em] text-base  font-md ">
              {unsubstantiatedClaims &&
                unsubstantiatedClaims
                  ?.split("\n")
                  ?.filter((item) => item !== "\n")
                  ?.map((text) => (
                    <>
                      {text}
                      <br />
                      <br />
                    </>
                  ))}
            </p>
          </div>

          <div>
            <h2 className="text-[18px] mb-[16px] leading-[24px] font-[600]">
              Sources
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {sources.length > 0 &&
                sources?.map((source, index) => {
                  return source?.title && source?.description ? (
                    <div className="group bg-[#F3F5F7] p-3 rounded-md mb-5">
                      <p className="text-reportGrey  line-clamp-1 group-hover:line-clamp-none text-[1em] text-base font-md">
                        #{index + 1} {source?.title}
                      </p>
                      <p className="line-clamp-2 group-hover:line-clamp-none text-blackText mt-[8px] text-[1em] text-base  font-md ">
                        {source?.description}
                      </p>
                    </div>
                  ) : (
                    <></>
                  );
                })}
            </div>
          </div>
        </div>
        <div>
          <div className="card_shadow rounded-2xl flex basis-4/12 flex-col gap-1 py-4 px-3">
            <h5 className="font-medium text-blackText">Report</h5>
            <div className="overflow-hidden w-full px-2 flex justify-center items-center ">
              <CustomGaugeChart
                percentage={parseInt(greenwashRiskPercentage)}
              />
            </div>
            {/* Cols */}
            <div className="mt-[16px] grid grid-cols-2 max-w-[100%] gap-2 my-3 ">
              <p className="text-reportGrey   text-[1em] text-base mb-1 font-md">
                Reporting risk
              </p>
              <div className="flex flex-row ml-4 items-center gap-[4px] flex-nowrap">
                {Array.from({ length: 10 }).map((_item, index) => {
                  return (
                    <div
                      className={`w-[4px] h-[14px] rounded-sm ${
                        (index + 1) * 10 <= reportingRiskPercentage
                          ? "bg-darkGreen"
                          : "bg-reportGrey "
                      }`}
                    ></div>
                  );
                })}
                <p className="text-blackText ml-[8px] text-[1em] text-base font-md">
                  {reportingRiskPercentage}%
                </p>
              </div>
              <p className="text-reportGrey  text-[1em] text-base mb-1 font-md">
                GHG emissions
              </p>
              <p className="text-blackText ml-4 text-[1em] text-base mb-1 font-md">
                {ghgEmission}
              </p>
              <p className="text-reportGrey  text-[1em] text-base mb-1 font-md">
                Report status
              </p>
              <p className="text-blackText ml-4 text-[1em] text-base mb-1 font-md">
                <span className="py-1 px-3 rounded-3xl bg-foggyGrey">
                  Generated
                </span>
              </p>
            </div>
            <div className="flex flex-row gap-4 w-full">
              <button
                onClick={handleSendToRegulators}
                className="bg-darkGreen flex-1 rounded-lg  py-3 px-3 border-none outline-none text-[#fff]"
              >
                Send to regulator
              </button>
              <Dropdown
                trigger={["click"]}
                menu={{
                  onClick: (e) => {
                    if (e.key == 1) {
                      captureScreen("report-container");
                    } else {
                      alert("in-progress");
                    }
                  },
                  items: [
                    { label: "Modify Report", key: "0" },
                    {
                      label: "Save as PDF",
                      key: "1",
                    },
                    { label: "Remove from DB", key: "2" },
                  ],
                }}
                placement="bottomRight"
              >
                <div className="py-[12px] px-[18px] rounded-md border bg-transparent flex justify-center items-center">
                  <IoEllipsisHorizontalSharp />
                </div>
              </Dropdown>
            </div>
          </div>
          <div className="card_shadow mt-8 gap-4 rounded-2xl flex basis-4/12 flex-col z-50 p-[16px]">
            <h2 className="text-[18px] leading-[24px] font-[600]">Documents</h2>
            <div className="flex flex-row flex-nowrap justify-start items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-2xl">
              <img src="/assets/xls-icon.svg" alt="xls-icon" />
              <h2 className="text-[18px] leading-[24px] mt-1 font-[600]">
                <span className="truncate">AIB_Group_PLC</span>.csv
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificReport;

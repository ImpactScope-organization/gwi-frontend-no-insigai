/* eslint-disable react-hooks/exhaustive-deps */
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
  const { setStep, updateSheet, currentCompany, filteredCompanyData } =
    useStepsContext();

  // description states
  const [contradictions, setContradictions] = useState(
    () => currentCompany?.generatedReport?.contradictions || ""
  );
  const [potentialInconsistencies, setPotentialInconsistencies] = useState(
    () => currentCompany?.generatedReport?.potentialInconsistencies || ""
  );
  const [unsubstantiatedClaims, setunsubstantiatedClaims] = useState(
    () => currentCompany?.generatedReport?.unsubstantiatedClaims || ""
  );
  // sources states
  const [sources, setsources] = useState(
    () => currentCompany?.generatedReport?.sources || []
  );

  // greenwashing states
  const [vagueTermsState, setvagueTermsState] = useState(
    () =>
      currentCompany?.generatedReport?.vagueTermsState || {
        score: 0,
        weight: 20,
        divider: 3,
      }
  );
  const [lackOfQuantitativeDataState, setlackOfQuantitativeDataState] =
    useState(
      () =>
        currentCompany?.generatedReport?.lackOfQuantitativeDataState || {
          score: 0,
          weight: 20,
          divider: 3,
        }
    );
  const [berkleyDBExistanceState, setberkleyDBExistanceState] = useState(
    () =>
      currentCompany?.generatedReport?.berkleyDBExistanceState || {
        score: 0,
        weight: 15,
        divider: 1,
      }
  );
  const [scope3EmissionsState, setscope3EmissionsState] = useState(
    () =>
      currentCompany?.generatedReport?.scope3EmissionsState || {
        score: 0,
        weight: 15,
        divider: 2,
      }
  );
  const [externalOffsetState, setexternalOffsetState] = useState(
    () =>
      currentCompany?.generatedReport?.externalOffsetState || {
        score: 0,
        weight: 15,
        divider: 2,
      }
  );
  const [netZeroState, setnetZeroState] = useState(
    () =>
      currentCompany?.generatedReport?.netZeroState || {
        score: 0,
        weight: 15,
        divider: 2,
      }
  );
  // Reporting risk states
  const [targetTimelinesState, settargetTimelinesState] = useState(
    () =>
      currentCompany?.generatedReport?.targetTimelinesState || {
        score: 0,
        weight: 20,
        divider: 1,
      }
  );
  const [stakeholdersEngagementState, setstakeholdersEngagementState] =
    useState(
      () =>
        currentCompany?.generatedReport?.stakeholdersEngagementState || {
          score: 0,
          weight: 20,
          divider: 3,
        }
    );
  const [reportsAnnuallyState, setreportsAnnuallyState] = useState(
    () =>
      currentCompany?.generatedReport?.reportsAnnuallyState || {
        score: 0,
        weight: 15,
        divider: 2,
      }
  );
  const [
    sustainabilityInformationExistsState,
    setsustainabilityInformationExistsState,
  ] = useState(
    () =>
      currentCompany?.generatedReport?.sustainabilityInformationExistsState || {
        score: 0,
        weight: 15,
        divider: 1,
      }
  );
  const [materialityAssessmentState, setmaterialityAssessmentState] = useState(
    () =>
      currentCompany?.generatedReport?.materialityAssessmentState || {
        score: 0,
        weight: 20,
        divider: 1,
      }
  );
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
  const [isSendingToRegulator, setIsSendingToRegulator] = useState("");

  const handleSendToRegulators = async () => {
    if (!walletAddress) {
      return toast.error("Please connect your wallet first");
    }
    setIsSendingToRegulator(true);
    try {
      const element = document.querySelector("#report-container");
      const dataUrl = await domToPng(element);

      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], "file.png", { type: "image/png" });
      const imghash = await ipfs.add(file);
      setHash(imghash.path);
      // console.log(`https://ipfs.io/ipfs/${imghash.path}`);

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
          companyName: currentCompany?.company?.name,
          contradiction: contradictions,
          jurisdiction: currentCompany?.company?.jurisdiction,
          // new keys
          sector: currentCompany?.company?.sector,
          annualRevenue: currentCompany?.company["annual revenue"],
          noOfEmployees: currentCompany?.company?.employees,
          potentialInconsistencies,
          unsubstantiatedClaims,
          sources: JSON.stringify(sources),
          greenwashRiskPercentage,
          reportingRiskPercentage,
          GHGEmissions: currentCompany?.company["ghg emissions"],
          claims: JSON.stringify(currentCompany?.claims),
          age: reportDataUpdate.age,
          priority: reportDataUpdate.priority,
          sentToRegulators: "true",
          sendToRegulatorsTimeStamp: formattedDate,
          IPFSHash: imghash.path,
          etherscanURL: etherscanUrl,
          dataSources: Object.keys(filteredCompanyData)
            .filter((key) => filteredCompanyData[key])
            .join(", "),
        })
        .then((res) => {
          console.log("res: ", res);
          toast.success("Report has been sent to regulators");
          setIsSendingToRegulator(false);
          // setStep("all_reports");
        })
        .catch((err) => {
          console.log("err: ", err);
          setIsSendingToRegulator(false);
        });
    } catch (error) {
      toast.error(error.message);
      setIsSendingToRegulator(false);
    }
  };

  // update report age priority
  const reportDataUpdate = {
    priority: "Low",
    age: "Recent",
  };
  // ===================================

  // useEffect(() => {
  //   // update sheet
  //   if (
  //     contradictions &&
  //     potentialInconsistencies &&
  //     unsubstantiatedClaims &&
  //     sources &&
  //     vagueTermsState &&
  //     lackOfQuantitativeDataState &&
  //     berkleyDBExistanceState &&
  //     scope3EmissionsState &&
  //     externalOffsetState &&
  //     netZeroState &&
  //     targetTimelinesState &&
  //     stakeholdersEngagementState &&
  //     reportsAnnuallyState &&
  //     sustainabilityInformationExistsState &&
  //     materialityAssessmentState
  //   ) {
  //     const values = {
  //       contradictions,
  //       potentialInconsistencies,
  //       unsubstantiatedClaims,
  //       sources,
  //       vagueTermsState,
  //       lackOfQuantitativeDataState,
  //       berkleyDBExistanceState,
  //       scope3EmissionsState,
  //       externalOffsetState,
  //       netZeroState,
  //       targetTimelinesState,
  //       stakeholdersEngagementState,
  //       reportsAnnuallyState,
  //       sustainabilityInformationExistsState,
  //       materialityAssessmentState,
  //     };
  //     updateSheet(currentCompany?.index, values);
  //   }
  // }, [
  //   contradictions,
  //   potentialInconsistencies,
  //   unsubstantiatedClaims,
  //   sources,
  //   vagueTermsState,
  //   lackOfQuantitativeDataState,
  //   berkleyDBExistanceState,
  //   scope3EmissionsState,
  //   externalOffsetState,
  //   netZeroState,
  //   targetTimelinesState,
  //   stakeholdersEngagementState,
  //   reportsAnnuallyState,
  //   sustainabilityInformationExistsState,
  //   materialityAssessmentState,
  // ]);

  // // GPT Response
  useEffect(() => {
    if (Object.keys(currentCompany?.generatedReport)?.length === 0) {
      loadData();
    } else {
      console.log("=================generatedReport===================");
      console.log(currentCompany?.generatedReport);
      console.log("====================================");
      setIsLoading(false);
    }
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      if (RefBerklayDB.includes(currentCompany?.company?.name)) {
        setberkleyDBExistanceState((prev) => ({
          ...prev,
          score: 0,
        }));
      } else {
        setberkleyDBExistanceState((prev) => ({
          ...prev,
          score: 1,
        }));
      }
      // const gptPrompt = await axios.get(`${apiUrl}/api/prompt`);
      const claims = [...currentCompany?.claims]?.slice(0, 5);
      let prompt = `Act as an a sustainablity experts who identifies  potential greenwashing by companies:`;
      let concatenatedData = `companyName:${
        currentCompany?.company?.name
      }\n claims: \n${JSON.stringify(claims)}`;

      const group1APIs = [
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.company?.name,
          description: concatenatedData,
          systemPrompts: {
            ...scoringPagePrompts?.contradictionPrompt,
            content: prompt + scoringPagePrompts?.contradictionPrompt?.content,
          },
        }),
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.company?.name,
          description: concatenatedData,
          systemPrompts: {
            ...scoringPagePrompts?.potentialInconsistencies,
            content:
              prompt + scoringPagePrompts?.potentialInconsistencies?.content,
          },
        }),
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.company?.name,
          description: concatenatedData,
          systemPrompts: {
            ...scoringPagePrompts?.unsubstantiatedClaims,
            content:
              prompt + scoringPagePrompts?.unsubstantiatedClaims?.content,
          },
        }),
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.company?.name,
          description: concatenatedData,
          systemPrompts: {
            ...scoringPagePrompts?.sources,
            content: prompt + scoringPagePrompts?.sources?.content,
          },
        }),
      ];

      const [cAPI, piAPI, ucAPI, sourcesAPI] = await Promise.allSettled(
        group1APIs
      );

      // ===============group2APIs===================
      const group2APIs = [
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.company?.name,
          description: concatenatedData,
          systemPrompts: {
            ...scoringPagePrompts?.vagueTerms,
            content: prompt + scoringPagePrompts?.vagueTerms?.content,
          },
        }),
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.company?.name,
          description: concatenatedData,
          systemPrompts: {
            ...scoringPagePrompts?.lackOfQuantitativeData,
            content:
              prompt + scoringPagePrompts?.lackOfQuantitativeData?.content,
          },
        }),
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.company?.name,
          description: `companyName: ${
            currentCompany?.company?.name
          },data: ${JSON.stringify(currentCompany?.claims?.slice(0, 7))}`,
          systemPrompts: {
            ...scoringPagePrompts?.scope3Emissions,
            content: prompt + scoringPagePrompts?.scope3Emissions?.content,
          },
        }),
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.company?.name,
          description: `companyName: ${
            currentCompany?.company?.name
          },data: ${JSON.stringify(currentCompany?.claims?.slice(0, 7))}`,
          systemPrompts: {
            ...scoringPagePrompts?.externalOffset,
            content: prompt + scoringPagePrompts?.externalOffset?.content,
          },
        }),
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.company?.name,
          description: `companyName: ${
            currentCompany?.company?.name
          },data: ${JSON.stringify(currentCompany?.claims?.slice(0, 7))}`,
          systemPrompts: {
            ...scoringPagePrompts?.netZero,
            content: prompt + scoringPagePrompts?.netZero?.content,
          },
        }),
      ];

      const [
        vagueTerms,
        lackOfQuantitativeData,
        scope3Emissions,
        externalOffset,
        netZero,
        // ... destructure other API responses here in the same order
      ] = await Promise.allSettled(group2APIs);

      // ======================group3APIs===========================
      const group3APIs = [
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.company?.name,
          description: `companyName: ${
            currentCompany?.company?.name
          },data: ${JSON.stringify(currentCompany?.claims?.slice(0, 7))}`,
          systemPrompts: {
            ...scoringPagePrompts?.targetTimelines,
            content: prompt + scoringPagePrompts?.targetTimelines?.content,
          },
        }),
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.company?.name,
          description: concatenatedData,
          systemPrompts: {
            ...scoringPagePrompts?.stakeholdersEngagement,
            content:
              prompt + scoringPagePrompts?.stakeholdersEngagement?.content,
          },
        }),
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.company?.name,
          description: `companyName: ${
            currentCompany?.company?.name
          },data: ${JSON.stringify(currentCompany?.claims?.slice(0, 7))}`,
          systemPrompts: {
            ...scoringPagePrompts?.reportsAnnually,
            content: prompt + scoringPagePrompts?.reportsAnnually?.content,
          },
        }),
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.company?.name,
          description: concatenatedData,
          systemPrompts: {
            ...scoringPagePrompts?.sustainabilityInformationExists,
            content:
              prompt +
              scoringPagePrompts?.sustainabilityInformationExists?.content,
          },
        }),
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.company?.name,
          description: concatenatedData,
          systemPrompts: {
            ...scoringPagePrompts?.materialityAssessment,
            content:
              prompt + scoringPagePrompts?.materialityAssessment?.content,
          },
        }),
      ];
      const [
        targetTimelines,
        stakeholdersEngagement,
        reportsAnnually,
        sustainabilityInformationExists,
        materialityAssessment,
        // ... destructure other API responses here in the same order
      ] = await Promise.allSettled(group3APIs);

      // ===============Group 1 set responses===================
      setContradictions(cAPI?.value?.data?.response);
      setPotentialInconsistencies(piAPI?.value?.data?.response);
      setunsubstantiatedClaims(ucAPI?.value?.data?.response);
      setsources(JSON.parse(sourcesAPI?.value?.data?.response));
      // ======================Update Greenwash risk states===========================
      setvagueTermsState((prev) => ({
        ...prev,
        score: !isNaN(vagueTerms?.value?.data?.response)
          ? Number(vagueTerms?.value?.data?.response)
          : prev?.score,
      }));
      setlackOfQuantitativeDataState((prev) => ({
        ...prev,
        score: !isNaN(lackOfQuantitativeData?.value?.data?.response)
          ? Number(lackOfQuantitativeData?.value?.data?.response)
          : prev?.score,
      }));
      setscope3EmissionsState((prev) => ({
        ...prev,
        score: !isNaN(scope3Emissions?.value?.data?.response)
          ? Number(scope3Emissions?.value?.data?.response)
          : prev?.score,
      }));
      setexternalOffsetState((prev) => ({
        ...prev,
        score: !isNaN(externalOffset?.value?.data?.response)
          ? Number(externalOffset?.value?.data?.response)
          : prev?.score,
      }));
      setnetZeroState((prev) => ({
        ...prev,
        score: !isNaN(netZero?.value?.data?.response)
          ? Number(netZero?.value?.data?.response)
          : prev?.score,
      }));
      // ======================Update Reporting risk states===========================
      settargetTimelinesState((prev) => ({
        ...prev,
        score: isNaN(!targetTimelines?.value?.data?.response)
          ? Number(targetTimelines?.value?.data?.response)
          : prev?.score,
      }));
      setstakeholdersEngagementState((prev) => ({
        ...prev,
        score: isNaN(!stakeholdersEngagement?.value?.data?.response)
          ? Number(stakeholdersEngagement?.value?.data?.response)
          : prev?.score,
      }));
      setreportsAnnuallyState((prev) => ({
        ...prev,
        score: isNaN(!reportsAnnually?.value?.data?.response)
          ? Number(reportsAnnually?.value?.data?.response)
          : prev?.score,
      }));
      setsustainabilityInformationExistsState((prev) => ({
        ...prev,
        score: isNaN(!sustainabilityInformationExists?.value?.data?.response)
          ? Number(sustainabilityInformationExists?.value?.data?.response)
          : prev?.score,
      }));
      setmaterialityAssessmentState((prev) => ({
        ...prev,
        score: isNaN(!materialityAssessment?.value?.data?.response)
          ? Number(materialityAssessment?.value?.data?.response)
          : prev?.score,
      }));

      setIsLoading(false);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

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
              {currentCompany?.company?.name}
            </h1>
            <div className="mt-[16px] grid grid-cols-5 max-w-[60%]">
              <p className="text-reportGrey  col-span-2 text-[1em] text-base mb-1 font-md">
                Jurisdiction
              </p>
              <p className="text-blackText col-span-3 ml-4 text-[1em] text-base mb-1 font-md">
                {currentCompany?.company?.jurisdiction}
              </p>
              <p className="text-reportGrey col-span-2 text-[1em] text-base mb-1 font-md">
                Sector
              </p>
              <p className="text-blackText col-span-3 ml-4 text-[1em] text-base mb-1 font-md">
                {currentCompany?.company?.sector}
              </p>
              <p className="text-reportGrey col-span-2 text-[1em] text-base mb-1 font-md">
                Annual Revenue
              </p>
              <p className="text-blackText col-span-3 ml-4 text-[1em] text-base mb-1 font-md">
                {currentCompany?.company["annual revenue"]}
              </p>
              <p className="text-reportGrey col-span-2 text-[1em] text-base mb-1 font-md">
                Employees
              </p>
              <p className="text-blackText col-span-3 ml-4 text-[1em] text-base mb-1 font-md">
                {currentCompany?.company?.employees?.toLocaleString()}
              </p>
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
              {sources.length > 0 ? (
                sources?.map((source, index) => {
                  return (source?.title || source?.Title) &&
                    (source?.description || source?.Description) ? (
                    <div className="group bg-[#F3F5F7] p-3 rounded-md mb-5">
                      <p className="text-reportGrey  line-clamp-1 group-hover:line-clamp-none text-[1em] text-base font-md">
                        #{index + 1} {source?.title || source?.Title}
                      </p>
                      <p className="line-clamp-2 group-hover:line-clamp-none text-blackText mt-[8px] text-[1em] text-base  font-md ">
                        {source?.description || source?.Description}
                      </p>
                    </div>
                  ) : (
                    <></>
                  );
                })
              ) : (
                <p className="text-blackText mt-[8px] text-[1em] text-base  font-md">
                  No data found
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="card_shadow rounded-2xl flex basis-4/12 flex-col gap-1 py-4 px-3">
            <h5 className="font-medium text-blackText">Report</h5>
            <div className="overflow-hidden w-full px-2 flex justify-center items-center ">
              <CustomGaugeChart
                percentage={
                  greenwashRiskPercentage && greenwashRiskPercentage <= 100
                    ? parseInt(greenwashRiskPercentage)
                    : greenwashRiskPercentage > 100
                    ? 99
                    : 0
                }
              />
            </div>
            {/* Cols */}
            <div className="mt-[16px] grid grid-cols-2 max-w-[370px] gap-2 my-3 ">
              <p className="text-reportGrey   text-[1em] text-base mb-1 font-md">
                Reporting risk
              </p>
              <div className="flex flex-row ml-4 items-center gap-[4px] flex-nowrap">
                {Array.from({ length: 10 }).map((_item, index) => {
                  return (
                    <div
                      className={`w-[4px] h-[14px] rounded-sm ${
                        (index + 1) * 10 <= parseInt(reportingRiskPercentage)
                          ? "bg-darkGreen"
                          : "bg-reportGrey "
                      }`}
                    ></div>
                  );
                })}
                <p className="text-blackText ml-[8px] text-[1em] text-base font-md">
                  {parseInt(reportingRiskPercentage)}%
                </p>
              </div>
              <p className="text-reportGrey  text-[1em] text-base mb-1 font-md">
                GHG emissions
              </p>
              <p className="text-blackText ml-4 text-[1em] text-base mb-1 font-md">
                {currentCompany?.company["ghg emissions"]}
              </p>
              <p className="text-reportGrey  text-[1em] text-base mb-1 font-md">
                Report status
              </p>
              <p className="text-blackText ml-4 text-[1em] text-base mb-1 font-md">
                <span className="py-1 px-3 rounded-3xl bg-foggyGrey">
                  Generated
                </span>
              </p>
              {hash && (
                <p className="text-reportGrey  text-[1em] text-base mb-1 font-md">
                  Timestamp
                </p>
              )}
              {hash && (
                <a className="col-span-1 ml-4 text-[1em] text-base mb-1 font-md">
                  {formattedDate}
                </a>
              )}
              {/* Links */}
              {hash && (
                <p className="text-reportGrey  text-[1em] text-base mb-1 font-md">
                  IPFS link
                </p>
              )}
              {hash && (
                <a
                  href={`https://ipfs.io/ipfs/${hash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-darkGreen col-span-1 truncate ml-4 text-[1em]  mb-1 font-md"
                >
                  {hash}
                </a>
              )}
              {etherscanURL && (
                <p className="text-reportGrey  text-[1em] text-base mb-1 font-md">
                  Etherscan URL
                </p>
              )}
              {etherscanURL && (
                <a
                  href={etherscanURL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-darkGreen truncate ml-4 text-[1em] text-base mb-1 font-md"
                >
                  {etherscanURL}
                </a>
              )}
            </div>
            {(!hash || !etherscanURL) && (
              <div className="flex flex-row gap-4 w-full">
                <button
                  disabled={isSendingToRegulator}
                  onClick={handleSendToRegulators}
                  className={`${
                    isSendingToRegulator ? "bg-greyText" : "bg-darkGreen"
                  } flex-1 rounded-lg  py-3 px-3 border-none outline-none text-[#fff]`}
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
                        alert("coming soon!");
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
            )}
            {hash && etherscanURL && (
              <div className="flex flex-row gap-2 w-full">
                <button
                  onClick={() => captureScreen("report-container")}
                  className="bg-blackText  rounded-lg  py-2 px-2 border-none outline-none text-[#fff] text-[16px]"
                >
                  Download as .pdf
                </button>
                <button
                  onClick={() => alert("Coming Soon!")}
                  className="bg-white border border-danger rounded-lg  py-2 px-2 text-danger text-[16px]"
                >
                  Remove from DB
                </button>
              </div>
            )}
          </div>
          <div className="card_shadow mt-8 gap-4 rounded-2xl flex basis-4/12 flex-col z-50 p-[16px]">
            <h2 className="text-[18px] leading-[24px] font-[600]">Documents</h2>
            <div className="flex flex-row flex-nowrap justify-start items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-2xl">
              <img src="/assets/xls-icon.svg" alt="xls-icon" />
              <h2 className="text-[18px] leading-[24px] mt-1 font-[600]">
                <span className="truncate">{currentCompany?.file?.name}</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificReport;

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { FileUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import Logo from "@/assets/icons/rp-logo-icon.svg";
import { useEOBLogic } from "./EOBParser.hook";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfPipelineViewer() {
  const {
    file,
    pdfUrl,
    numPages,
    isLoading,
    pipelineResult,
    stageStatus,
    handleStartPipeline,
    handleFileSelect,
    onDocumentLoadError,
    onDocumentLoadSuccess,
    clearFile,
    showAccordion,
  } = useEOBLogic();

  // Helper to render stage text
  const renderStageText = (
    stage: "stage1" | "stage2" | "stage3" | "stage4"
  ) => {
    const status = stageStatus[stage];
    if (status === "processing")
      return (
        <span className="flex gap-2 text-gray-500">
          <img src={Logo} className="w-5 h-6 animate-spin" alt="logo" />
          Processing...
        </span>
      );
    if (status === "completed")
      return <span className="text-green-600"> Completed</span>;
    return <span className="text-gray-500"> </span>;
  };

  return (
    <div className="p-4 flex flex-col h-[calc(100vh-64px)] overflow-auto gap-4">
      <div className="w-full border border-[#E6ECF0] p-4 pt-2.5 rounded-[14px]">
        <div className="text-[20px] font-[600] text-[#0A0A0A]">
          RCM Insight Extraction
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#0A0A0A]">
            A multi-stage pipeline to analyze your Revenue Cycle Management
            documents.
          </span>
        </div>
      </div>

      <div className=" h-screen flex flex-col lg:flex-row gap-6 bg-gray-50 overflow-hidden font-sans">
        {/* LEFT PANEL */}
        <div className="w-full lg:w-[50%] overflow-auto">
          <Card
            className={`w-[100%] bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between 
              "h-full"`}
          >
            <div>
              {/* FILE UPLOAD */}
              <div className="mb-4">
                <div className="text-[20px] font-semibold text-[#0A0A0A]">
                  RCM Insight Extraction
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#0A0A0A]">
                    Upload a document to begin the multi-stage analysis.
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-8 hover:bg-gray-50/50 transition-colors relative">
                {!file ? (
                  <>
                    <div className="bg-blue-50 p-4 rounded-full mb-4">
                      <FileUp className="w-8 h-8 text-blue-500" />
                    </div>
                    <p className="text-gray-900 font-medium mb-1">
                      Upload PDF file
                    </p>
                    <p className="text-gray-500 text-xs text-center mb-4">
                      Drag and drop or click to browse
                    </p>

                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button variant="outline" className="pointer-events-none">
                      Browse Files
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col items-center w-full">
                    <div className="bg-green-50 p-3 rounded-full mb-3">
                      <FileUp className="w-6 h-6 text-green-600" />
                    </div>

                    <p className="text-gray-900 font-medium text-sm truncate max-w-[200px] mb-6">
                      {file.name}
                    </p>
                    <Button
                      onClick={handleStartPipeline}
                      disabled={isLoading}
                      className="w-full mb-3 bg-[#249563] hover:bg-[#249563] max-w-[200px]"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <img
                            src={Logo}
                            className="w-5 h-6 animate-spin"
                            alt="logo"
                          />
                          Processing...
                        </span>
                      ) : (
                        "Start Pipeline"
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={clearFile}
                      className="w-full text-gray-500 hover:text-gray-700"
                    >
                      Choose a different file
                    </Button>
                  </div>
                )}
              </div>

              {/* ⭐ ACCORDION SHOWS AFTER PIPELINE RESULT */}
              {showAccordion && (
                <div className="w-full mt-4 p-4">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <span
                          className={`flex flex-col items-start gap-2 ${
                            stageStatus.stage1 === "completed"
                              ? "text-green-600"
                              : "text-black"
                          }`}
                        >
                          Stage 1: Quality Assessment{" "}
                          {renderStageText("stage1")}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        {stageStatus.stage1 === "completed" &&
                        pipelineResult?.split ? (
                          <div className="flex flex-col gap-4">
                            {/* Summary */}
                            <div>
                              <h4 className="font-semibold text-gray-800">
                                Summary
                              </h4>
                              <p className="text-gray-700">
                                {pipelineResult.split.analysis.summary}
                              </p>
                            </div>

                            {/* Step by Step Reasoning */}
                            <div>
                              <h4 className="font-semibold text-gray-800">
                                Step by Step Reasoning
                              </h4>
                              <p className="text-gray-700">
                                {
                                  pipelineResult.split.analysis
                                    .step_by_step_reasoning
                                }
                              </p>
                            </div>

                            {/* Page by Page Reasoning */}
                            <div>
                              <h4 className="font-semibold text-gray-800">
                                Page by Page Reasoning
                              </h4>
                              <ul className="list-disc list-inside text-gray-700">
                                {pipelineResult.split.analysis.page_by_page_reasoning.map(
                                  (item: string, index: number) => (
                                    <li key={index}>{item}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        ) : stageStatus.stage1 === "processing" ? (
                          "Processing Stage 1..."
                        ) : (
                          ""
                        )}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger
                        disabled={stageStatus.stage1 !== "completed"}
                      >
                        <span
                          className={`flex flex-col items-start gap-2 ${
                            stageStatus.stage2 === "completed"
                              ? "text-green-600"
                              : "text-black"
                          }`}
                        >
                          Stage 2: Boundary Detection{" "}
                          {renderStageText("stage2")}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        {stageStatus.stage2 === "completed" &&
                        pipelineResult?.split ? (
                          <div className="overflow-auto">
                            <table className="w-full text-sm text-left border border-gray-200">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th className="px-4 py-2 border">
                                    Letter Number
                                  </th>
                                  <th className="px-4 py-2 border">
                                    Letter Context
                                  </th>
                                  <th className="px-4 py-2 border">
                                    Letter Date
                                  </th>
                                  <th className="px-4 py-2 border">
                                    Start Page
                                  </th>
                                  <th className="px-4 py-2 border">End Page</th>
                                  <th className="px-4 py-2 border">
                                    Total Letters
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {pipelineResult.split.letters.map(
                                  (letter: any, index: number) => (
                                    <tr key={index} className="even:bg-gray-50">
                                      <td className="px-4 py-2 border">
                                        {letter.letter_number}
                                      </td>
                                      <td className="px-4 py-2 border">
                                        {letter.letter_context}
                                      </td>
                                      <td className="px-4 py-2 border">
                                        {letter.letter_date}
                                      </td>
                                      <td className="px-4 py-2 border">
                                        {letter.start_page}
                                      </td>
                                      <td className="px-4 py-2 border">
                                        {letter.end_page}
                                      </td>
                                      <td className="px-4 py-2 border">
                                        {pipelineResult.split.total_letters}
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        ) : stageStatus.stage2 === "processing" ? (
                          "Processing Stage 2..."
                        ) : (
                          "Waiting"
                        )}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger
                        disabled={stageStatus.stage2 !== "completed"}
                      >
                        <span
                          className={`flex flex-col items-start gap-2 ${
                            stageStatus.stage3 === "completed"
                              ? "text-green-600"
                              : "text-black"
                          }`}
                        >
                          Stage 3: Classification {renderStageText("stage3")}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        {stageStatus.stage3 === "completed" &&
                        pipelineResult?.classify ? (
                          <div className="flex flex-col gap-4">
                            {/* Summary */}
                            <div>
                              <h4 className="font-semibold text-gray-800">
                                Summary
                              </h4>
                              <p className="text-gray-700">
                                {pipelineResult.classify[0]?.analysis?.summary}
                              </p>
                            </div>

                            {/* Step by Step Reasoning */}
                            <div>
                              <h4 className="font-semibold text-gray-800">
                                Step by Step Reasoning
                              </h4>
                              <p className="text-gray-700">
                                {
                                  pipelineResult.classify[0]?.analysis
                                    ?.step_by_step_reasoning
                                }
                              </p>
                            </div>

                            {/* Reasoning */}
                            <div>
                              <h4 className="font-semibold text-gray-800">
                                Reasoning
                              </h4>
                              <p className="text-gray-700">
                                {pipelineResult.classify[0]?.reasoning}
                              </p>
                            </div>

                            {/* Category */}
                            <div>
                              <h4 className="font-semibold text-gray-800">
                                Category
                              </h4>
                              <p className="text-gray-700">
                                {pipelineResult.classify[0]?.category}
                              </p>
                            </div>

                            {/* Reasoning Steps */}
                            <div>
                              <h4 className="font-semibold text-gray-800">
                                Reasoning Steps
                              </h4>
                              <ul className="list-disc list-inside text-gray-700">
                                {pipelineResult.classify[0]?.analysis?.reasoning_steps?.map(
                                  (step: string, index: number) => (
                                    <li key={index}>{step}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        ) : stageStatus.stage3 === "processing" ? (
                          "Processing Stage 3..."
                        ) : (
                          "Waiting"
                        )}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="max-w-[650px]">
                      <AccordionTrigger
                        disabled={stageStatus.stage3 !== "completed"}
                      >
                        <span
                          className={`flex flex-col items-start gap-2 ${
                            stageStatus.stage4 === "completed"
                              ? "text-green-600"
                              : "text-black"
                          }`}
                        >
                          Stage 4: Extraction {renderStageText("stage4")}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        {stageStatus.stage4 === "completed" &&
                        pipelineResult?.extract ? (
                          <div className="flex flex-col gap-6">
                            {/* Service Lines Table */}
                            <div className="w-full overflow-x-auto overflow-hidden">
                              <table className="!w-[50px] min-w-max text-sm text-left border border-gray-200">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="px-4 py-2 border">
                                      Patient Name
                                    </th>
                                    <th className="px-4 py-2 border">
                                      Visit ID
                                    </th>
                                    <th className="px-4 py-2 border">
                                      Payer Name
                                    </th>
                                    <th className="px-4 py-2 border">
                                      Claim Number
                                    </th>
                                    <th className="px-4 py-2 border">
                                      Paid Amount
                                    </th>
                                    <th className="px-4 py-2 border">
                                      Check Number
                                    </th>
                                    <th className="px-4 py-2 border">
                                      Check Date
                                    </th>
                                    <th className="px-4 py-2 border">
                                      Service Start Date
                                    </th>
                                    <th className="px-4 py-2 border">
                                      Service End Date
                                    </th>
                                    <th className="px-4 py-2 border">
                                      Procedure Code
                                    </th>
                                    <th className="px-4 py-2 border">
                                      Billed Amount
                                    </th>
                                    <th className="px-4 py-2 border">
                                      Allowed Amount
                                    </th>
                                    <th className="px-4 py-2 border">
                                      Covered Amount
                                    </th>
                                    <th className="px-4 py-2 border">
                                      Not Covered Amount
                                    </th>
                                    <th className="px-4 py-2 border">
                                      Discount Amount
                                    </th>
                                    <th className="px-4 py-2 border">
                                      Adjustment Amount
                                    </th>
                                    <th className="px-4 py-2 border">Co-Pay</th>
                                    <th className="px-4 py-2 border">
                                      Co-Insurance
                                    </th>
                                    <th className="px-4 py-2 border">
                                      Deductible Amount
                                    </th>
                                    <th className="px-4 py-2 border">
                                      Patient Responsibility
                                    </th>
                                    <th className="px-4 py-2 border">
                                      Denied Amount
                                    </th>
                                    <th className="px-4 py-2 border">
                                      Reason Codes
                                    </th>
                                    <th className="px-4 py-2 border">
                                      Remark Codes
                                    </th>
                                    <th className="px-4 py-2 border">
                                      Description
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {pipelineResult.extract[0]?.service_lines.map(
                                    (line: any, index: any) => (
                                      <tr
                                        key={index}
                                        className="even:bg-gray-50"
                                      >
                                        <td className="px-4 py-2 border">
                                          {line.patient_name}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {line.visit_id}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {line.payer_name}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {line.claim_number}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {line.paid_amount}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {line.check_number}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {line.check_date}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {line.service_start_date}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {line.service_end_date}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {line.procedure_code}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {line.billed_amount}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {line.allowed_amount}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {line.covered_amount}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {line.not_covered_amount}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {line.discount_amount}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {line.adjustment_amount}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {line.co_pay}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {line.co_insurance}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {line.deductible_amount}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {line.patient_responsibility}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {line.denied_amount}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {line.reason_codes}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {line.remark_codes}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {line.description}
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>

                            {/* Extraction Analysis */}
                            <div className="flex flex-col gap-4">
                              <div>
                                <h4 className="font-semibold text-gray-800">
                                  Extraction Summary
                                </h4>
                                <p className="text-gray-700">
                                  {
                                    pipelineResult.extract[0]?.analysis
                                      ?.extraction_summary
                                  }
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800">
                                  Step by Step Reasoning
                                </h4>
                                <p className="text-gray-700">
                                  {
                                    pipelineResult.extract[0]?.analysis
                                      ?.step_by_step_reasoning
                                  }
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800">
                                  Continuity Check
                                </h4>
                                <p className="text-gray-700">
                                  {
                                    pipelineResult.extract[0]?.analysis
                                      ?.continuity_check
                                  }
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800">
                                  Structure Analysis
                                </h4>
                                <p className="text-gray-700">
                                  {
                                    pipelineResult.extract[0]?.analysis
                                      ?.structure_analysis
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : stageStatus.stage4 === "processing" ? (
                          "Processing Stage 4..."
                        ) : (
                          "Waiting"
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* RIGHT PANEL – DOCUMENT VIEWER */}
        <Card className="w-full lg:w-[50%] flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-0 overflow-hidden flex flex-col">
          <div className=" p-4 border-b border-gray-100 flex justify-between items-center bg-white">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Document Preview
              </h2>
              <p className="text-xs text-gray-500">
                {numPages ? `${numPages} pages` : "No document loaded"}
              </p>
            </div>
            {isLoading && (
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
            )}
          </div>

          <div className="flex-1 overflow-auto bg-gray-100/50 p-8 flex justify-center">
            {!pdfUrl ? (
              <div className="flex flex-col items-center justify-center text-gray-400">
                <FileUp className="w-12 h-12 mb-4 opacity-20" />
                <p>No PDF Selected</p>
              </div>
            ) : (
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                  <div className="flex items-center gap-2 text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" /> Loading PDF...
                  </div>
                }
                error={
                  <div className="text-red-500 text-sm bg-red-50 p-4 rounded-lg">
                    Failed to load PDF. Please try another file.
                  </div>
                }
                className="shadow-lg"
              >
                {Array.from(new Array(numPages || 0), (_, index) => (
                  <Page
                    key={index}
                    pageNumber={index + 1}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    className="mb-4 shadow-sm bg-white"
                    width={600}
                  />
                ))}
              </Document>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, type Column } from "@/components/DataTable/DataTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import {
  mockPatientOptions,
  mockPatientsData,
  type PatientData,
  type LineLevelData,
  type PatientsData,
} from "@/constants/CDMData";


export const formatCurrency = (value: string | undefined): string => {
  if (!value) return "N/A";
  return value.startsWith("$") ? value : `$${value}`;
};

const renderTooltip = (content: string | undefined, maxLength: number = 14): React.ReactNode => {
  if (!content) return <span>N/A</span>;
  
  if (content.length > maxLength) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help">{content.slice(0, maxLength)}...</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    );
  }
  return <span>{content}</span>;
};

interface PatientLevelDataProps {
  patientsData?: PatientsData;
  patientOptions?: { id: string; patientName: string }[];
}

export const PatientLevelData = ({
  patientsData = mockPatientsData,
  patientOptions = mockPatientOptions,
}: PatientLevelDataProps) => {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [patientLevelTable, setPatientLevelTable] = useState<PatientData[]>([]);
  const [lineLevelTable, setLineLevelTable] = useState<LineLevelData[]>([]);

  // Initialize with first patient on load
  useEffect(() => {
    if (patientOptions.length > 0 && !selectedPatientId) {
      setSelectedPatientId(patientOptions[0].id);
    }
  }, [patientOptions, selectedPatientId]);

  // Update tables when patient selection changes
  useEffect(() => {
    if (selectedPatientId && patientsData) {
      const filteredPatientData = patientsData.patientLevelData.filter(
        (patient) => patient.id === selectedPatientId
      );
      const filteredLineData = patientsData.lineLevelData.filter(
        (line) => line.eobPatientLevelDataId === selectedPatientId
      );
      setPatientLevelTable(filteredPatientData);
      setLineLevelTable(filteredLineData);
    }
  }, [selectedPatientId, patientsData]);

  // Handle patient selection change
  const handlePatientChange = (value: string) => {
    setSelectedPatientId(value);
  };

  // Patient-Level Data columns
  const patientLevelColumns: Column<PatientData>[] = [
    {
      key: "visitId",
      label: "Visit ID",
      render: (value) => renderTooltip(value as string),
    },
    {
      key: "paidAmount",
      label: "Paid Amount",
      render: (value) => renderTooltip(formatCurrency(value as string)),
    },
    {
      key: "payerName",
      label: "Payer Name",
      render: (value) => renderTooltip(value as string),
    },
    {
      key: "checkNumber",
      label: "Check No",
      render: (value) => renderTooltip(value as string),
    },
    {
      key: "claimNumber",
      label: "Claim No",
      render: (value) => renderTooltip(value as string),
    },
    {
      key: "patientName",
      label: "Patient Name",
      render: (value) => renderTooltip(value as string),
    },
    {
      key: "checkDate",
      label: "Check Date",
      render: (value) => <span>{(value as string) || "N/A"}</span>,
    },
  ];

  // Line-Level Data columns
  const lineLevelColumns: Column<LineLevelData>[] = [
    {
      key: "serviceStartDate",
      label: "Service Start Date",
      className: "min-w-[140px]",
      render: (value) => <span>{(value as string) || "N/A"}</span>,
    },
    {
      key: "serviceEndDate",
      label: "Service End Date",
      className: "min-w-[140px]",
      render: (value) => <span>{(value as string) || "N/A"}</span>,
    },
    {
      key: "procedureCode",
      label: "Procedure Code",
      className: "min-w-[130px]",
      render: (value) => renderTooltip(value as string),
    },
    {
      key: "billedAmount",
      label: "Billed Amount",
      className: "min-w-[120px]",
      render: (value) => renderTooltip(formatCurrency(value as string)),
    },
    {
      key: "allowedAmount",
      label: "Allowed Amount",
      className: "min-w-[130px]",
      render: (value) => renderTooltip(formatCurrency(value as string)),
    },
    {
      key: "coveredAmount",
      label: "Covered Amount",
      className: "min-w-[130px]",
      render: (value) => renderTooltip(formatCurrency(value as string)),
    },
    {
      key: "notCoveredAmount",
      label: "Not Covered",
      className: "min-w-[120px]",
      render: (value) => renderTooltip(formatCurrency(value as string)),
    },
    {
      key: "discountAmount",
      label: "Discount",
      className: "min-w-[100px]",
      render: (value) => renderTooltip(formatCurrency(value as string)),
    },
    {
      key: "adjustmentAmount",
      label: "Adjustment",
      className: "min-w-[120px]",
      render: (value) => renderTooltip(formatCurrency(value as string)),
    },
    {
      key: "coPay",
      label: "Co-Pay",
      className: "min-w-[100px]",
      render: (value) => renderTooltip(value as string),
    },
    {
      key: "coInsurance",
      label: "Co-Insurance",
      className: "min-w-[110px]",
      render: (value) => renderTooltip(value as string),
    },
    {
      key: "deductibleAmount",
      label: "Deductible",
      className: "min-w-[100px]",
      render: (value) => renderTooltip(formatCurrency(value as string)),
    },
    {
      key: "patientResponsibility",
      label: "Patient Resp.",
      className: "min-w-[120px]",
      render: (value) => renderTooltip(value as string),
    },
    {
      key: "deniedAmount",
      label: "Denied Amount",
      className: "min-w-[120px]",
      render: (value) => renderTooltip(formatCurrency(value as string)),
    },
    {
      key: "reasonCodes",
      label: "Reason Codes",
      className: "min-w-[120px]",
      render: (value) => renderTooltip(value as string),
    },
    {
      key: "remarkCodes",
      label: "Remark Codes",
      className: "min-w-[120px]",
      render: (value) => renderTooltip(value as string),
    },
    {
      key: "description",
      label: "Description",
      className: "min-w-[200px]",
      render: (value) => renderTooltip(value as string, 20),
    },
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Patient Selection Dropdown - Minimal */}
      <div className="items-center gap-4">
        <label className="text-sm font-semibold text-foreground block mb-2">Choose Patient</label>
        <Select value={selectedPatientId || ""} onValueChange={handlePatientChange}>
          <SelectTrigger className="w-[260px]">
            <SelectValue placeholder="Select a patient" />
          </SelectTrigger>
          <SelectContent>
            {patientOptions.map((patient) => {
              const patientData = patientsData.patientLevelData.find(
                (p) => p.id === patient.id
              );
              return (
                <SelectItem key={patient.id} value={patient.id}>
                  {patient.patientName}
                  {patientData?.visitId && ` (${patientData.visitId})`}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Patient Level Data Table */}
      {selectedPatientId && (
        <>
          <Card className="gap-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Patient-Level Data</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={patientLevelTable}
                columns={patientLevelColumns}
                idKey="id"
              />
            </CardContent>
          </Card>

          {/* Line Level Data Table */}
          <Card className="gap-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Line-Level Data</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={lineLevelTable}
                columns={lineLevelColumns}
                idKey="id"
              />
            </CardContent>
          </Card>
        </>
      )}

      {/* No Patient Selected Message */}
      {!selectedPatientId && (
        <div className="flex h-[250px] items-center justify-center text-muted-foreground">
          Please select a patient from the list to access detailed information!
        </div>
      )}
    </div>
  );
};

import {
  Check,
  ClipboardList,
  FileText,
  UserCheck,
  FilePlus2,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

interface Step {
  label: string;
  isCompleted: boolean;
}

interface HorizontalStepperProps {
  steps: Step[];
  currentStepIndex: number;
}

export const HorizontalStepper = (props: HorizontalStepperProps) => {
  const { steps } = props;
  const getIcon = (label: string) => {
    switch (label) {
      case "Classification":
        return FileText;
      case "Data Extraction":
        return ClipboardList;
      case "iCAN Data Verification":
        return CheckCircle;
      case "User Validation":
        return UserCheck;
      case "Process":
        return FilePlus2; // Or CopyPlus
      default:
        return FileText;
    }
  };

  return (
    <div className="w-full py-2 px-4">
      <div className="flex items-start justify-between w-full">
        {steps.map((step, index) => {
          const isCompleted = step.isCompleted;
          const Icon = getIcon(step.label);
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={index}>
              {/* Step Item */}
              <div className="flex flex-col items-center relative z-10 min-w-[50px]">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border transition-colors duration-200 mb-2 bg-white",
                    isCompleted
                      ? "border-blue-600 text-blue-600"
                      : "border-gray-300 text-gray-400"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5",
                      isCompleted ? "text-blue-600" : "text-gray-400"
                    )}
                    strokeWidth={isCompleted ? 2 : 1.5}
                  />
                </div>

                <div className="flex items-center gap-1 absolute top-11 w-max">
                  {isCompleted && <Check className="w-3 h-3 text-blue-600" />}
                  <span
                    className={cn(
                      "text-xs font-medium whitespace-nowrap",
                      isCompleted ? "text-blue-600" : "text-gray-500"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
              </div>

              {/* Connector Line - Only render if not the last item */}
              {!isLast && (
                <div className="flex-1 flex items-center px-2 mt-5">
                  <div
                    className={cn(
                      "w-full border-t border-dashed",
                      isCompleted && steps[index + 1].isCompleted
                        ? "border-blue-600"
                        : "border-gray-300"
                    )}
                    style={{ height: "1px" }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

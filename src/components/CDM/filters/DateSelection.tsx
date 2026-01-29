import { Input } from "@/components/ui/input";
import { ArrowRight } from 'lucide-react';

interface DateSelectionProps {
  fromDate: string;
  toDate: string;
  processedFromDate: string;
  processedToDate: string;
  setFromDate: (date: string) => void;
  setToDate: (date: string) => void;
  setProcessedFromDate: (date: string) => void;
  setProcessedToDate: (date: string) => void;
  errors: {
    fromDate?: boolean;
    toDate?: boolean;
    processedFromDate?: boolean;
    processedToDate?: boolean;
  };
}

const DateSelection = ({
  fromDate,
  toDate,
  processedFromDate,
  processedToDate,
  setFromDate,
  setToDate,
  setProcessedFromDate,
  setProcessedToDate,
  errors
}: DateSelectionProps) => {

  return (
    <div className="space-y-4 mb-4">
      {/* Batch Date Section */}
      <div>
        <h4 className="font-medium text-sm text-slate-700 mb-2">Batch Date</h4>
        <div className="flex items-start gap-2">
          <div className="flex-1">
             <div className="relative">
                <Input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className={`w-full rounded-md border-2 border-slate-200 focus:border-slate-300 focus-visible:ring-0 ${errors.fromDate ? 'border-red-500' : ''}`}
                />
             </div>
             {errors.fromDate && <p className="text-[10px] text-red-500 mt-1">Please select From Date</p>}
          </div>

          <ArrowRight className="w-4 h-4 text-slate-400 mt-3" />

          <div className="flex-1">
            <div className="relative">
                <Input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                min={fromDate}
                className={`w-full rounded-md border-2 border-slate-200 focus:border-slate-300 focus-visible:ring-0 ${errors.toDate ? 'border-red-500' : ''}`}
                />
            </div>
            {errors.toDate && <p className="text-[10px] text-red-500 mt-1">Please select To Date</p>}
          </div>
        </div>
      </div>

      {/* Processed Date Section */}
      <div>
        <h4 className="font-medium text-sm text-slate-700 mb-2">Processed Date</h4>
        <div className="flex items-start gap-2">
          <div className="flex-1">
             <div className="relative">
                <Input
                  type="date"
                  value={processedFromDate}
                  onChange={(e) => setProcessedFromDate(e.target.value)}
                  className={`w-full rounded-md border-2 border-slate-200 focus:border-slate-300 focus-visible:ring-0 ${errors.processedFromDate ? 'border-red-500' : ''}`}
                />
             </div>
             {errors.processedFromDate && <p className="text-[10px] text-red-500 mt-1">Please select Processed From Date</p>}
          </div>

          <ArrowRight className="w-4 h-4 text-slate-400 mt-3" />

          <div className="flex-1">
             <div className="relative">
                <Input
                  type="date"
                  value={processedToDate}
                  onChange={(e) => setProcessedToDate(e.target.value)}
                  min={processedFromDate}
                  className={`w-full rounded-md border-2 border-slate-200 focus:border-slate-300 focus-visible:ring-0 ${errors.processedToDate ? 'border-red-500' : ''}`}
                />
             </div>
             {errors.processedToDate && <p className="text-[10px] text-red-500 mt-1">Please select Processed To Date</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateSelection;

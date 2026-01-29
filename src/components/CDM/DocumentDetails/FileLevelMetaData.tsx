import { getFileLevelFields } from "@/constants/CDMData";

import { Card, CardContent } from "@/components/ui/card";
interface FileLevelMetaDataProps {
  data: any;
}

export const FileLevelMetaData = ({ data }: FileLevelMetaDataProps) => {
  const fields = getFileLevelFields(data);

  return (
    <Card className="shadow-none border-0">
      <CardContent className="p-0">
        <div className="space-y-4 max-w-2xl">
          {fields.map((field, index) => (
            <div key={index} className="grid grid-cols-[200px_20px_1fr] items-start">
              <span className="font-medium text-slate-700">{field.label}</span>
              <span className="text-slate-500">:</span>
              <span className="text-slate-900">{field.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};


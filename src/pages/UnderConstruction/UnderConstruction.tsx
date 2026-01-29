import { Construction } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

const UnderConstruction = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] text-center space-y-6 bg-slate-50">
      <div className="bg-orange-100 p-6 rounded-full">
        <Construction className="w-16 h-16 text-orange-600" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Under Construction</h1>
        <p className="text-slate-500 max-w-md">
          This feature is currently being developed. Please check back later for updates.
        </p>
      </div>
      <Button onClick={() => navigate(-1)} variant="outline">
        Go Back
      </Button>
    </div>
  );
};

export default UnderConstruction;

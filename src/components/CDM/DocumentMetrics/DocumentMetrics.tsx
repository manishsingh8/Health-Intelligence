import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/Skeleton";
import { 
  FileText, 
  Archive, 
  CheckCircle, 
  Hourglass, 
  User,  
} from "lucide-react";
import { useDocumentMetrics, type Metrics, type UserMetricsData } from "./DocumentMetrics.hook";

interface DocumentMetricsProps {
  userMetrics?: any;
}

const MetricSection = ({ 
  title, 
  data, 
  loading, 
  icon 
}: { 
  title: string; 
  data: Metrics | UserMetricsData | null; 
  loading: boolean; 
  icon: React.ReactNode;
}) => {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="p-2">
        <div className="flex items-center gap-2 mb-1">
          {icon}
          <h3 className="font-semibold text-slate-700 text-xs uppercase tracking-tight">{title}</h3>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {loading ? (
             Array(4).fill(0).map((_, i) => <MetricSkeleton key={i} />)
          ) : (
            <>
              <MetricItem 
                label="Total Docs" 
                value={data?.totalDOcs || 0} 
                icon={<FileText className="w-4 h-4 text-blue-500" />} 
              />
              <MetricItem 
                label="Archived" 
                value={data?.archived || 0} 
                icon={<Archive className="w-4 h-4 text-slate-500" />} 
              />
              <MetricItem 
                label="Processed" 
                value={data?.processedDocs || 0} 
                icon={<CheckCircle className="w-4 h-4 text-green-500" />} 
              />
              <MetricItem 
                label="Ready to Process" 
                value={data?.readyToProcess || 0} 
                icon={<Hourglass className="w-4 h-4 text-orange-500" />} 
              />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const MetricItem = ({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) => (
  <div className="flex flex-col items-center justify-center text-center p-1 rounded-lg hover:bg-slate-50 transition-colors">
    <div className="mb-0.5">
      {icon}
    </div>
    <div className="text-base font-bold text-slate-800 leading-none mb-0.5">
      {value}
    </div>
    <div className="text-[9px] text-slate-500 font-medium uppercase tracking-tight">
      {label}
    </div>
  </div>
);

const MetricSkeleton = () => (
    <div className="flex flex-col items-center justify-center space-y-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-6 w-12" />
        <Skeleton className="h-3 w-16" />
    </div>
);

export const DocumentMetrics = ({ userMetrics }: DocumentMetricsProps) => {
  const { overallMetrics, userMetricsData, loading } = useDocumentMetrics(userMetrics);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-4">
      {/* Overall Metrics Card */}
      <MetricSection 
        title="Overall Document Metrics" 
        data={overallMetrics} 
        loading={loading}
        icon={<FileText className="w-4 h-4 text-slate-500" />}
      />

      {/* User Metrics Card */}
      <MetricSection 
        title={`Assigned to Me (${userMetricsData?.userName || 'User'})`} 
        data={userMetricsData} 
        loading={loading}
        icon={<User className="w-4 h-4 text-slate-500" />}
      />
    </div>
  );
};



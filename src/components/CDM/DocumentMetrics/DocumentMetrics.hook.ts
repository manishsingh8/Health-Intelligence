import { useState, useEffect } from "react";

export interface Metrics {
  totalDOcs: number;
  archived: number;
  processedDocs: number;
  readyToProcess: number;
}

export interface UserMetricsData extends Metrics {
  userId: string;
  userName: string;
}

// Mock Data
export const MOCK_DATA = {
  overall: {
    totalDOcs: 1250,
    archived: 350,
    processedDocs: 720,
    readyToProcess: 180
  },
  user: {
    userId: '9870988',
    userName: 'John Doe',
    totalDOcs: 45,
    archived: 5,
    processedDocs: 25,
    readyToProcess: 15
  }
};

export const useDocumentMetrics = (userMetrics?: any) => {
  const [overallMetrics, setOverallMetrics] = useState<Metrics | null>(null);
  const [userMetricsData, setUserMetricsData] = useState<UserMetricsData | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate API Call
  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOverallMetrics(MOCK_DATA.overall);
      
      // If props provide user metrics, use them, otherwise use mock
      if (userMetrics && Object.keys(userMetrics).length > 0) {
        // Map prop structure to our internal structure if needed
        // Assuming the prop structure matches or we map it here
        // For now, let's use the MOCK_DATA.user to ensure full data availability as requested
        // unless specific values are passed.
        
        // The user's old code mapped props:
        /*
          const _userMetrics={ assignedDOcs: metricsTotalDoc,
          archived: metricsArchive,
          processedDocs: metricsProcessed,
          readyToProcess: metricsReadyToProcess };
        */
        const mappedUserMetrics = {
            ...MOCK_DATA.user,
            totalDOcs: userMetrics.metricsTotalDoc ?? MOCK_DATA.user.totalDOcs,
            archived: userMetrics.metricsArchive ?? MOCK_DATA.user.archived,
            processedDocs: userMetrics.metricsProcessed ?? MOCK_DATA.user.processedDocs,
            readyToProcess: userMetrics.metricsReadyToProcess ?? MOCK_DATA.user.readyToProcess,
        };
        setUserMetricsData(mappedUserMetrics);
      } else {
        setUserMetricsData(MOCK_DATA.user);
      }
      
      setLoading(false);
    };

    fetchMetrics();
  }, [userMetrics]);

  return { overallMetrics, userMetricsData, loading };
};

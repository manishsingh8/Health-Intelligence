interface RemitResponse {
  fileName: string;
  result: {
    suggestions?: any[];
    workflow?: {
      suggestedAction?: string;
      reviewPriority?: string;
    };
    analysis?: {
      claimAdjustmentReasonCodes?: any[];
      claimLevelSummary?: any;
      providerLevelAdjustments?: any[];
      remittanceAdviceRemarkCodes?: any[];
      summary?: any;
    };
    expertReviewNarrative?: string;
    adjustments?: any[];
    highConfidenceMatch?: any;
  };
}

const RenderTable = ({ data }: any) => {
  if (!data || (Array.isArray(data) && data.length === 0)) return null;

  // If array, show index + key/value per item
  if (Array.isArray(data)) {
    return (
      <table className="w-full text-left text-xs border border-gray-300">
        {/* <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 border">#</th>
            <th className="px-3 py-2 border">Item</th>
            <th className="px-3 py-2 border">Value</th>
          </tr>
        </thead> */}
        <tbody>
          {data.map((item, index) =>
            Object.entries(item).map(([key, value], i) => (
              <tr key={`${index}-${i}`} className="border-t">
                {i === 0 ? (
                  <td
                    className="px-3 py-2 border"
                    rowSpan={Object.entries(item).length}
                  >
                    {index + 1}
                  </td>
                ) : null}
                <td className="px-3 py-2 border">{key}</td>
                <td className="px-3 py-2 border">
                  {typeof value === "object"
                    ? JSON.stringify(value)
                    : String(value)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  }

  // If object, show key/value
  return (
    <table className="w-full text-left text-xs border border-gray-300">
      {/* <thead className="bg-gray-100">
        <tr>
          <th className="px-3 py-2 border">Item</th>
          <th className="px-3 py-2 border">Value</th>
        </tr>
      </thead> */}
      <tbody>
        {Object.entries(data).map(([key, value]) => (
          <tr key={key}>
            <td className="px-3 py-2 border">{key}</td>
            <td className="px-3 py-2 border">
              {typeof value === "object"
                ? JSON.stringify(value)
                : String(value)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const RemitAnalysisView = ({ data }: { data: RemitResponse }) => {
  if (!data || !data.result) return null;
  const { result } = data;
  const carcCodes = result.analysis?.claimAdjustmentReasonCodes ?? [];
  const rarcCodes = result.analysis?.remittanceAdviceRemarkCodes ?? [];
  const providerAdjustments = result.analysis?.providerLevelAdjustments ?? [];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 max-w-[100%] overflow-x-auto">
      {result.analysis?.claimLevelSummary && (
        <section>
          <h3 className="font-semibold text-lg mb-2">Claim Summary</h3>
          <RenderTable data={result.analysis.claimLevelSummary} />
        </section>
      )}
      {carcCodes.length > 0 && (
        <section>
          <h3 className="font-semibold text-lg mb-2">
            Claim Adjustment Reason Codes
          </h3>
          <RenderTable data={carcCodes} />
        </section>
      )}
      {rarcCodes.length > 0 && (
        <section>
          <h3 className="font-semibold text-lg mb-2">
            Remittance Remark Codes
          </h3>
          <RenderTable data={rarcCodes} />
        </section>
      )}
      {providerAdjustments.length > 0 && (
        <section>
          <h3 className="font-semibold text-lg mb-2">
            Provider-Level Adjustments (PLB)
          </h3>
          <RenderTable data={providerAdjustments} />
        </section>
      )}
      {result.analysis?.summary && (
        <section>
          <h3 className="font-semibold text-lg mb-2">Payment Summary</h3>
          <RenderTable data={result.analysis.summary} />
        </section>
      )}
      {result.expertReviewNarrative && (
        <section>
          <h3 className="font-semibold text-lg mb-2">Expert Review</h3>
          <div className="text-xs bg-slate-100 p-3 rounded whitespace-pre-wrap leading-relaxed">
            {result.expertReviewNarrative}
          </div>
        </section>
      )}
    </div>
  );
};

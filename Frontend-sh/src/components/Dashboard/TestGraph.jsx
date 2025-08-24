import Graph from './Graph';

const TestGraph = () => {
  const testData = [
    { clickDate: "2024-12-01", count: 15 },
    { clickDate: "2024-12-02", count: 8 },
    { clickDate: "2024-12-03", count: 12 },
    { clickDate: "2024-12-04", count: 20 },
    { clickDate: "2024-12-05", count: 5 },
    { clickDate: "2024-12-06", count: 18 },
    { clickDate: "2024-12-07", count: 25 }
  ];

  return (
    <div className="p-4 border-2 border-dashed border-blue-300 rounded-lg">
      <h3 className="text-lg font-bold mb-4 text-blue-600">
        Test Graph (with sample data)
      </h3>
      <div className="h-96">
        <Graph graphData={testData} />
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Test Data:</strong></p>
        <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
          {JSON.stringify(testData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default TestGraph;

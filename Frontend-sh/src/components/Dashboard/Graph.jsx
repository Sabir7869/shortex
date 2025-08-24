import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Filler
);

const Graph = ({ graphData, title = "Default" }) => {
  // Handle empty or invalid data
  const safeGraphData = Array.isArray(graphData) ? graphData : [];
  
  const labels = safeGraphData?.map((item, i) => {
    // Handle different date formats
    if (item.clickDate) {
      try {
        const date = new Date(item.clickDate);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
      } catch {
        // Fallback to original string if date parsing fails
        return item.clickDate;
      }
    }
    return `Day ${i + 1}`;
  });
  
  const clickCounts = safeGraphData?.map((item) => {
    const count = Number(item.count) || 0;
    return count;
  });

  const hasData = safeGraphData.length > 0 && clickCounts.some(count => count > 0);

  const data = {
    labels: safeGraphData.length > 0
        ? labels
        : ["No Data", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Total Clicks",
        data: safeGraphData.length > 0
            ? clickCounts
            : [0, 1, 2, 1, 3, 2, 1, 2, 1, 0, 1, 2, 1, 0],
        backgroundColor: hasData ? "#3b82f6" : "rgba(54, 162, 235, 0.1)",
        borderColor: hasData ? "#1D2327" : "rgba(54, 162, 235, 0.3)",
        pointBorderColor: "red",
        fill: true,
        tension: 0.4,
        barThickness: 20,
        categoryPercentage: 1.5,
        barPercentage: 1.5,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          // stepSize: 1,
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value.toString();
            }
            return "";
          },
        },
        title: {
          display: true,
          text: "Number Of Clicks",
          font: {
            family: "Arial",
            size: 16,
            weight: "bold",
            color: "#FF0000",
          },
        },
      },
      x: {
        beginAtZero: true,
        // ticks: {
        //   stepSize: 1,
        // },
        title: {
          display: true,
          text: "Date",
          font: {
            family: "Arial",
            size: 16,
            weight: "bold",
            color: "#FF0000",
          },
        },
      },
    },
  };

  return <Bar className=" w-full" data={data} options={options}></Bar>;
};

export default Graph;
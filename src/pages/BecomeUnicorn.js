import React, { useState, useEffect } from "react";
import "./Unicorn.css";
import {
  ChevronRight,
  TrendingUp,
  Target,
  Activity,
  DollarSign,
  BookOpen,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const BecomeUnicorn = () => {
  const [selectedMilestone, setSelectedMilestone] = useState("1");
  const [selectedKey, setSelectedKey] = useState("goal");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const startup_id = localStorage.getItem("token");
  useEffect(() => {
    fetch(`https://app.incubationmasters.com:5000/api/unicorn/${startup_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div></div>;
  if (error) return <div>Error: {error.message}</div>;

  // Generate financial data for charts
  const financialData = Object.keys(data.milestones).map((milestone) => ({
    name: `M${milestone}`,
    revenue:
      data.milestones[milestone]?.financialProjections?.usd?.revenue || 0,
    investment:
      data.milestones[milestone]?.financialProjections?.usd?.investment || 0,
    valuation:
      data.milestones[milestone]?.financialProjections?.usd?.valuation || 0,
  }));

  const getIcon = (key) => {
    const icons = {
      goal: <Target className="h-5 w-5 text-purple-500" />,
      keyActivities: <Activity className="h-5 w-5 text-blue-500" />,
      financialProjections: <DollarSign className="h-5 w-5 text-green-500" />,
      resources: <BookOpen className="h-5 w-5 text-orange-500" />,
    };
    return icons[key] || <ChevronRight className="h-5 w-5 text-gray-400" />;
  };

  const renderFinancialCharts = () => (
    <div className="custom-space-y-6">
      <div className="custom-card custom-bg-gradient-to-br custom-from-blue-50 custom-to-purple-50">
        <h3 className="custom-text-lg custom-font-semibold custom-mb-4">
          Revenue Growth
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={financialData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="custom-card custom-bg-gradient-to-br custom-from-green-50 custom-to-blue-50">
        <h3 className="custom-text-lg custom-font-semibold custom-mb-4">
          Investment vs Valuation
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={financialData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="investment" fill="#82ca9d" />
            <Bar dataKey="valuation" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderContent = (content, key) => {
    if (key === "financialProjections") {
      return renderFinancialCharts();
    }

    if (Array.isArray(content)) {
      return (
        <ul className="custom-list-none custom-pl-6 custom-space-y-3">
          {content.map((item, index) => (
            <li
              key={index}
              className="custom-flex custom-items-center custom-space-x-2 custom-animate-fadeIn">
              <div className="custom-h-2 custom-w-2 custom-rounded-full custom-bg-purple-400"></div>
              <span className="custom-text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    if (typeof content === "object") {
      return (
        <div className="custom-space-y-4">
          {Object.entries(content).map(([key, value]) => (
            <div key={key} className="custom-space-y-2 custom-animate-fadeIn">
              <h3 className="custom-font-medium custom-capitalize custom-text-purple-600">
                {key}
              </h3>
              {renderContent(value)}
            </div>
          ))}
        </div>
      );
    }

    return (
      <p className="custom-text-gray-700 custom-animate-fadeIn">{content}</p>
    );
  };

  const milestoneKeys = Object.keys(
    data.milestones[selectedMilestone] || {}
  ).filter((key) => key !== "timeline");

  return (
    <div className="custom-w-full custom-max-w-6xl custom-mx-auto custom-p-4 custom-bg-gradient-to-br custom-from-white custom-to-purple-50 custom-rounded-lg custom-shadow-lg">
      <div className="custom-mb-6 custom-tabs">
        <div className="custom-scroll-area">
          <div className="custom-inline-flex custom-w-full custom-border-b custom-border-purple-200 custom-bg-white-50 custom-backdrop-blur-sm custom-tabs-list">
            {Object.keys(data.milestones).map((milestone) => (
              <button
                key={milestone}
                onClick={() => setSelectedMilestone(milestone)}
                className={`custom-px-4 custom-py-2 custom-text-sm custom-transition-all custom-duration-200 custom-hover-text-purple-600 custom-tabs-trigger ${
                  selectedMilestone === milestone
                    ? "custom-tabs-trigger-active"
                    : ""
                }`}>
                Milestone {milestone}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="custom-grid custom-grid-cols-12 custom-gap-6">
        <div className="custom-col-span-3">
          <div className="custom-card custom-bg-white-50 custom-backdrop-blur-sm">
            <div className="custom-p-4">
              <h2 className="custom-font-semibold custom-mb-4 custom-text-purple-800">
                Milestone Details
              </h2>
              <div className="custom-space-y-2">
                {milestoneKeys.map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedKey(key)}
                    className={`custom-w-full custom-text-left custom-px-3 custom-py-2 custom-rounded-md custom-text-sm custom-flex custom-items-center custom-justify-between custom-transition-all custom-duration-200 custom-milestone-button ${
                      selectedKey === key
                        ? "custom-milestone-button-active"
                        : "custom-hover-bg-purple-50"
                    }`}>
                    <div className="custom-flex custom-items-center custom-space-x-2">
                      {getIcon(key)}
                      <span className="custom-capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                    </div>
                    <ChevronRight
                      className={`custom-h-4 custom-w-4 custom-transition-transform custom-duration-200 ${
                        selectedKey === key ? "custom-rotate-90" : ""
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="custom-col-span-9">
          <div className="custom-card custom-bg-white-50 custom-backdrop-blur-sm">
            <div className="custom-p-6">
              <h2 className="custom-text-xl custom-font-semibold custom-mb-4 custom-text-purple-800 custom-flex custom-items-center custom-space-x-2">
                {getIcon(selectedKey)}
                <span className="custom-capitalize">
                  {selectedKey.replace(/([A-Z])/g, " $1").trim()}
                </span>
              </h2>
              {renderContent(
                data.milestones[selectedMilestone][selectedKey],
                selectedKey
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeUnicorn;

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

const Chart = ({ fullDetails }) => {
  const extractYear = (name) => {
    const regex = /\((\d{4})\)/;
    const match = name.match(regex);
    if (match && match.length >= 2) {
      return match[1];
    } else {
      const startingYearMatch = name.match(/\((\d{4}) -/);
      if (startingYearMatch && startingYearMatch.length >= 2) {
        return startingYearMatch[1];
      } else {
        return null;
      }
    }
  };

  const seriesData = fullDetails.series.items.reduce((acc, item) => {
    const year = extractYear(item.name);
    if (year) {
      acc[year] = (acc[year] || 0) + 1;
    }
    return acc;
  }, {});

  const data = Object.keys(seriesData).map(year => ({
    year: year,
    "Number of Series Released": seriesData[year]
  }));

  // Check if data is empty
  const isEmpty = data.length === 0;

  return (
    <div style={{ width: "80%", height: 400 }}>
      {isEmpty ? (
        <div>No data available</div>
      ) : (
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Number of Series Released" fill="#74102d" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Chart;



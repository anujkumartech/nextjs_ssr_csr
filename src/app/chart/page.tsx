'use client';

import Link from 'next/link';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { generateStockData } from '@/utils/generateStockData';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 p-4 rounded shadow-lg border border-gray-700">
        <p className="text-gray-300 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-base" style={{ color: entry.color }}>
            {entry.name} : ${entry.value.toFixed(2)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ChartPage() {
  const data = generateStockData();
  const formatPrice = (value: number) => `$${value.toFixed(2)}`;
  const formatVolume = (value: number) => value.toLocaleString();

  return (
    <div className="container mx-auto py-8">
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Stock Data (Interactive Chart)</h1>
          <Link 
            href="/table" 
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Switch to Table View
          </Link>
        </div>

        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                interval={10}
              />
              <YAxis 
                yAxisId="price"
                domain={['auto', 'auto']}
                tickFormatter={formatPrice}
              />
              <YAxis 
                yAxisId="volume"
                orientation="right"
                tickFormatter={formatVolume}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="price"
                stroke="#8884d8"
                name="Stock Price"
              />
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="high"
                stroke="#82ca9d"
                name="High"
              />
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="low"
                stroke="#ff7f7f"
                name="Low"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
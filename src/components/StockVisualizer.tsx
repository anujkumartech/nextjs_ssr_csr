'use client';

import { useState } from 'react';
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

export default function StockVisualizer() {
  const [viewMode, setViewMode] = useState('chart');
  const [data] = useState(generateStockData);

  const formatPrice = (value: number) => `$${value.toFixed(2)}`;
  const formatVolume = (value: number) => value.toLocaleString();

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Stock Performance</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('chart')}
            className={`px-4 py-2 rounded ${
              viewMode === 'chart'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Chart View
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 rounded ${
              viewMode === 'table'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Table View
          </button>
        </div>
      </div>

      {viewMode === 'chart' ? (
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
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  High
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Low
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Volume
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatPrice(row.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatPrice(row.high)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatPrice(row.low)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatVolume(row.volume)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
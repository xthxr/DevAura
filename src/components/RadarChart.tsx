'use client'

import { DAIComponents } from '@/types'
import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts'

interface RadarChartComponentProps {
  data: DAIComponents
}

export function RadarChart({ data }: RadarChartComponentProps) {
  const chartData = [
    {
      subject: 'Technical',
      value: data.technical,
      fullMark: 100,
    },
    {
      subject: 'Creativity',
      value: data.creativity,
      fullMark: 100,
    },
    {
      subject: 'Social',
      value: data.social,
      fullMark: 100,
    },
    {
      subject: 'Multiplier',
      value: data.multiplier,
      fullMark: 30,
    },
  ]

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 h-full">
      <h3 className="text-xl font-semibold mb-4">Skill Distribution</h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart data={chartData}>
            <PolarGrid stroke="#4B5563" />
            <PolarAngleAxis dataKey="subject" stroke="#9CA3AF" />
            <PolarRadiusAxis stroke="#6B7280" />
            <Radar
              name="Score"
              dataKey="value"
              stroke="#A855F7"
              fill="#A855F7"
              fillOpacity={0.6}
            />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

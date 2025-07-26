import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export const ProfitChart = ({ data, period }) => {
  if (!data || data.length === 0) {
    return (
      <div className="metric-card p-6">
        <h3 className="text-lg font-semibold mb-4">수익 추이</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          차트 데이터가 없습니다
        </div>
      </div>
    )
  }

  return (
    <div className="metric-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">수익 추이</h3>
        <span className="text-sm text-gray-500 capitalize">{period}</span>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="date" 
              stroke="#666"
              fontSize={12}
            />
            <YAxis 
              stroke="#666"
              fontSize={12}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip 
              formatter={(value) => [`₩${value.toLocaleString()}`, '잔고']}
              labelFormatter={(label) => `날짜: ${label}`}
              contentStyle={{
                backgroundColor: '#f9f9f9',
                border: '1px solid #ddd',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="#3a5ba0" 
              strokeWidth={2}
              dot={{ fill: '#3a5ba0', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3a5ba0', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
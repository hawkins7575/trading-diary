import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export const ProfitChart = ({ data, period, isMobile = false }) => {
  if (!data || data.length === 0) {
    return (
      <div className={`${isMobile ? 'h-48' : 'h-64'} flex items-center justify-center text-gray-500`}>
        차트 데이터가 없습니다
      </div>
    )
  }

  // 모바일에서 데이터 포인트 수 제한
  const displayData = isMobile && data.length > 10 
    ? data.slice(-10) 
    : data

  return (
    <div className={isMobile ? "h-48" : "h-64"}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={displayData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e0e0e0" 
            horizontal={true}
            vertical={false}
          />
          <XAxis 
            dataKey="date" 
            stroke="#666"
            fontSize={isMobile ? 10 : 12}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            tickFormatter={(value) => {
              if (isMobile) {
                // 모바일에서는 MM/DD 형식으로 짧게 표시
                const date = new Date(value)
                return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`
              }
              return value
            }}
            interval={isMobile ? 'preserveStartEnd' : 0}
          />
          <YAxis 
            stroke="#666"
            fontSize={isMobile ? 10 : 12}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            tickFormatter={(value) => {
              if (isMobile) {
                if (value >= 1000000) {
                  return `${(value / 1000000).toFixed(1)}M`
                } else if (value >= 1000) {
                  return `${(value / 1000).toFixed(0)}K`
                }
                return value.toLocaleString()
              }
              return `${(value / 1000).toFixed(0)}K`
            }}
            width={isMobile ? 40 : 60}
          />
          <Tooltip 
            formatter={(value) => [`₩${value.toLocaleString()}`, '잔고']}
            labelFormatter={(label) => `날짜: ${label}`}
            contentStyle={{
              backgroundColor: '#f9f9f9',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: isMobile ? '12px' : '14px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="balance" 
            stroke="#3a5ba0" 
            strokeWidth={isMobile ? 2 : 2}
            dot={isMobile ? false : { fill: '#3a5ba0', strokeWidth: 2, r: 4 }}
            activeDot={{ r: isMobile ? 4 : 6, stroke: '#3a5ba0', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
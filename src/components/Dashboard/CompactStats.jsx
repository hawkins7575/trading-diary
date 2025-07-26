export const CompactStats = ({ stats }) => {
  return (
    <div className="metric-card p-4">
      <h3 className="text-lg font-semibold mb-4 text-foreground">요약 통계</h3>
      <div className="space-y-1">
        {stats.map((stat, index) => (
          <div key={index} className="compact-stat-item">
            <span className="stat-label-compact">{stat.label}</span>
            <span className="stat-value-compact">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
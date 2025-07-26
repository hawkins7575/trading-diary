export const MetricCard = ({ title, value, subtitle, className = '' }) => {
  return (
    <div className={`metric-card p-3 sm:p-6 ${className}`}>
      <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">{title}</h3>
      <div className="text-lg sm:text-2xl font-bold text-foreground mb-0.5 sm:mb-1">{value}</div>
      {subtitle && (
        <p className="text-xs sm:text-sm text-gray-500">{subtitle}</p>
      )}
    </div>
  )
}
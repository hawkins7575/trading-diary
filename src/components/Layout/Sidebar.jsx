import { BarChart3, BookOpen, Target, TrendingUp, HelpCircle, Menu, X, DollarSign, MessageSquare } from 'lucide-react'
import { TABS } from '@/constants'

const sidebarItems = [
  { id: TABS.DASHBOARD, label: '대시보드', icon: BarChart3 },
  { id: 'trades', label: '거래 내역', icon: DollarSign },
  { id: TABS.JOURNAL, label: '매매일지', icon: BookOpen },
  { id: TABS.STRATEGIES, label: '매매전략', icon: TrendingUp },
  { id: TABS.GOALS, label: '목표설정', icon: Target },
  { id: TABS.ANALYTICS, label: '매매복기', icon: BarChart3 },
  { id: TABS.FEEDBACK, label: '요청사항', icon: MessageSquare },
  { id: TABS.HELP, label: '도움말', icon: HelpCircle },
]

export const Sidebar = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-lg shadow-md"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 
        transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300 ease-in-out
        sidebar-container p-6 border-r border-gray-200
      `}>
        <div className="flex items-center mb-8 mt-12 md:mt-0">
          <h1 className="text-xl font-bold text-foreground">Coin Trading Tracker</h1>
        </div>
        
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setIsMobileMenuOpen(false)
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors
                  ${activeTab === item.id 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
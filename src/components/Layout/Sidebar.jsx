import { 
  LayoutDashboard, 
  History, 
  BookOpen, 
  Target, 
  TrendingUp, 
  HelpCircle, 
  Menu, 
  X, 
  MessageSquare,
  ShieldCheck,
  ChevronRight
} from 'lucide-react'
import { TABS } from '@/constants'

const sidebarItems = [
  { id: TABS.DASHBOARD, label: '통합 대시보드', icon: LayoutDashboard },
  { id: TABS.TRADES, label: '거래 히스토리', icon: History },
  { id: TABS.JOURNAL, label: '매매일지', icon: BookOpen },
  { id: TABS.ANALYTICS, label: '데이터 분석', icon: TrendingUp },
  { id: TABS.STRATEGIES, label: '매매 전략', icon: ShieldCheck },
  { id: TABS.GOALS, label: '재무 목표', icon: Target },
]

const supportItems = [
  { id: TABS.FEEDBACK, label: '문의 및 피드백', icon: MessageSquare },
  { id: TABS.HELP, label: '사용 가이드', icon: HelpCircle },
]

export const Sidebar = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <>
      {/* Mobile menu button */}
      {!isMobileMenuOpen && (
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden fixed top-6 left-6 z-50 p-2 bg-white rounded-xl shadow-soft border border-slate-200"
        >
          <Menu size={20} className="text-slate-600" />
        </button>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-72 
        transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-all duration-300 ease-in-out
        sidebar-container flex flex-col
      `}>
        {/* Logo Section */}
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <TrendingUp size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Trading<span className="text-primary-light">Dialy</span></span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Navigation */}
        <div className="flex-1 px-4 py-4 overflow-y-auto space-y-8">
          <div>
            <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">메인 메뉴</p>
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group
                      ${isActive 
                        ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon size={18} className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight size={14} className="text-white/60" />}
                  </button>
                )
              })}
            </nav>
          </div>

          <div>
            <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">지원 및 도움말</p>
            <nav className="space-y-1">
              {supportItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`
                      w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all
                      ${isActive 
                        ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                      }
                    `}
                  >
                    <Icon size={18} className="mr-3" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>


      </aside>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
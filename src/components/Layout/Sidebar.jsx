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
  ChevronRight,
  Zap,
  Globe,
  Settings
} from 'lucide-react'
import { TABS } from '@/constants'

const sidebarItems = [
  { id: TABS.DASHBOARD, label: '통합 대시보드', icon: LayoutDashboard, tag: 'Live' },
  { id: TABS.TRADES, label: '거래 히스토리', icon: History, tag: 'Raw Data' },
  { id: TABS.JOURNAL, label: '매매일지', icon: BookOpen },
  { id: TABS.ANALYTICS, label: '분석', icon: TrendingUp, tag: 'AI' },
  { id: TABS.STRATEGIES, label: '매매전략', icon: ShieldCheck },
  { id: TABS.GOALS, label: '목표', icon: Target },
]

const supportItems = [
  { id: TABS.FEEDBACK, label: '개발자 피드백', icon: MessageSquare },
  { id: TABS.HELP, label: '사용 가이드', icon: HelpCircle },
]

export const Sidebar = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <>
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-72 
        transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-all duration-500 ease-in-out
        bg-slate-900 flex flex-col shadow-2xl border-r border-slate-800
      `}>
        {/* Logo Section: 통일성 있는 브랜드 디자인 (Green -> Blue/Indigo Reversion) */}
        <div className="p-10 flex items-center justify-between border-b border-slate-800/50">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20 active:scale-95 transition-all">
                <TrendingUp size={22} className="text-white" strokeWidth={3} />
              </div>
              <span className="text-[20px] font-bold tracking-tighter text-white uppercase">Trading<span className="font-black text-indigo-500">Diary</span></span>
            </div>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] pl-13 opacity-70">Perspective Studio</p>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden p-2 text-slate-400 hover:text-white bg-slate-800/50 rounded-xl transition-all"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>
        
        {/* Navigation Content */}
        <div className="flex-1 px-5 py-10 overflow-y-auto no-scrollbar space-y-12">
          <div>
            <div className="flex items-center space-x-2 px-4 mb-5">
             <Globe size={14} className="text-slate-600" />
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">Main Perspective</p>
            </div>
            <nav className="space-y-1.5">
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
                      w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all group active:scale-[0.98]
                      ${isActive 
                        ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 scale-105 ring-4 ring-indigo-600/5' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent hover:border-slate-800/50'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-1.5 rounded-xl transition-colors ${isActive ? 'bg-white/10' : 'bg-transparent group-hover:bg-slate-700/50'}`}>
                         <Icon size={18} strokeWidth={isActive ? 3 : 2} className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'} />
                      </div>
                      <span className="tracking-tight">{item.label}</span>
                    </div>
                    {item.tag && (
                      <span className={`text-[8px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-tighter ${isActive ? 'bg-white/10 text-white' : 'bg-slate-800 text-slate-500'}`}>
                        {item.tag}
                      </span>
                    )}
                  </button>
                )
              })}
            </nav>
          </div>

          <div>
             <div className="flex items-center space-x-2 px-4 mb-5">
               <Settings size={14} className="text-slate-600" />
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">Support & Policy</p>
            </div>
            <nav className="space-y-1.5">
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
                      w-full flex items-center px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all group active:scale-[0.98]
                      ${isActive 
                        ? 'bg-slate-100 text-slate-900 shadow-xl shadow-slate-200' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent hover:border-slate-800/50'
                      }
                    `}
                  >
                    <div className={`p-1.5 rounded-xl mr-3 ${isActive ? 'bg-slate-200' : 'bg-transparent group-hover:bg-slate-700/50'}`}>
                       <Icon size={18} strokeWidth={isActive ? 3 : 2} className={isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-300'} />
                    </div>
                    <span className="tracking-tight">{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-8 border-t border-slate-800/50">
           <div className="bg-slate-800/50 rounded-2xl p-4 flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                 <Zap size={14} className="text-indigo-500 animate-pulse" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-bold text-white uppercase tracking-widest leading-none mb-1">Status</span>
                 <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter leading-none">Perspective Node Active</span>
              </div>
           </div>
        </div>
      </aside>

      {/* Mobile overlay with premium blur */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/80 backdrop-blur-md md:hidden transition-all duration-500 ease-in-out"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
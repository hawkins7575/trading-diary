import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { Calendar, TrendingUp, TrendingDown, DollarSign, Plus, Trash2, Edit, Download, Upload, FileText, Save, BarChart3, Activity, Settings, Wallet, MessageSquare, X, CheckCircle, Eye, EyeOff, Search, Filter, Camera, Target, Clock, Star, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Home, BookOpen, Brain, Keyboard, Mouse, Smartphone } from 'lucide-react';

// Import separated hooks
import {
  useKeyboardShortcuts,
  useSwipeGestures,
  useDragAndDrop,
  useSimpleLog,
  useTradeCalculations
} from './hooks';

// Import separated components
import {
  Toast,
  CircularProgress,
  MiniChart,
  FloatingActionButton,
  SmartFilters
} from './components';

// Import utilities
import { formatCurrency, formatPercentage, validateTrade } from './utils';

export default function EnhancedCoinTradingTracker() {
  // State management
  const [trades, setTrades] = useState([]);
  const [tradingJournals, setTradingJournals] = useState([]);
  const [tradingStrategies, setTradingStrategies] = useState([]);
  const [currentTrade, setCurrentTrade] = useState({
    date: new Date().toISOString().split('T')[0],
    entry: '',
    withdrawal: '',
    balance: '',
    profit: 0,
    profitRate: 0,
    memo: ''
  });
  
  const [viewMode, setViewMode] = useState('daily');
  const [showForm, setShowForm] = useState(false);
  const [editingTrade, setEditingTrade] = useState(null);
  const [showImportExport, setShowImportExport] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showMemoModal, setShowMemoModal] = useState(false);
  const [currentMemo, setCurrentMemo] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filteredTrades, setFilteredTrades] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Use separated hooks
  const { log } = useSimpleLog();
  const { calculateCumulativeData, calculateProfitAndRate, getStats, getRecentAmounts } = useTradeCalculations(trades);

  // Toast management
  const addToast = useCallback((message, type = 'info') => {
    const toast = {
      id: Date.now() + Math.random(),
      message,
      type
    };
    setToasts(prev => [...prev, toast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toast.id));
    }, 5000);
  }, []);

  const removeToast = useCallback((toastId) => {
    setToasts(prev => prev.filter(t => t.id !== toastId));
  }, []);

  // Trade management
  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setFormErrors({});

    const validation = validateTrade(currentTrade);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const prevBalance = trades.length > 0 ? trades[trades.length - 1].balance : 0;
      const { profit, profitRate, error } = calculateProfitAndRate(
        currentTrade.entry,
        currentTrade.withdrawal,
        currentTrade.balance,
        prevBalance
      );

      if (error) {
        setFormErrors({ balance: error });
        setIsSubmitting(false);
        return;
      }

      const tradeData = {
        ...currentTrade,
        id: editingTrade?.id || Date.now(),
        profit,
        profitRate,
        entry: parseFloat(currentTrade.entry) || 0,
        withdrawal: parseFloat(currentTrade.withdrawal) || 0,
        balance: parseFloat(currentTrade.balance)
      };

      if (editingTrade) {
        setTrades(prev => prev.map(t => t.id === editingTrade.id ? tradeData : t));
        addToast('거래가 수정되었습니다', 'success');
      } else {
        setTrades(prev => [...prev, tradeData].sort((a, b) => new Date(a.date) - new Date(b.date)));
        addToast('거래가 추가되었습니다', 'success');
      }

      handleCancel();
    } catch (error) {
      addToast('거래 저장 중 오류가 발생했습니다', 'error');
    } finally {
      setIsSubmitting(false);
    }
  }, [currentTrade, editingTrade, trades, calculateProfitAndRate, addToast, isSubmitting]);

  const handleCancel = useCallback(() => {
    setShowForm(false);
    setEditingTrade(null);
    setCurrentTrade({
      date: new Date().toISOString().split('T')[0],
      entry: '',
      withdrawal: '',
      balance: '',
      profit: 0,
      profitRate: 0,
      memo: ''
    });
    setFormErrors({});
    setIsSubmitting(false);
  }, []);

  const handleDelete = useCallback((tradeId) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setTrades(prev => prev.filter(t => t.id !== tradeId));
      addToast('거래가 삭제되었습니다', 'success');
    }
  }, [addToast]);

  const handleEdit = useCallback((trade) => {
    setEditingTrade(trade);
    setCurrentTrade(trade);
    setShowForm(true);
  }, []);

  // Filtering
  const handleFilter = useCallback((filterId) => {
    let filtered = [...trades];
    
    switch (filterId) {
      case 'profit':
        filtered = trades.filter(t => (t.profit || 0) > 0);
        break;
      case 'loss':
        filtered = trades.filter(t => (t.profit || 0) < 0);
        break;
      case 'thisWeek':
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        filtered = trades.filter(t => new Date(t.date) >= weekAgo);
        break;
      case 'large':
        filtered = trades.filter(t => (t.entry || 0) >= 1000000);
        break;
      default:
        filtered = trades;
    }
    
    if (searchQuery) {
      filtered = filtered.filter(t => 
        t.memo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.date.includes(searchQuery)
      );
    }
    
    setFilteredTrades(filtered);
  }, [trades, searchQuery]);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    'Ctrl+n': () => setShowForm(true),
    'Ctrl+s': () => showForm && handleSubmit(),
    'Ctrl+d': () => setActiveTab('dashboard'),
    'Escape': () => showForm && handleCancel(),
    'Ctrl+/': () => setShowShortcutsHelp(!showShortcutsHelp)
  });

  // Swipe gestures for tab navigation
  useSwipeGestures({
    onSwipeLeft: () => {
      const tabs = ['dashboard', 'analytics', 'trades'];
      const currentIndex = tabs.indexOf(activeTab);
      if (currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1]);
      }
    },
    onSwipeRight: () => {
      const tabs = ['dashboard', 'analytics', 'trades'];
      const currentIndex = tabs.indexOf(activeTab);
      if (currentIndex > 0) {
        setActiveTab(tabs[currentIndex - 1]);
      }
    }
  });

  // Update filtered trades when dependencies change
  useEffect(() => {
    handleFilter(activeFilter);
  }, [activeFilter, trades, searchQuery, handleFilter]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-500/20 rounded-lg">
                    <DollarSign size={20} className="text-emerald-400" />
                  </div>
                  <h3 className="text-slate-300 font-medium">총 수익</h3>
                </div>
                <p className="text-2xl font-mono font-bold text-emerald-400">
                  {formatCurrency(getStats.totalProfit || 0)}
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  평균: {formatCurrency(getStats.avgProfit || 0)}
                </p>
              </div>

              <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <TrendingUp size={20} className="text-blue-400" />
                  </div>
                  <h3 className="text-slate-300 font-medium">수익률</h3>
                </div>
                <p className="text-2xl font-mono font-bold text-blue-400">
                  {formatPercentage(getStats.totalProfitRate || 0)}
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  승률: {formatPercentage(getStats.winRate || 0)}
                </p>
              </div>

              <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Activity size={20} className="text-purple-400" />
                  </div>
                  <h3 className="text-slate-300 font-medium">총 거래</h3>
                </div>
                <p className="text-2xl font-mono font-bold text-white">
                  {getStats.totalTrades || 0}건
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  이번 주: {filteredTrades.filter(t => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return new Date(t.date) >= weekAgo;
                  }).length}건
                </p>
              </div>

              <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-500/20 rounded-lg">
                    <Wallet size={20} className="text-amber-400" />
                  </div>
                  <h3 className="text-slate-300 font-medium">현재 잔고</h3>
                </div>
                <p className="text-2xl font-mono font-bold text-amber-400">
                  {formatCurrency(getStats.currentBalance || 0)}
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  투자금: {formatCurrency(getStats.totalInvested || 0)}
                </p>
              </div>
            </div>

            {/* Chart */}
            {trades.length > 0 && (
              <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                <h3 className="text-white text-lg font-bold mb-4">수익 추이</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={calculateCumulativeData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151', 
                          borderRadius: '8px' 
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="cumulativeProfit" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        dot={{ fill: '#10B981', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        );

      case 'trades':
        return (
          <div className="space-y-6">
            <SmartFilters 
              trades={trades}
              onFilter={handleFilter}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />

            {/* Search */}
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="거래 검색 (메모, 날짜)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Plus size={18} />
                새 거래
              </button>
            </div>

            {/* Trades Table */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">날짜</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">입금</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">출금</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">잔고</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">수익</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">수익률</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">액션</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {filteredTrades.map((trade) => (
                      <tr key={trade.id} className="hover:bg-slate-700/50">
                        <td className="px-4 py-3 text-sm text-white font-mono">{trade.date}</td>
                        <td className="px-4 py-3 text-sm text-white font-mono">
                          {trade.entry ? formatCurrency(trade.entry) : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-white font-mono">
                          {trade.withdrawal ? formatCurrency(trade.withdrawal) : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-white font-mono">
                          {formatCurrency(trade.balance)}
                        </td>
                        <td className={`px-4 py-3 text-sm font-mono ${trade.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {trade.profit >= 0 ? '+' : ''}{formatCurrency(trade.profit)}
                        </td>
                        <td className={`px-4 py-3 text-sm font-mono ${trade.profitRate >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {trade.profitRate >= 0 ? '+' : ''}{formatPercentage(trade.profitRate)}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(trade)}
                              className="text-blue-400 hover:text-blue-300"
                              title="수정"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(trade.id)}
                              className="text-red-400 hover:text-red-300"
                              title="삭제"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-slate-400">선택된 탭의 내용을 준비 중입니다...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Enhanced Coin Trading Tracker</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'dashboard' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              대시보드
            </button>
            <button
              onClick={() => setActiveTab('trades')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'trades' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              거래내역
            </button>
          </div>
        </div>

        {/* Main Content */}
        {renderTabContent()}

        {/* Status message */}
        <div className="text-white text-center mt-8 bg-slate-800 p-6 rounded-lg border border-slate-700">
          <p className="text-xl mb-2">🎉 코드가 효율적으로 분리되었습니다!</p>
          <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
            <div>
              <span className="text-blue-400 font-bold">훅스:</span> 5개
            </div>
            <div>
              <span className="text-green-400 font-bold">컴포넌트:</span> 5개
            </div>
            <div>
              <span className="text-purple-400 font-bold">유틸리티:</span> 2개
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>

      {/* Trading Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingTrade ? '거래 수정' : '새 거래'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1">날짜</label>
                <input
                  type="date"
                  value={currentTrade.date}
                  onChange={(e) => setCurrentTrade({...currentTrade, date: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                />
                {formErrors.date && <p className="text-red-400 text-xs mt-1">{formErrors.date}</p>}
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1">입금</label>
                <input
                  type="number"
                  placeholder="0"
                  value={currentTrade.entry}
                  onChange={(e) => setCurrentTrade({...currentTrade, entry: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1">출금</label>
                <input
                  type="number"
                  placeholder="0"
                  value={currentTrade.withdrawal}
                  onChange={(e) => setCurrentTrade({...currentTrade, withdrawal: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1">잔고</label>
                <input
                  type="number"
                  placeholder="현재 잔고"
                  value={currentTrade.balance}
                  onChange={(e) => setCurrentTrade({...currentTrade, balance: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                />
                {formErrors.balance && <p className="text-red-400 text-xs mt-1">{formErrors.balance}</p>}
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1">메모</label>
                <textarea
                  placeholder="거래 메모..."
                  value={currentTrade.memo || ''}
                  onChange={(e) => setCurrentTrade({...currentTrade, memo: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white h-20 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {isSubmitting ? '처리 중...' : (editingTrade ? '수정' : '추가')}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
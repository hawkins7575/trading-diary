import { useState } from 'react'
import { ChevronDown, ChevronRight, BarChart3, DollarSign, BookOpen, TrendingUp, Target, HelpCircle } from 'lucide-react'

const helpSections = [
  {
    id: 'overview',
    title: '📱 앱 개요',
    icon: HelpCircle,
    content: [
      {
        title: 'Trading Diary란?',
        description: '코인 거래를 체계적으로 기록하고 분석할 수 있는 매매일지 앱입니다.'
      },
      {
        title: '주요 기능',
        description: '거래 기록, 매매일지 작성, 전략 관리, 목표 설정, 패턴 분석 등을 제공합니다.'
      },
      {
        title: '데이터 저장',
        description: '모든 데이터는 브라우저에 안전하게 저장되며, 선택적으로 클라우드 동기화가 가능합니다.'
      }
    ]
  },
  {
    id: 'dashboard',
    title: '📊 대시보드 사용법',
    icon: BarChart3,
    content: [
      {
        title: '주요 지표 확인',
        description: '현재 잔고, 총 수익, 승률, 거래 횟수 등을 한눈에 확인할 수 있습니다.'
      },
      {
        title: '수익 추이 차트',
        description: '일간, 주간, 월간 수익 추이를 차트로 확인하고 성과를 분석하세요.'
      },
      {
        title: '최근 거래 내역',
        description: '최근 5건의 거래를 빠르게 확인하고 상세 내용을 검토할 수 있습니다.'
      }
    ]
  },
  {
    id: 'trades',
    title: '💰 거래 기록 관리',
    icon: DollarSign,
    content: [
      {
        title: '거래 추가하기',
        description: '"새 거래" 버튼을 클릭하여 날짜, 입금/출금액, 잔고, 메모를 기록하세요.'
      },
      {
        title: '패턴 태그 활용',
        description: '성공/실패 패턴을 태그로 분류하여 나중에 패턴 분석에 활용할 수 있습니다.'
      },
      {
        title: '매매 체크리스트',
        description: '거래 전 확인해야 할 항목들을 체크리스트로 관리하여 실수를 줄이세요.'
      },
      {
        title: '감정 및 확신도',
        description: '거래 시 감정 상태와 확신도를 기록하여 심리적 패턴을 분석하세요.'
      }
    ]
  },
  {
    id: 'journal',
    title: '📝 매매일지 작성',
    icon: BookOpen,
    content: [
      {
        title: '일지 작성하기',
        description: '매일의 매매 경험과 느낀 점을 자세히 기록하여 성장하세요.'
      },
      {
        title: '기분 기록',
        description: '거래 후 기분을 이모티콘으로 기록하여 감정적 패턴을 파악하세요.'
      },
      {
        title: '학습 노트',
        description: '성공/실패 요인, 배운 점, 개선점 등을 구체적으로 기록하세요.'
      }
    ]
  },
  {
    id: 'strategies',
    title: '📈 매매전략 관리',
    icon: TrendingUp,
    content: [
      {
        title: '전략 문서화',
        description: '매수/매도 조건, 리스크 관리 방법을 체계적으로 문서화하세요.'
      },
      {
        title: '백테스팅 기록',
        description: '전략의 과거 성과와 수정 사항을 기록하여 개선해나가세요.'
      },
      {
        title: '리스크 수준 설정',
        description: '각 전략의 리스크 수준을 설정하여 자금 관리에 활용하세요.'
      }
    ]
  },
  {
    id: 'goals',
    title: '🎯 목표 설정',
    icon: Target,
    content: [
      {
        title: 'SMART 목표 설정',
        description: '구체적이고 측정 가능한 목표를 설정하여 동기부여를 높이세요.'
      },
      {
        title: '진행률 추적',
        description: '목표 달성 진행률을 시각적으로 확인하고 동기를 유지하세요.'
      },
      {
        title: '마감일 관리',
        description: '목표별 마감일을 설정하여 시간 관리를 효율적으로 하세요.'
      }
    ]
  },
  {
    id: 'analytics',
    title: '📊 매매복기 활용',
    icon: BarChart3,
    content: [
      {
        title: '패턴 분석',
        description: '성공/실패 패턴을 통계로 분석하여 강점과 약점을 파악하세요.'
      },
      {
        title: '감정 분석',
        description: '감정 상태별 성과를 분석하여 감정 관리의 중요성을 인식하세요.'
      },
      {
        title: '체크리스트 효과',
        description: '체크리스트 준수 여부에 따른 성과 차이를 확인하고 개선하세요.'
      },
      {
        title: '개선 제안',
        description: '데이터 기반의 구체적인 개선 제안을 참고하여 실력을 향상시키세요.'
      }
    ]
  },
  {
    id: 'tips',
    title: '💡 효과적인 사용 팁',
    icon: HelpCircle,
    content: [
      {
        title: '꾸준한 기록',
        description: '매 거래마다 빠짐없이 기록하는 습관을 만드세요. 데이터가 많을수록 분석이 정확해집니다.'
      },
      {
        title: '솔직한 기록',
        description: '실수나 감정적 거래도 솔직하게 기록하세요. 이를 통해 진정한 성장이 가능합니다.'
      },
      {
        title: '주기적 복기',
        description: '주 1회 이상 매매복기를 통해 패턴을 분석하고 전략을 개선하세요.'
      },
      {
        title: '목표 재조정',
        description: '시장 상황과 개인 성장에 맞춰 목표를 주기적으로 재조정하세요.'
      },
      {
        title: '감정 관리',
        description: '거래 전후 감정 상태를 기록하여 감정이 거래에 미치는 영향을 파악하세요.'
      }
    ]
  }
]

export const HelpGuide = () => {
  const [openSections, setOpenSections] = useState(new Set(['overview']))

  const toggleSection = (sectionId) => {
    const newOpenSections = new Set(openSections)
    if (newOpenSections.has(sectionId)) {
      newOpenSections.delete(sectionId)
    } else {
      newOpenSections.add(sectionId)
    }
    setOpenSections(newOpenSections)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">사용 가이드</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Trading Diary를 효과적으로 활용하는 방법을 알아보세요. 
          체계적인 거래 기록과 분석을 통해 더 나은 트레이더가 되어보세요.
        </p>
      </div>

      <div className="space-y-4">
        {helpSections.map((section) => {
          const Icon = section.icon
          const isOpen = openSections.has(section.id)

          return (
            <div key={section.id} className="metric-card overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Icon size={24} className="text-primary" />
                  <h3 className="text-xl font-semibold">{section.title}</h3>
                </div>
                {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </button>

              {isOpen && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-4 space-y-6">
                    {section.content.map((item, index) => (
                      <div key={index} className="flex space-x-4">
                        <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                          <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 추가 도움말 */}
      <div className="metric-card p-6 bg-blue-50 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">🆘 추가 도움이 필요하신가요?</h3>
        <div className="space-y-2 text-blue-800">
          <p>• 문제가 발생하면 브라우저를 새로고침해보세요</p>
          <p>• 데이터 백업을 위해 정기적으로 내보내기를 활용하세요</p>
          <p>• 더 자세한 도움이 필요하면 개발자에게 문의하세요</p>
        </div>
      </div>

      {/* 버전 정보 */}
      <div className="text-center text-sm text-gray-500 pt-6 border-t border-gray-200">
        <p>Trading Diary v2.0.0</p>
        <p>© 2024 Trading Diary. All rights reserved.</p>
      </div>
    </div>
  )
}
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
        title: '수익률(ROI) 지표',
        description: '총 자산 및 누적 순수익 카드 우측 상단에 초기 시드머니 대비 수익률(%)이 표시되어 투자 성과를 직관적으로 확인할 수 있습니다.'
      },
      {
        title: '피크/최대 손실율',
        description: '역대 최고 수익 및 최대 손실 발생 시, 당시 잔고 대비 수익/손실 비율(%)을 함께 표시하여 매매의 파급력을 분석합니다.'
      },
      {
        title: '실시간 자산 추적',
        description: '현재 잔고 및 누적 수익 추이를 차트로 확인하고 성과를 분석하세요.'
      }
    ]
  },
  {
    id: 'trades',
    title: '💰 거래 기록 관리',
    icon: DollarSign,
    content: [
      {
        title: '시드머니(Seed Money) 관리',
        description: '입력창 최상단에 시드머니 항목이 배치됩니다. 이전 거래의 시드머니가 자동으로 불러와지므로 변경 시에만 수정하면 되어 편리합니다.'
      },
      {
        title: '정교한 손익 계산',
        description: '매매 손익은 단순히 입출금을 뺀값이 아니라, "현재 잔고 - (이전 잔고 + 입금 - 출금)" 공식을 통해 실제 자산의 변화량을 정확히 추적합니다.'
      },
      {
        title: '패턴 태그 & 체크리스트',
        description: '성공/실패 패턴 태그와 매매 전 체크리스트를 활용하여 매매 원칙 준수 여부를 기록하세요.'
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
    title: '📊 매매분석(수익 구조)',
    icon: BarChart3,
    content: [
      {
        title: 'Profit Factor (수익 지수)',
        description: '총 익절액을 총 손절액으로 나눈 값입니다. 1.0 이상이면 수익 구간이며, 2.0 이상이면 매우 안정적인 수익 구조를 의미합니다.'
      },
      {
        title: 'Reward/Risk Analysis',
        description: '평균 수익과 평균 손실의 비율(손익비)을 분석하여 본인의 매매 성향과 전략의 효율성을 평가합니다.'
      },
      {
        title: '손익분기(B.E) 승률',
        description: '현재 본인의 손익비 기준, 자산이 깎이지 않기 위해 유지해야 할 최소 승률을 계산하여 목표를 제시합니다.'
      },
      {
        title: '성공/실패 패턴 리포트',
        description: '태그 데이터를 기반으로 어떤 상황에서 승률이 높은지 AI 스타일의 통계 리포트를 제공합니다.'
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
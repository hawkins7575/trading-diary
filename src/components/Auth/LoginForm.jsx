import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export const LoginForm = ({ onLogin, onSignUp, error }) => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {isSignUp ? '회원가입' : '로그인'}
        </h2>
        <p className="mt-2 text-gray-600">
          {isSignUp 
            ? '새 계정을 만들어 거래 데이터를 안전하게 관리하세요' 
            : '계정에 로그인하여 거래 데이터에 액세스하세요'
          }
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={isSignUp ? onSignUp : onLogin} className="space-y-4">
        {/* 이메일 */}
        <div>
          <label className="form-label">이메일</label>
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="your@email.com"
            required
          />
        </div>

        {/* 비밀번호 */}
        <div>
          <label className="form-label">비밀번호</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="form-input pr-10"
              placeholder="비밀번호를 입력하세요"
              minLength={6}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {isSignUp && (
            <p className="mt-1 text-sm text-gray-500">최소 6자 이상 입력해주세요</p>
          )}
        </div>

        {/* 비밀번호 확인 (회원가입 시만) */}
        {isSignUp && (
          <div>
            <label className="form-label">비밀번호 확인</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                className="form-input pr-10"
                placeholder="비밀번호를 다시 입력하세요"
                minLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        )}

        {/* 로그인/회원가입 버튼 */}
        <button
          type="submit"
          className="w-full btn-primary"
        >
          {isSignUp ? '회원가입' : '로그인'}
        </button>
      </form>

      {/* 모드 전환 */}
      <div className="text-center">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-primary hover:text-primary/80 text-sm font-medium"
        >
          {isSignUp 
            ? '이미 계정이 있으신가요? 로그인하기' 
            : '계정이 없으신가요? 회원가입하기'
          }
        </button>
      </div>

      {/* 로컬 모드 안내 */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">💡 로컬 모드</h4>
        <p className="text-sm text-gray-600">
          클라우드 서비스가 연결되지 않은 경우 로컬 모드로 작동합니다. 
          데이터는 브라우저에 안전하게 저장되며, 동일한 브라우저에서만 액세스할 수 있습니다.
        </p>
      </div>
    </div>
  )
}
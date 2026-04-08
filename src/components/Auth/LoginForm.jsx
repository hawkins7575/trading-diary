import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, UserPlus, LogIn, Sparkles } from 'lucide-react'

export const LoginForm = ({ onLogin, onSignUp, error }) => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center">
        <div className="w-16 h-16 bg-slate-900 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-slate-200">
           {isSignUp ? <UserPlus className="text-white" size={28} /> : <LogIn className="text-white" size={28} />}
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-3">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">
           {isSignUp ? 'New Member Registration' : 'Secure Login Access'}
        </p>
      </div>

      {error && (
        <div className="p-4.5 bg-rose-50 border border-rose-100 rounded-2xl flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-rose-500 flex items-center justify-center text-white flex-shrink-0">
             <Sparkles size={16} />
          </div>
          <p className="text-rose-600 text-sm font-bold tracking-tight">{error}</p>
        </div>
      )}

      <form onSubmit={isSignUp ? onSignUp : onLogin} className="space-y-5">
        {/* 이메일 */}
        <div className="space-y-2">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Architecture</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-slate-900 transition-colors">
               <Mail size={18} />
            </div>
            <input
              type="email"
              name="email"
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-slate-100 focus:border-slate-300 transition-all outline-none"
              placeholder="your@perspective.com"
              required
            />
          </div>
        </div>

        {/* 비밀번호 */}
        <div className="space-y-2">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Secure Password</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-slate-900 transition-colors">
               <Lock size={18} />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-12 text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-slate-100 focus:border-slate-300 transition-all outline-none"
              placeholder="••••••••"
              minLength={6}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-300 hover:text-slate-900 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* 비밀번호 확인 (회원가입 시만) */}
        {isSignUp && (
          <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm Identity</label>
            <div className="relative group">
               <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-slate-900 transition-colors">
                  <Lock size={18} />
               </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-12 text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-slate-100 focus:border-slate-300 transition-all outline-none"
                placeholder="••••••••"
                minLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-300 hover:text-slate-900 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        )}

        {/* 로그인/회원가입 버튼 */}
        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-4.5 rounded-2xl font-black text-sm shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-95 transition-all mt-6"
        >
          {isSignUp ? 'Create New Account' : 'Authenticate Session'}
        </button>
      </form>

      {/* 모드 전환 */}
      <div className="text-center pt-2">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-slate-400 hover:text-slate-900 text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 mx-auto"
        >
          <span>{isSignUp ? 'Existing Member?' : 'New Perspective?'}</span>
          <span className="text-indigo-600 underline underline-offset-4">{isSignUp ? 'Login Here' : 'Register Here'}</span>
        </button>
      </div>

      {/* 로컬 모드 안내 */}
      <div className="p-6 bg-slate-50/50 border border-slate-100 rounded-[2rem] relative bg-noise">
        <h4 className="text-[10px] font-black text-slate-900 mb-2 uppercase tracking-widest flex items-center">
           <Sparkles size={12} className="text-amber-500 mr-2" />
           Local Perspective Mode
        </h4>
        <p className="text-[12px] text-slate-500 font-bold leading-relaxed">
          클라우드 비활성화 시 로컬 모드로 자동 전환됩니다. 
          모든 데이터가 현재 브라우저에 안전하게 암호화되어 저장됩니다.
        </p>
      </div>
    </div>
  )
}
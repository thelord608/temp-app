import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-200 via-sky-200 to-violet-200 text-neutral-900 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-neutral-300 shadow-[0_12px_32px_rgba(2,6,23,0.15)] p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">TEXT EXTRACTER</h1>
        <p className="text-center text-neutral-600 mb-6">Sign in to save your extractions</p>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
              Email:
            </label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
              Password:
            </label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <button 
              formAction={login}
              className="flex-1 px-4 py-2 rounded-md bg-gradient-to-r from-sky-800 to-violet-800 text-white hover:from-sky-900 hover:to-violet-900"
            >
              Log in
            </button>
            <button 
              formAction={signup}
              className="flex-1 px-4 py-2 rounded-md border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

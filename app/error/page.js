export default function ErrorPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-200 via-sky-200 to-violet-200 text-neutral-900 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-neutral-300 shadow-[0_12px_32px_rgba(2,6,23,0.15)] p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">Authentication Error</h1>
        <p className="text-neutral-600 mb-6">
          There was an error with your login or signup. Please try again.
        </p>
        <a 
          href="/login" 
          className="px-4 py-2 rounded-md bg-gradient-to-r from-sky-800 to-violet-800 text-white hover:from-sky-900 hover:to-violet-900"
        >
          Back to Login
        </a>
      </div>
    </div>
  )
}

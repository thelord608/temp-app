export default function PrivacyPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-200 via-sky-200 to-violet-200 text-neutral-900">
      <header className="relative overflow-hidden border-b border-neutral-300 bg-gradient-to-r from-sky-200 to-violet-200">
        <div className="pointer-events-none absolute inset-0 opacity-30" style={{backgroundImage:"radial-gradient(circle at 20% 20%, rgba(56,189,248,0.25) 0, transparent 40%), radial-gradient(circle at 80% 0%, rgba(167,139,250,0.25) 0, transparent 35%)"}} />
        <div className="relative mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">TEXT EXTRACTER</h1>
          <a href="/" className="px-4 py-2 rounded-md bg-gradient-to-r from-sky-800 to-violet-800 text-white hover:from-sky-900 hover:to-violet-900">
            Back to App
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-neutral-300 shadow-[0_12px_32px_rgba(2,6,23,0.15)] p-8">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-sm text-neutral-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
              <p className="text-neutral-700 mb-3">
                TEXT EXTRACTER processes images you upload to extract text using optical character recognition (OCR) technology. We collect:
              </p>
              <ul className="list-disc list-inside text-neutral-700 space-y-1 ml-4">
                <li>Images you upload for text extraction</li>
                <li>Extracted text content (if you choose to save it)</li>
                <li>Account information (email address) if you create an account</li>
                <li>Usage data to improve our service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
              <p className="text-neutral-700 mb-3">We use your information to:</p>
              <ul className="list-disc list-inside text-neutral-700 space-y-1 ml-4">
                <li>Process your images and extract text using OCR technology</li>
                <li>Save your extractions to your account (if you choose to do so)</li>
                <li>Provide and maintain our service</li>
                <li>Improve our OCR accuracy and user experience</li>
                <li>Communicate with you about your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Data Storage and Security</h2>
              <p className="text-neutral-700 mb-3">
                Your data is stored securely using Supabase, a trusted cloud platform. We implement appropriate security measures to protect your information:
              </p>
              <ul className="list-disc list-inside text-neutral-700 space-y-1 ml-4">
                <li>All data is encrypted in transit and at rest</li>
                <li>Access to your data is restricted to authorized personnel only</li>
                <li>We use industry-standard security practices</li>
                <li>Images are processed locally in your browser when possible</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Data Retention</h2>
              <p className="text-neutral-700">
                We retain your data only as long as necessary to provide our service. You can delete your account and associated data at any time. Images are processed and not permanently stored unless you explicitly save the extracted text.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Third-Party Services</h2>
              <p className="text-neutral-700">
                We use Supabase for authentication and data storage. Supabase's privacy practices are governed by their own privacy policy. We do not share your personal information with other third parties without your consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
              <p className="text-neutral-700 mb-3">You have the right to:</p>
              <ul className="list-disc list-inside text-neutral-700 space-y-1 ml-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Delete your account and data</li>
                <li>Export your data</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Cookies and Tracking</h2>
              <p className="text-neutral-700">
                We use essential cookies for authentication and session management. We do not use tracking cookies or analytics that identify individual users.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Children's Privacy</h2>
              <p className="text-neutral-700">
                Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Changes to This Policy</h2>
              <p className="text-neutral-700">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Contact Us</h2>
              <p className="text-neutral-700">
                If you have any questions about this privacy policy or our data practices, please contact us through our support channels.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

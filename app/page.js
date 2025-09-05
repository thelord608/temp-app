"use client";

import { useRef, useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import { createClient } from "@/utils/supabase/client";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);

  // Check authentication status
  useEffect(() => {
    const supabase = createClient();
    
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const onFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setErrorMessage("");
    setExtractedText("");
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const runOcr = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setProgress(0);
    setErrorMessage("");
    try {
      const { data } = await Tesseract.recognize(selectedFile, "eng", {
        logger: (m) => {
          if (m?.progress != null) {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });
      setExtractedText(data?.text || "");
    } catch (err) {
      setErrorMessage("Failed to extract text. Please try a clearer image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = async () => {
    if (!extractedText) return;
    try {
      await navigator.clipboard.writeText(extractedText);
    } catch {}
  };

  const downloadText = () => {
    if (!extractedText) return;
    const blob = new Blob([extractedText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "extracted.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setSelectedFile(null);
    setImageUrl("");
    setExtractedText("");
    setProgress(0);
    setErrorMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onPaste = async (event) => {
    const items = event.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      if (item.type?.startsWith("image/")) {
        const blob = item.getAsFile?.();
        if (blob) {
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
          setSelectedFile(blob);
          setExtractedText("");
          setErrorMessage("");
        }
        break;
      }
    }
  };

  const saveToAccount = async () => {
    if (!extractedText || !user) return;
    
    setSaving(true);
    setSaved(false);
    
    try {
      const response = await fetch('/api/extractions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: extractedText,
          imageUrl: imageUrl,
          title: `Extraction ${new Date().toLocaleDateString()}`
        }),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving extraction:', error);
      setErrorMessage('Failed to save to account');
    } finally {
      setSaving(false);
    }
  };

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-200 via-sky-200 to-violet-200 text-neutral-900" onPaste={onPaste}>
      <header className="relative overflow-hidden border-b border-neutral-300 bg-gradient-to-r from-sky-200 to-violet-200">
        <div className="pointer-events-none absolute inset-0 opacity-30" style={{backgroundImage:"radial-gradient(circle at 20% 20%, rgba(56,189,248,0.25) 0, transparent 40%), radial-gradient(circle at 80% 0%, rgba(167,139,250,0.25) 0, transparent 35%)"}} />
        <div className="relative mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
            TEXT EXTRACTER
          </h1>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex gap-2">
              <span className="px-2 py-1 text-xs rounded-full bg-sky-200 text-sky-900 border border-sky-300">AI Powered</span>
              <span className="px-2 py-1 text-xs rounded-full bg-emerald-200 text-emerald-900 border border-emerald-300">Lightning Fast</span>
              <span className="px-2 py-1 text-xs rounded-full bg-fuchsia-200 text-fuchsia-900 border border-fuchsia-300">Multi‑Format</span>
            </div>
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-700">Welcome, {user.email}</span>
                <button
                  onClick={signOut}
                  className="px-3 py-1 text-xs rounded-md border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <a
                href="/login"
                className="px-4 py-2 rounded-md bg-gradient-to-r from-sky-800 to-violet-800 text-white hover:from-sky-900 hover:to-violet-900"
              >
                Sign In
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <p className="text-neutral-600 mb-6">Upload any image with text. We’ll extract it for you. Works best with clear, high-contrast images.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-white/80 backdrop-blur-sm rounded-xl border border-neutral-300 shadow-[0_12px_32px_rgba(2,6,23,0.15)] p-5">
            <h2 className="text-base font-medium mb-3">Upload Image</h2>

            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer?.files?.[0];
                if (file) {
                  const event = { target: { files: [file] } };
                  onFileChange(event);
                }
              }}
              className={`rounded-lg transition-all flex flex-col items-center justify-center text-center p-8 border-2 border-dashed ${isDragging ? "border-blue-400 bg-blue-50" : "border-neutral-300 bg-neutral-50 hover:bg-neutral-100"}`}
            >
              <div className="mb-4">
                <div className="mx-auto h-12 w-12 rounded-full bg-gradient-to-br from-fuchsia-300 to-sky-300 text-sky-800 grid place-items-center animate-pulse">↑</div>
              </div>
              <p className="text-sm font-medium">Drop your image here</p>
              <p className="text-xs text-neutral-500">or use the button below</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-fuchsia-600 to-sky-700 text-white hover:opacity-90 shadow"
                >
                  Select Image
                </button>
                <button
                  onClick={clearAll}
                  className="px-4 py-2 rounded-md border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50"
                >
                  Clear
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="hidden"
              />
            </div>

            {imageUrl ? (
              <div className="mt-5 flex flex-col gap-3">
                <div className="w-full overflow-hidden rounded-md border border-neutral-200 bg-white">
                  <img src={imageUrl} alt="Preview" className="max-h-[360px] w-full object-contain" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={runOcr}
                    disabled={isProcessing}
                    className="px-4 py-2 rounded-md bg-gradient-to-r from-sky-800 to-violet-800 text-white disabled:opacity-50 hover:from-sky-900 hover:to-violet-900"
                  >
                    {isProcessing ? `Processing… ${progress}%` : "Extract Text"}
                  </button>
                  <button
                    onClick={clearAll}
                    disabled={isProcessing}
                    className="px-4 py-2 rounded-md border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 disabled:opacity-50"
                  >
                    Remove Image
                  </button>
                </div>
                {isProcessing ? (
                  <div className="h-2 w-full bg-neutral-100 rounded">
                    <div
                      className="h-2 bg-gradient-to-r from-sky-500 to-violet-600 rounded transition-[width] duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                ) : null}
                {errorMessage ? (
                  <p className="text-sm text-red-600">{errorMessage}</p>
                ) : null}
              </div>
            ) : null}
          </section>

          <section className="bg-white/80 backdrop-blur-sm rounded-xl border border-neutral-300 shadow-[0_12px_32px_rgba(2,6,23,0.15)] p-5 flex flex-col">
            <h2 className="text-base font-medium mb-3">Extracted Text</h2>
            <textarea
              value={extractedText}
              onChange={(e) => setExtractedText(e.target.value)}
              placeholder="Upload an image to extract text"
              className="min-h-[260px] flex-1 w-full rounded-md border border-neutral-300 p-3 text-sm bg-white"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={async () => { await copyToClipboard(); setCopied(true); setTimeout(()=>setCopied(false),1200); }}
                disabled={!extractedText}
                className="px-4 py-2 rounded-md border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 disabled:opacity-50"
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                onClick={downloadText}
                disabled={!extractedText}
                className="px-4 py-2 rounded-md bg-gradient-to-r from-fuchsia-600 to-sky-700 text-white hover:opacity-90 disabled:opacity-50"
              >
                Download .txt
              </button>
              {user && (
                <button
                  onClick={saveToAccount}
                  disabled={!extractedText || saving}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:opacity-90 disabled:opacity-50"
                >
                  {saving ? "Saving..." : saved ? "Saved!" : "Save to Account"}
                </button>
              )}
            </div>
            <p className="mt-2 text-xs text-neutral-500">
              Tip: You can also paste an image from clipboard (Ctrl/Cmd + V) into the page.
              {!user && " Sign in to save your extractions to your account."}
            </p>
          </section>
        </div>
        
        <footer className="mt-12 text-center">
          <a 
            href="/privacy" 
            className="text-sm text-neutral-600 hover:text-neutral-800 underline"
          >
            Privacy Policy
          </a>
        </footer>
      </main>
    </div>
  );
}

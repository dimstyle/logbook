interface LoadingPageProps {
    title?: string;
    subtitle?: string;
}

export default function LoadingPage({
    title = "Loading your page",
    subtitle = "Please wait while we get everything ready for you.",
}: LoadingPageProps) {
    return (
        <div className="min-h-screen bg-[#D9D9D9] px-4 py-10 text-[#505050] flex items-center justify-center">
            <div className="w-full max-w-md rounded-[28px] border border-[#505050]/10 bg-white/80 p-8 shadow-[0_20px_60px_-20px_rgba(80,80,80,0.35)] backdrop-blur-sm">
                <div className="flex items-center justify-center mb-6">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#FF5454]/20 border-t-[#FF5454] animate-spin" />
                </div>

                <div className="space-y-3 text-center">
                    <h2 className="text-2xl font-semibold tracking-wide" style={{ fontFamily: "Fredoka One, cursive" }}>
                        {title}
                    </h2>
                    <p className="text-sm text-[#505050]/80">{subtitle}</p>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5454] animate-bounce [animation-delay:-0.2s]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#1D4ED8] animate-bounce [animation-delay:-0.1s]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#505050] animate-bounce" />
                </div>
            </div>
        </div>
    );
}
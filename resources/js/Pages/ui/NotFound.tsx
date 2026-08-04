export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#D9D9D9] px-4 py-10 text-[#505050] flex items-center justify-center">
            <div className="flex flex-col w-full justify-center items-center gap-5 h-65 max-w-md rounded-[28px] border border-[#505050]/10 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
                <p className="text-md font-semibold uppercase tracking-[0.2em] text-[#FF5454]">
                    Error 404
                </p>
                <h1 className="mb-3 font-freckle text-4xl text-[#560000]">
                    Page Not Found.
                </h1>
            </div>
        </div>
    );
}

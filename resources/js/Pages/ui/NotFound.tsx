
export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#D9D9D9] px-4">
            <div className="flex flex-col items-center w-full max-w-lg rounded-2xl border border-[#b1a9a9] bg-[#f3f0f0] p-8 shadow-lg">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#FF5454]">
                    Error 404
                </p>
                <h1 className="mb-3 font-freckle text-3xl text-[#560000]">
                    Page Not Found
                </h1>
            </div>
        </div>
    );
}

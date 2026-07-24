import { router } from "@inertiajs/react";

export default function Done(){
    return (
     
        <div className="flex min-h-screen items-center justify-center bg-[#D9D9D9] px-4">
            <div className="flex w-full max-w-lg flex-col items-center rounded-2xl border border-[#b1a9a9] bg-[#f3f0f0] p-8 text-center shadow-lg">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#FF5454]">
                    Info
                </p>

                <h1 className="mb-3 font-freckle text-3xl text-[#560000]">
                    Absensi Selesai
                </h1>

                <p className="mb-6 text-base text-[#4b3f3f]">
                    Absensi kamu telah berhasil diselesaikan.
                </p>

                <button
                    onClick={() => router.get("/")}
                    className="rounded-lg bg-[#FF5454] px-4 py-2 text-white transition hover:bg-[#e63f3f]"
                >
                    Go back
                </button>
            </div>
        </div>


    )
}
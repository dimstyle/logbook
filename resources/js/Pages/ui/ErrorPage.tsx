import { router } from "@inertiajs/react";

interface ErrorPageProps {
    errorMessage?: ErrorMessage,
    backPath? : string
};

export interface ErrorMessage{
    message: string,
    status: number
} 

export default function ErrorPage({
    errorMessage = {
        message: "An unexpected error occurred.",
        status: 500     
    },
    backPath = ""
}: ErrorPageProps) {
    return (
        <div className="min-h-screen bg-[#D9D9D9] px-4 py-10 text-[#505050] flex items-center justify-center">
            <div className="flex flex-col items-center justify-center w-full h-65 max-w-md rounded-[28px] border border-[#505050]/10 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#FF5454]">
                    Error {errorMessage.status}
                </p>
                <h1 className="mb-3 font-freckle text-3xl text-[#560000]">
                    Something went wrong
                </h1>
                <p className="mb-6 text-base text-[#4b3f3f]">
                    {errorMessage.message}
                </p>
                {backPath ? <button
                    onClick={() => router.get(backPath)}
                    className="rounded-lg bg-[#FF5454] px-4 py-2 text-white transition hover:bg-[#e63f3f]"
                >
                    Go back
                </button> : undefined}
            </div>
        </div>
    );
}

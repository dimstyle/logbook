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

    console.error(errorMessage);
    
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#D9D9D9] px-4">
            <div className="flex flex-col items-center w-full max-w-lg rounded-2xl border border-[#b1a9a9] bg-[#f3f0f0] p-8 shadow-lg">
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

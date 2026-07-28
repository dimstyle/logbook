import { useState } from "react";
import api from "../../lib/axios.js";
import type { ErrorMessage } from "../ui/ErrorPage.js";
import ErrorPage from "../ui/ErrorPage.js";
import { type DefaultResponse } from "../../types/default.js";

export default function UserExcelRegistration() {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState("");
    const [processing, setProcessing] = useState(false);

    const registerExcelEvent = async () => {
        if (!file) {
            alert("Please select an Excel file.");
            return;
        }

        const formData = new FormData();
        formData.append("register_file", file);

        try {
            setProcessing(true);

            const response = await api.post<DefaultResponse>(
                "/api/auth/register/excel",
                formData,
                {
                    withCredentials: true,
                }
            );

            const resData = response.data;

            const success = response

            alert(resData.message);
            setFile(null);

        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong";

            const status =
                error?.response?.status ||
                500;

            setError(
                JSON.stringify({
                    message,
                    status,
                })
            );
        } finally {
            setProcessing(false);
        }
    };

    if (error) {
        const errorMessage: ErrorMessage = JSON.parse(error);

        return (
            <ErrorPage
                errorMessage={errorMessage}
                backPath="/admin/user_registration"
            />
        );
    }

    return (
        <>
            <div className="flex pt-20 items-center justify-center bg-[#D9D9D9] px-4 py-10">
                <div className="flex w-full max-w-lg flex-col rounded-2xl border border-[#b1a9a9] bg-[#f3f0f0] p-8 text-center shadow-lg">

                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#FF5454]">
                        Register
                    </p>

                    <h1 className="mb-3 font-freckle text-3xl text-[#560000]">
                        Register User
                    </h1>

                    <p className="mb-6 text-base text-[#4b3f3f]">
                        Upload file Excel untuk mendaftarkan user.
                    </p>

                    <div className="flex flex-col gap-5 text-left">

                        <div>
                            <h2 className="mb-2 font-semibold text-[#560000]">
                                Excel File
                            </h2>

                            <input
                                type="file"
                                accept=".xlsx,.xls"
                                onChange={(e) => {
                                    const selectedFile =
                                        e.target.files?.[0] ?? null;

                                    setFile(selectedFile);
                                }}
                                className="w-full cursor-pointer rounded-lg border border-[#b1a9a9] bg-white text-sm text-[#4b3f3f] file:mr-4 file:border-0 file:bg-[#FF5454] file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-[#e63f3f]"
                            />

                            <p className="mt-2 text-xs text-[#6b5f5f]">
                                Format yang didukung: .xlsx atau .xls
                            </p>
                        </div>

                        {file && (
                            <div className="rounded-lg border border-[#b1a9a9] bg-white p-3">
                                <p className="text-sm font-semibold text-[#560000]">
                                    File terpilih
                                </p>

                                <p className="mt-1 truncate text-sm text-[#4b3f3f]">
                                    {file.name}
                                </p>
                            </div>
                        )}

                        <div className="mt-2 flex justify-center">
                            <button
                                type="button"
                                onClick={registerExcelEvent}
                                disabled={processing || !file}
                                className="rounded-lg bg-[#FF5454] px-6 py-2 font-semibold text-white transition hover:bg-[#e63f3f] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing
                                    ? "Loading..."
                                    : "Upload Excel"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

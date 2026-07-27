type RegistrationModeSwitchProps = {
    isExcelMode: boolean;
    setIsExcelMode: (value: boolean) => void;
};

export default function SlideButton({
    isExcelMode,
    setIsExcelMode,
}: RegistrationModeSwitchProps) {
    return (
        <div className="pt-30 pr-5 flex justify-end">
            <div className="relative flex w-64 rounded-full bg-[#d0cccc] p-1 shadow-inner">
                {/* Sliding Background */}
                <div
                    className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-[#FF5454] shadow-md transition-transform duration-300 ease-in-out ${
                        isExcelMode
                            ? "translate-x-full"
                            : "translate-x-0"
                    }`}
                />

                {/* Manual */}
                <button
                    type="button"
                    onClick={() => setIsExcelMode(false)}
                    className={`relative z-10 w-1/2 rounded-full py-2 font-semibold transition-colors duration-300 ${
                        !isExcelMode
                            ? "text-white"
                            : "text-[#560000]"
                    }`}
                >
                    Form
                </button>

                {/* Excel */}
                <button
                    type="button"
                    onClick={() => setIsExcelMode(true)}
                    className={`relative z-10 w-1/2 rounded-full py-2 font-semibold transition-colors duration-300 ${
                        isExcelMode
                            ? "text-white"
                            : "text-[#560000]"
                    }`}
                >
                    Excel
                </button>
            </div>
        </div>
    );
}
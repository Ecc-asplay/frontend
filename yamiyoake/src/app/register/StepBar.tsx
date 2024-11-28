import React from "react";

type StepBarPosition = {
    step: number;
}

const steps = [
    {id:1, label: '登録'},
    {id:2, label: 'メール認証'},
    {id:3, label: '情報を入力'},
    {id:4, label: '完了'},
]

const StepBar: React.FC<StepBarPosition> = ({step}) => {
    return(
        <div className="flex justify-between items-center m-9">
            {steps.map((s) => (
                <div key={s.id} className="flex gap-x-3">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold border-2
                         ${
                        s.id === step
                            ? 'border-basegreen text-basegreen'
                            : s.id < step
                            ? 'border-basegreen bg-basegreen text-white'
                            : 'border-middlebrown text-middlebrown'
                        }`}>
                        {s.id}
                    </div>
                    <span className={`mt-2 text-sm ${
                        s.id <= step ? 'text-basegreen' : 'text-middlebrown'
                    }`}>
                        {s.label}
                    </span>
                </div>
            ))}

        </div>
    )
}
export default StepBar;
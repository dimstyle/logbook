interface colorPallateType{
    backGroundColor : string,
    fontColor: string,
}

interface StatusLabelProps {
    colorPallate : colorPallateType
    statusLabel: string
}

export default function StatusLabel({
    colorPallate,
    statusLabel
}:StatusLabelProps){
    return (
        <span 
            style={{
                backgroundColor : `#${colorPallate.backGroundColor}`,
                color: `#${colorPallate.fontColor}`
            }}
            className='flex justify-center items-center p-1 rounded-lg'>
                {statusLabel}
        </span>
    )
}
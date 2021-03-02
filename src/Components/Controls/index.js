const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]


const Controls = ({ onNumberClick, onUndo, onDelete, onHint }) => {
    const buttons = [
        { label: "Undo", onClick: onUndo },
        { label: "Delete", onClick: onDelete },
        { label: "Hint", onClick: onHint }
    ]
    return (
        <div className="controls">
            <div className="row margin-h">
                {buttons.map((button, index) =>
                    <div
                        key={index}
                        className="cell unselectable button-width100"
                        onClick={button.onClick}
                    >
                        {button.label}
                    </div>
                )}
            </div>
            <div className="row margin-h">
                {NUMBERS.map((val, index) =>
                    <div
                        key={index}
                        className="cell unselectable button-width100"
                        onClick={() => onNumberClick(val)}
                    >
                        {val}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Controls
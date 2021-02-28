const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]


const Controls = ({ onNumberClick, onUndo, onDelete }) => {
    const buttons = [
        { label: "Undo", onClick: onUndo },
        { label: "Delete", onClick: onDelete }
    ]
    return (
        <div className="controls">
            <div className="row">
                {buttons.map((button, index) =>
                    <div
                        key={index}
                        className="cell unselectable"
                        onClick={button.onClick}
                    >
                        {button.label}
                    </div>
                )}
            </div>
            <div className="row">
                {NUMBERS.map((val, index) =>
                    <div
                        key={index}
                        className="cell unselectable"
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
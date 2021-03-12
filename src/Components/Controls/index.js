import { ReactComponent as Undo } from '../../icons/undo.svg'
import { ReactComponent as Delete } from '../../icons/delete.svg'
import { ReactComponent as Hint } from '../../icons/hint.svg'


const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]


const Controls = ({ onNumberClick, onUndo, onDelete, onHint }) => {
    const buttons = [
        { label: "Undo", onClick: onUndo, 
            image: '../../icons/undo.svg', svg: Undo },
        { label: "Delete", onClick: onDelete, 
            image: '../../icons/erase.svg', svg: Delete },
        { label: "Hint", onClick: onHint, 
            image: '../../icons/hint.svg',
            svg: Hint
         }
    ]
    return (
        <div className="controls">
            <div className="row margin-h">
                {buttons.map((button, index) =>
                    <div
                        key={index}
                        className="cell unselectable button-width100 btn"
                        onClick={button.onClick}
                    >
                        {/* {button.label} */}
                        {
                            button.svg 
                            // ? <img src={button.image} />
                            ? <button.svg fill="white" className="img-fit"/>
                            : button.label
                        }
                    </div>
                )}
            </div>
            <div className="row margin-h">
                {NUMBERS.map((val, index) =>
                    <div
                        key={index}
                        className="cell unselectable button-width100 btn"
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
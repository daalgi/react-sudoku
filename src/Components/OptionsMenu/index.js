import Select from 'react-select'
import Switch from 'react-switch'


const difficultyOptions = [
    { value: 80, label: 'Easy' },
    { value: 30, label: 'Medium' },
    { value: 23, label: 'Hard' },
]

const OptionsMenu = ({
    time,
    nonEmptyCells,
    onChangeDifficulty,
    checkMistakes,
    onChangeCheckMistakes
}) =>
    <div className="row">
        <Select
            value={nonEmptyCells}
            onChange={e => onChangeDifficulty(e.value)}
            options={difficultyOptions}
        />
        <Switch
            // offColor="grey"
            onColor="#6E9EA9"
            handleDiameter={24}
            checked={checkMistakes}
            onChange={onChangeCheckMistakes}
        />
        <p>{
            new Date(0, 0, 0, 0, 0, time).toTimeString().split(' ')[0]
                .split(':').slice(1).join(':')}
        </p>
    </div>

export default OptionsMenu
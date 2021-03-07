import Switch from 'react-switch'

import DifficultySelect from './DifficultySelect'


const OptionsMenu = ({
    time,
    nonEmptyCells,
    onChangeDifficulty,
    checkMistakes,
    onChangeCheckMistakes
}) =>
    <div className="row-center">
        <DifficultySelect
            nonEmptyCells={nonEmptyCells}
            onChangeDifficulty={onChangeDifficulty}
        />
        <Switch
            className="react-switch"
            onColor="#2e539e"
            // handleDiameter={18}
            // width={64}
            checked={checkMistakes}
            onChange={onChangeCheckMistakes}
        />
        <p>{new Date(0, 0, 0, 0, 0, time).toTimeString().split(' ')[0]
                .split(':').slice(1).join(':')}</p>
    </div>

export default OptionsMenu
import Select from 'react-select'


const options = [
    { value: 35, label: 'Easy' },
    { value: 30, label: 'Medium' },
    { value: 23, label: 'Hard' },
]

const Header = ({ onNewGame, time, nonEmptyCells, onChangeDifficulty }) =>
    <header className="App-header">
        <p><a
            className="App-link"
            href="https://daalgi.github.io/my-site/#/"
            target="_blank"
            rel="noopener noreferrer"
        >
            David A.G.
        </a></p>
        <Select
            // defaultValue={nonEmptyCells}
            value={nonEmptyCells}
            onChange={e => onChangeDifficulty(e.value)}
            options={options}
        />
        <div className="cell unselectable" onClick={onNewGame}>
            New Game
        </div>
        <p>{
            new Date(0, 0, 0, 0, 0, time).toTimeString().split(' ')[0]
                .split(':').slice(1).join(':')}
        </p>
    </header>

export default Header
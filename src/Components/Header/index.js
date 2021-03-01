const Header = ({ onNewGame, time }) =>
    <header className="App-header">
        <p><a
            className="App-link"
            href="https://daalgi.github.io/my-site/#/"
            target="_blank"
            rel="noopener noreferrer"
        >
            David A.G.
        </a></p>
        <div className="cell unselectable" onClick={onNewGame}>
            New Game
        </div>
        <p>{new Date(0, 0, 0, 0, 0, time).toTimeString().split(' ')[0]}</p>
    </header>

export default Header
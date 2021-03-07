const Header = ({ onNewGame }) =>
    <header className="row-center">
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
    </header>

export default Header
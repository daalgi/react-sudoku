import { ReactComponent as New } from '../../icons/new.svg'


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
        <div
            className="cell unselectable new-game btn"
            onClick={() => onNewGame(null)}>
            <New fill="white" className="img-fit" />
            <p className="align-self">New Sudoku</p>
        </div>
    </header>

export default Header
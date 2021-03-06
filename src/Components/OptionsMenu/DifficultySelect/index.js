import Select from 'react-select'


const difficultyOptions = [
    { value: 45, label: 'Very easy' },
    { value: 38, label: 'Easy' },
    { value: 35, label: 'Medium' },
    { value: 30, label: 'Hardish' },
    { value: 28, label: 'Hard' },
    { value: 25, label: 'Very hard' },
    { value: 23, label: 'Expert' }
]

const customStyles = {
    control: styles => ({ 
        ...styles, 
        backgroundColor: '#282c34',
        minWidth: "140px",
        width: "100%",
        padding: 0,
        margin: 0
    }),
    option: (styles, state) => ({
        ...styles,
        backgroundColor: state.isSelected 
            ? 'hsl(220, 13%, 60%)' 
            : 'hsl(220, 13%, 18%)',
    })    
}

const DifficultySelect = ({ nonEmptyCells, onChangeDifficulty }) =>
    <Select
        label="Difficulty"
        value={difficultyOptions.filter(({ value }) => 
            value === nonEmptyCells )}
        onChange={onChangeDifficulty}
        options={difficultyOptions}
        styles={customStyles}
        autoFocus={true}
        isSearchable={false}
        theme={theme => ({
            ...theme,
            colors: {
                ...theme.colors,
                text: 'white',
                neutral0: '#282c34',
                neutral80: 'white'
            }
        })}
    />

export default DifficultySelect
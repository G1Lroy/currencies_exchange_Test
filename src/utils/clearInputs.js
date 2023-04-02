export const clearInputs = (field, state, setState) => {
    setState({ ...state, [field]: "" })
}
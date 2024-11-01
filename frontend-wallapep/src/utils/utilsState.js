export let modifyStateProperty = (state, setState, key, value) => {
    setState(prevState => ({ ...prevState, [key]: value }));
}

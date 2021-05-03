const initialState = {
    temperature : 0,
    weatherCondition:'',
}

export default Reducer = (state=initialState,action) => {
    switch(action.type){
        case 'setTemperature':
            return {...state,temperature:action.payload}
        case 'setWeatherCondition':
            return {...state,weatherCondition:action.payload}
    }
    return state
}
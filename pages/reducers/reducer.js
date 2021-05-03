const initialState = {
    temperature : 0,
    weatherCondition:'',
}

export default Reducer = (state=initialState,action) => {
    switch(action.type){
        case 'setTemperature':
            return {temperature:action.payload}
        case 'setWeatherCondition':
            return {weatherCondition:action.payload}
    }
    return state
}
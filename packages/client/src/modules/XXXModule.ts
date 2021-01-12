// Template Module
const CHANGE_VALUE_A = 'XXXModule.CHANGE_THEME';

const initialState = { valueA: 123 };

const XXXModule = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_VALUE_A:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const changeValueA = (valueA: number) => ({
    type: CHANGE_VALUE_A,
    payload: { valueA },
});

export default XXXModule;

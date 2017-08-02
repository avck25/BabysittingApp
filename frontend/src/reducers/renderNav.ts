import * as types from '../actions/renderNavTypes';


const initialState = {
    renderNav: true,

}

export default function render(state = initialState, action: any) {
    switch (action.type) {
        case types.RENDER_THE_NAV:
            let render = Object.assign({}, state);
            render.renderNav = action.payload;
            return render;

        default:
            return state;
    }
}
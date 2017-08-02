import * as types from './renderNavTypes';

function render(render: boolean) {
    return {
        type: types.RENDER_THE_NAV,
        payload: render
    }
}

export {
    render
}
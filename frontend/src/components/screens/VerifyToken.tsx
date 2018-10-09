import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
interface VerifyTokenState {
    renderThis: any;
}

interface Params {
    token: string;
}
class VerifyToken extends React.Component<RouteComponentProps<Params>, VerifyTokenState> {

    constructor() {
        super();
        this.state = {
            renderThis: ''
        }

    }


    async componentDidMount() {
        let token = this.props.match.params.token;
        let state = Object.assign(this.state);
        let successful = await axios.get('/auth/owner/compareTempToken/' + token);

        if (successful.data.success) {
            state.renderThis = <Redirect to={'/'} />;

        } else {

            state.renderThis = <Redirect to={'/signUp'} />;
        }

        this.setState(state);

    }

    render() {



        return (
            <div>
                {this.state.renderThis}
            </div>
        );
    }
}

export default VerifyToken;
import * as React from 'react';
import Input from '../common/input/Input';


export default class LogIn extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            person: {
                firstName: '',
                lastName: ''
            },
            errorMap: new Map()
        }
    }


    componentDidMount() {
        let state = Object.assign({}, this.state);
        Object.keys(state.person).forEach((p: any) => {
            state.errorMap.set(p, false);
        });
        this.setState(state);

    }



    render() {

        return (
            <div>
                <form action="">

                </form>
            </div>
        );
    }
}
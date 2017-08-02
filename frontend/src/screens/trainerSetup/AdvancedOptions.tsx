import * as React from 'react';
import Header from '../../common/Header';

export default class AdvancedOptions extends React.Component<any, any>{

    render() {
        return (
            <div className="container">
                <div className='pageTitle'>
                    <Header text='Advanced Options' />
                </div>
            </div>
        )
    }
}
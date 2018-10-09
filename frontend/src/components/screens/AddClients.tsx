import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import Input from '../common/input/Input';
import MyForm from '../common/form/Form';
import { isPristine, isSubmitting, Field, reduxForm } from 'redux-form';

export default class AddClients extends React.Component<any, any> {
    render() {
        return (
            <h1>add Clients</h1>
        )
    }
}
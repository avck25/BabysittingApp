import * as React from 'react';
import * as moment from 'moment';
import Times from '../time/Times';
import TimePicker from 'rc-time-picker';


export default class Hours extends React.Component<any, any> {
    constructor() {
        super()
        this.state = {
            from: '',
            to: '',
            day: ''
        }
    }

    format = 'h:mm a';

    now = moment().hour(9).minute(0);

    onChange = (value: any) => {
        console.log(value && value.format(this.format));
    }

    render() {
        return (
            <div>

                <h4 className="labelTime" >From</h4>
                <TimePicker
                    showSecond={false}
                    defaultValue={this.props.defaultTime}
                    className="timepicker"
                    onChange={this.onChange}
                    format={this.format}
                    use12Hours

                    name='from'
                />

            </div>
        )
    }
}
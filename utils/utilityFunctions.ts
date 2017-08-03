import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';
import * as moment from 'moment'
import { FromTo } from '../types/fromTo';

function sendEmail(emailAddress: string, htmlMessage: string): string {
    let error = 'hello';
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    let mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: emailAddress,
        subject: 'verify account',
        html: htmlMessage
    };

    transporter.sendMail(mailOptions, (err: any, info: any) => {

        if (err) { }

    });
    if (error) {
        return 'error';
    } else {
        return 'sent';
    }

}

function createRandomToken(amountOfBytes: number) {
    return crypto.randomBytes(amountOfBytes).toString('hex');
}

async function comparePassword(password: string, hash: string) {

    let theresult: boolean = await bcrypt.compare(password, hash);
    return theresult;
}

function getHoursAndMinutes(fromTo: FromTo) {

    let result = moment(fromTo.to, "hh:mm:ss").diff(moment(fromTo.from, "hh:mm:ss"), 'minutes')

    fromTo.hours = Math.floor(result / 60);;
    fromTo.minutes = result % 60;
    return fromTo;
}

export { sendEmail, createRandomToken, comparePassword, getHoursAndMinutes }
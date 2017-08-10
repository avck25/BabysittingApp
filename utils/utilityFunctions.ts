import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import * as db from '../repo';
import * as bcrypt from 'bcryptjs';
import * as moment from 'moment';
require('moment-weekday-calc');
import { Client } from '../types/client';
import { FromTo } from '../types/fromTo';
import { ClientHours } from '../types/clienthours';
let twilioClient = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

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

    fromTo.hours = Math.floor(result / 60);
    fromTo.minutes = result % 60;
    return fromTo;
}

async function calculateClients(ownerId: number, from: string, to: string) {
    let daysMap = new Map();
    let clients: Array<Client> = await db.ownerTasks.getCurrentClients(ownerId);
    let ownerMissedDays = await db.calculationTasks.getOwnerMissedDays(ownerId, from, to);
    ownerMissedDays = ownerMissedDays.map((v: any) => v.date);


    clients.forEach(async (client: Client) => {
        let clientMissedDays = await db.calculationTasks.getClientMissedDays(client.id, from, to);
        clientMissedDays = clientMissedDays.map((v: any) => v.date);

        let totalMissedDays: Array<string> = ownerMissedDays.concat(clientMissedDays);

        let clientHours: ClientHours = await db.hourTasks.getHours(client.id);
        let total = {
            hours: 0,
            minutes: 0
        }
        let days = [1, 2, 3, 4]
        if (clientHours.specialDay) {

            let specialDay = days.splice(days.indexOf(moment(clientHours.specialDay.day, 'dddd').day()), 1);

            let specialDays = (<any>moment()).weekdayCalc({
                rangeStart: from,
                rangeEnd: to,
                weekdays: specialDay,
                exclusions: totalMissedDays
            });

            total.hours += clientHours.specialDay.hours * specialDays;
            total.minutes += clientHours.specialDay.minutes * specialDays;

        }

        if (clientHours.friday) {

            let fridays = (<any>moment()).weekdayCalc({
                rangeStart: from,
                rangeEnd: to,
                weekdays: [5],
                exclusions: totalMissedDays
            });

            total.hours += clientHours.friday.hours * fridays;
            total.minutes += clientHours.friday.minutes * fridays;

        }
        if (clientHours.regDay) {
            let regDays = (<any>moment()).weekdayCalc({
                rangeStart: from,
                rangeEnd: to,
                weekdays: days,
                exclusions: totalMissedDays
            });

            total.hours += clientHours.regDay.hours * regDays;
            total.minutes += clientHours.regDay.minutes * regDays;

        }

        let extraMinutes = await db.calculationTasks.getClientextraMinutes(client.id, from, to);
        if (extraMinutes.extraMinutes) {
            total.minutes += extraMinutes.extraMinutes
        }

        total.hours += Math.floor(total.minutes / 60);
        total.minutes = total.minutes % 60;

        let hourlyRate = await db.calculationTasks.getHourlyRate(ownerId);
        hourlyRate = hourlyRate.hourlyRate;

        let balance = total.hours * hourlyRate;

        balance += (hourlyRate / 60) * total.minutes;

        if (client.hasText) {
            twilioClient.messages.create({
                to: client.cellPhoneNumber,
                from: process.env.TWILIO_PHONE_NUMBER,
                body: `Hello ${client.firstName} you owe ${balance} based on hours: ${total.hours} and minutes: ${total.minutes} thank you very much`,
            }, function (err: any, message: any) {
                if (err) throw err;
                console.log(message)
            });
        }


    });


    /*totalDays[d] = (<any>moment()).weekdayCalc('2017-08-07', '2017-08-18', [1, 2, 4]);*/



}

export { sendEmail, createRandomToken, comparePassword, getHoursAndMinutes, calculateClients }
import nodemailer from 'nodemailer';
import {config} from 'dotenv';
import path from 'path';
import handleBars from 'nodemailer-express-handlebars';

export default class NodeMailer {
  private subject = 'Password Recovery';

  constructor(private name: string){
    config();
    name = this.name;
  }

  mailTransporter() {

    return nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST as string,
      port: Number(process.env.NODEMAILER_HOST),
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
      },
      tls: {ciphers: 'SSLv3'}
    }).use('compile', handleBars({
      viewEngine: {
        partialsDir: path.resolve('./views'),
        defaultLayout: false
      },
      viewPath: path.resolve('./views/')
    }));
  }

  async sendEmail(recepientEmail: string, hashCode: string) {
    const mail = {
      from: process.env.NODEMAILER_USER,
      to: recepientEmail,
      subject: this.subject,
      template: 'email',
      context: {
        name: this.name,
        hashCode: hashCode
      }
    };
    await this.mailTransporter().sendMail(mail)
      .then(result => console.log(result));
  }
}
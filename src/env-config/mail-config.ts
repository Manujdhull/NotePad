export const mailConfig = () => {
  const mailConfig = { mailconfig: {} };
  mailConfig.mailconfig['mail'] = {
    host: process.env.MAIL_HOST,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    from: process.env.MAIL_FROM,
    port: Number(process.env.MAIL_PORT),
    logging: console.log,
    name: 'mail',
  } as IMailConfig;
  return mailConfig;
};
export interface IMailConfig {
  host: string;
  user: string;
  password: string;
  from: string;
  port: number;
}

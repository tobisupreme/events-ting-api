import { readFileSync } from 'fs';
import handlebars from 'handlebars';
import { Transporter, createTransport } from 'nodemailer';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface EmailOptions {
    to: string | string[];
    subject: string;
    templateName: string;
    context: Record<string, any>;
    attachments?: Array<{ filename: string; content: any; cid?: string }>;
}

export class EmailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    async sendEmail(options: EmailOptions): Promise<void> {
        try {
            const template = this.getTemplate(options.templateName);
            const html = this.compileTemplate(template, options.context);

            return await this.transporter.sendMail({
                from: process.env.SMTP_FROM_ADDRESS,
                to: Array.isArray(options.to)
                    ? options.to.join(',')
                    : options.to,
                subject: options.subject,
                html,
                ...(options.attachments && {
                    attachments: options.attachments,
                }),
            });
        } catch (error) {
            console.error('Failed to send email:', error);
            throw new Error('Failed to send email');
        }
    }

    private getTemplate(templateName: string): string {
        const templatePath = path.join(
            __dirname,
            'templates',
            `${templateName}.hbs`
        );
        return readFileSync(templatePath, 'utf-8');
    }

    private compileTemplate(
        template: string,
        context: Record<string, any>
    ): string {
        const compiledTemplate = handlebars.compile(template);
        return compiledTemplate(context);
    }
}

import { readFileSync, writeFileSync } from 'fs';
import handlebars from 'handlebars';
import { Transporter, createTransport } from 'nodemailer';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { env } from '../../../config';

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
        this.transporter = createTransport(env.SMTP.transport);
    }

    async sendEmail(options: EmailOptions): Promise<any> {
        try {
            const template = this.getTemplate(options.templateName);
            const html = this.compileTemplate(template, options.context);

            const outputPath = path.join(
                __dirname,
                'output',
                `${options.templateName}-${new Date().getTime()}.html`
            );
            writeFileSync(outputPath, html, 'utf-8');

            return await this.transporter.sendMail({
                from: env.SMTP.from,
                sender: env.SMTP.from.address,
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
            throw error;
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

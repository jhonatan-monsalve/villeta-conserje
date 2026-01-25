import emailjs from '@emailjs/browser';

// Service singleton for cleaner usage
class EmailService {
    private static instance: EmailService;
    private isInitialized = false;

    private constructor() { }

    static getInstance() {
        if (!EmailService.instance) {
            EmailService.instance = new EmailService();
        }
        return EmailService.instance;
    }

    init() {
        if (!this.isInitialized && process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
            emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
            this.isInitialized = true;
        }
    }

    async sendForm(formElement: HTMLFormElement) {
        if (!this.isInitialized) this.init();

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'default_service';
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_id';

        try {
            const result = await emailjs.sendForm(serviceId, templateId, formElement);
            return { success: true, result };
        } catch (error) {
            console.error('EmailJS Error:', error);
            return { success: false, error };
        }
    }
}

export const emailService = EmailService.getInstance();

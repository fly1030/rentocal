import sg from '@sendgrid/mail'
import { ReactElement } from 'react'
import { renderToString } from 'react-dom/server'
const apikey = process.env.SENDGRID_API_KEY ?? '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';
if (apikey != null) {
	sg.setApiKey(apikey)
} else {
	throw new Error('Sendgrid email API key is not set')
}
export type EmailData = string | { name?: string; email: string }

export const email = sg
const DefaultFrom = {
	name: 'Rentocal',
	email: 'team@yesonward.com',
}
export async function sendEmail(
    to: Array<string>, 
    subject: string, 
    html: ReactElement, 
    text: string = '<empty>', 
    from: EmailData = DefaultFrom,
) {
	return await email.send({
		to,
		from,
		subject,
		text,
		html: renderToString(html),
	}).then(() => {
		console.log('Message sent')
	}).catch((error) => {
		console.log(error.response.body)
	})
}
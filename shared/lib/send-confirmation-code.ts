import { sendEmail } from '@/app/action'

export const sendConfirmationCode = async (email: string, code: string) => {
  const html = `
  <p>Confirmation code: <h2>${code}</h2></p>
  <p><a href="${process.env.FRONTEND_URL}?verify&code=${code}&email=${email}">Confirm registration</a></p>
  `

  await sendEmail({
    to: email,
    subject: 'Confirm registration',
    html,
  })
}

import { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from 'lib/email';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { propertyEntries, userEmail } = JSON.parse(req.body);
    const subject = `Your Rentocal Daily Digest`;
    const html = <>
        <h2>Below are reports created over the past 24 hours with CoC over 10%</h2>
        <table>
            <tr>
                <td>Date</td>
                <td>Address</td>
                <td>CoC</td>
                <td>Cash/Month</td>
                <td>Link</td>
            </tr>
            {propertyEntries.map((entry: {[key: string]: any}) => {
                return (
                    <tr>
                        <td>{entry.creationDate}</td>
                        <td>{entry.address}</td>
                        <td>{`${entry.cashOnCash}%`}</td>
                        <td>{`$${entry.monthlyCashFlow}`}</td>
                        <td><a href={entry.link}>link</a></td>
                    </tr>
                );
            })}
        </table>
        <p>
            To see all your reports, visit <a href="https://rentocal.vercel.app/">Rentocal</a>
        </p>
    </>;
    try {
        sendEmail(userEmail, subject, html);
        res.status(200).json({response: 'email sent'});
    } catch (e) {
        res.status(500).json({ statusCode: 500, message: e.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

// snippet-start:[ses.JavaScript.email.sendEmailV3]
import { SendEmailCommand } from '@aws-sdk/client-ses';
import { sesClient } from '../libs/ses-client';
import { FROM_EMAIL, SOURCE_ARN } from './types';
import { httpResponse } from '../libs/returnHelper';

export const createSendEmailCommand = (toAddress: string, fromAddress: string, otp: string) => {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Text: {
          Charset: 'UTF-8',
          Data: `Your OTP is: ${otp}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Your OTP`,
      },
    },
    SourceArn: SOURCE_ARN,
    Source: fromAddress,
  });
};

export const runSendOTPEmail = async (recipient: string, otp: string) => {
  const sendEmailCommand = createSendEmailCommand(recipient, FROM_EMAIL, otp);

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (e) {
    return httpResponse(`Failed to send email. ${e}`, 400);
  }
};

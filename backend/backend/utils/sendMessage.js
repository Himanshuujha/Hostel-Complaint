const twilio = require("twilio");

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER || "+19383881305";

if (!accountSid || !authToken) {
  console.error("Error: Missing Twilio ACCOUNT_SID or AUTH_TOKEN in environment variables.");
  process.exit(1);
}

const client = twilio(accountSid, authToken);

const sendMessage = async (phoneNumber, message) => {
  try {
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    const messageResponse = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: formattedPhoneNumber,
    });
    console.log(`Message sent to ${formattedPhoneNumber}: ${messageResponse.sid}`);
  } catch (error) {
    console.error(`Failed to send message to ${phoneNumber}:`, error.message);
    switch (error.code) {
      case 21608:
        console.error("Unverified number. Please verify the number in Twilio console.");
        break;
      case 21408:
        console.error("Region not enabled for SMS. Please enable the region in Twilio console.");
        break;
      case 21211:
        console.error("Invalid phone number. Please check the format.");
        break;
      case 21265:
        console.error("Cannot send SMS to a short code.");
        break;
      default:
        console.error("An unexpected error occurred.");
    }
  }
};

const formatPhoneNumber = (phoneNumber) => {
  return phoneNumber.startsWith("+") ? phoneNumber : `+91${phoneNumber}`;
};

module.exports = sendMessage;
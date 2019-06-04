import axios from "axios";

interface WebhookOptions {
  message: string;
}

export default async ({ message }: WebhookOptions): Promise<void> => {
  const result = await axios({
    method: "post",
    url: process.env.WEBHOOK_URL || "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      text: message,
    },
  }).catch(e => {
    throw e;
  });
};

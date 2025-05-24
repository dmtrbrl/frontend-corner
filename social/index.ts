import dotenv from "dotenv";
import { getLastPublishedIssue } from "@shared/services";

dotenv.config();

async function sendTelegramMessage(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = "@frontendcorner";

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Telegram API error: ${res.status} - ${errText}`);
  }

  const data = await res.json();
  console.log("Telegram response:", data);
}

const issue = await getLastPublishedIssue();

function getRandomEmoji(emojis: string[]): string {
  const index = Math.floor(Math.random() * emojis.length);
  return emojis[index];
}

const emojis = [
  "🎉",
  "🦄",
  "👻",
  "🥳",
  "👽",
  "🥸",
  "🤖",
  "👾",
  "👀",
  "🙌",
  "🌈",
  "🍾",
  "🎊",
  "🚨",
  "💾",
];

if (issue) {
  const emoji = getRandomEmoji(emojis);
  const message = `${emoji} Issue #${issue.no} is live!\n\n${issue.description}\n\n👉 [Read it here](https://www.frontendcorner.com/issue/${issue.no})`;

  sendTelegramMessage(message);
}

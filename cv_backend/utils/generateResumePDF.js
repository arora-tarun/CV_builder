
import puppeteer from "puppeteer-core";

export const generateResumePDF = async (html) => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium-browser", // 🔥 IMPORTANT
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();
  return pdf;
};

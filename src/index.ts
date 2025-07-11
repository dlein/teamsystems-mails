import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";

const EMAIL_COLUMN_INDEX = 10; // Column J is the 10th column and holds the email addresses
const EMAIL_REGEX = /.+@.+\..+/; // Basic regex to validate email format

const readEmailsFromTeamsystemsXlsx = async (
  filePath: string,
): Promise<string[]> => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.worksheets[0];

  const emails: string[] = [];
  worksheet.eachRow((row) => {
    const cell = row.getCell(EMAIL_COLUMN_INDEX).value as string;
    if (cell) {
      emails.push(
        ...String(cell)
          .split(/\r?\n/) // Split by newlines
          .map((s) => s.split(/\s+/)[0]) // Remove everything after the first whitespace
          .map((s) => s.trim()) // Remove leading and trailing whitespace
          .map((s) => s.toLowerCase()) // Convert to lowercase
          .filter((s) => EMAIL_REGEX.test(s)), // Remove obviously invalid email formats
      );
    }
  });
  // Remove duplicates and sort
  return Array.from(new Set(emails)).sort();
};

const main = async (): Promise<void> => {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Usage: node dist/index.js <path-to-xlsx-file>");
    process.exit(1);
  }
  const filePath = args[0];
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }
  if (!filePath.endsWith(".xlsx")) {
    console.error("Only .xlsx files are supported.");
    process.exit(1);
  }
  const emails = await readEmailsFromTeamsystemsXlsx(filePath);
  if (emails.length === 0) {
    console.log("No emails found in the file.");
    return;
  }
  const outFile = path.join(
    path.dirname(filePath),
    `${path.parse(filePath).name}.emails.txt`,
  );
  fs.writeFileSync(outFile, emails.join("\n"), "utf-8");
  console.log(`Wrote ${String(emails.length)} emails to ${outFile}`);
};

main().catch((err: unknown) => {
  console.error("Error in main:", err);
});

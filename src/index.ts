import fs from "fs";
import path from "path";
import xlsx from "xlsx";

const EMAIL_COLUMN_INDEX = 9; // Column J holds the email addresses
const EMAIL_REGEX = /.+@.+\..+/; // Basic regex to validate email format

const readEmailsFromTeamsystemsExport = (filePath: string): string[] => {
  const emails: string[] = [];
  const wb = xlsx.readFile(filePath);
  const ws = wb.Sheets[wb.SheetNames[0]];
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const rows = xlsx.utils.sheet_to_json(ws, { header: 1 }) as string[][];
  for (const row of rows) {
    const cell = row[EMAIL_COLUMN_INDEX];
    if (cell) {
      emails.push(
        ...String(cell)
          // When there is more that one email address in a cell
          // they are separated by newline and we split them
          .split(/\r?\n/)
          // There is an optional comment after the email address separated
          // by space, so we discard everything after the first whitespace
          .map((s) => s.split(/\s+/)[0])
          // Trim whitespace before and after the email address
          .map((s) => s.trim())
          // Convert to lowercase, to safely remove duplicates later
          .map((s) => s.toLowerCase())
          // Remove what not looks like a valid email addresses
          .filter((s) => EMAIL_REGEX.test(s)),
      );
    }
  }
  // Remove duplicates and sort
  return Array.from(new Set(emails)).sort();
};

const printUsageAndExit = (): never => {
  console.error(`Usage:`);
  if (isBinaryBuild()) {
    if (process.platform === "linux") {
      console.error(`  ./teamsystems-mails-linux <path-to-xlsx-or-xls-file>`);
    } else if (process.platform === "win32") {
      console.error(
        `  .\\teamsystems-mails-win.exe <path-to-xlsx-or-xls-file>`,
      );
    } else if (process.platform === "darwin") {
      console.error(`  ./teamsystems-mails-macos <path-to-xlsx-or-xls-file>`);
    }
  } else {
    console.error(`  yarn dev <path-to-xlsx-or-xls-file>`);
  }
  process.exit(1);
};

const checkFileExists = (filePath: string): void => {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }
};

const checkFileExtension = (filePath: string): void => {
  if (!filePath.endsWith(".xlsx") && !filePath.endsWith(".xls")) {
    console.error("Only .xlsx and .xls files are supported.");
    process.exit(1);
  }
};

const isBinaryBuild = (): boolean => {
  // Hack provided by GPT-4.1 ...
  return typeof (process as unknown as { pkg?: unknown }).pkg !== "undefined";
};

const main = (): void => {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    printUsageAndExit();
  }
  const filePath = args[0];
  checkFileExists(filePath);
  checkFileExtension(filePath);

  const emails = readEmailsFromTeamsystemsExport(filePath);

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

main();

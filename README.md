# teamsystems-mails

Extract email addresses from the Teamsystems Excel export.

## Usage

### Downloading the Excel file

You need sufficient permissions to download the Excel file from Teamsystems!

1. Log in to your Teamsystems instance
2. Navigate to "Allgemein" -> "Personen verwalten"
3. Click the "Export" button
4. Find the file in yours browser's download folder

### Using the binaries

[Download the latest release](https://github.com/dlein/teamsystems-mails/releases/latest) or use the binaries built from the sources.

#### Linux

> **Note:** You may need to make the binary executable first:
>
> ```sh
> chmod +x ./teamsystems-mails-linux
> ```

```
./teamsystems-mails-linux <path-to-xlsx-or-xls-file>
```

#### macOS

> **Note:** You may need to make the binary executable first:
>
> ```sh
> chmod +x ./teamsystems-mails-macos
> ```

```
./teamsystems-mails-macos <path-to-xlsx-or-xls-file>
```

#### Windows

```
.\teamsystems-mails-win.exe <path-to-xlsx-or-xls-file>
```

The output will be a file named `<original-filename>.emails.txt` in the same directory as your input file, containing all extracted email addresses.

## Development

1. **Install dependencies:**

   ```
   yarn
   ```

1. **Build the project:**

   ```
   yarn build
   ```

1. **Run the script:**

   ```
   yarn dev <path-to-xlsx-or-xls-file>
   ```

1. **Lint and format:**

   ```
   yarn lint
   yarn format
   ```

1. **Create binaries:**
   ```
   yarn package
   ```

## Output

- The script will create a file named `<input-filename>.emails.txt` in the same directory as your input file, containing all unique, valid email addresses found in column J.

## Supported file formats

- `.xlsx` (Excel 2007+)
- `.xls` (Excel 97-2003)

## Troubleshooting

- If you see a usage message, make sure you provide a valid path to an `.xlsx` or `.xls` file.
- If no emails are found, check that your Excel file has email addresses in column J.

## License

MIT

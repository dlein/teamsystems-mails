# teamsystems-mails

Extract email addresses from Teamsystems Excel exports.

## Usage

### Using the binaries

After building or downloading the binaries, you can run them directly from your terminal:

#### Linux

```
./bin/teamsystems-mails-linux <path-to-xlsx-or-xls-file>
```

#### macOS

```
./bin/teamsystems-mails-macos <path-to-xlsx-or-xls-file>
```

#### Windows

```
.\bin\teamsystems-mails-win.exe <path-to-xlsx-or-xls-file>
```

The output will be a file named `<original-filename>.emails.txt` in the same directory as your input file, containing all extracted email addresses.

### Using Yarn (for development)

You can use Yarn to run the script in development mode:

```
yarn dev <path-to-xlsx-or-xls-file>
```

## Development

1. **Install dependencies:**

   ```
   yarn install
   ```

2. **Build the project:**

   ```
   yarn build
   ```

   This will compile the TypeScript source files into the `dist/` directory.

3. **Run the script:**

   ```
   yarn dev <path-to-xlsx-or-xls-file>
   ```

   Or use Node.js directly:

   ```
   node dist/index.js <path-to-xlsx-or-xls-file>
   ```

4. **Lint and format:**

   ```
   yarn lint
   yarn format
   ```

5. **Create binaries:**
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

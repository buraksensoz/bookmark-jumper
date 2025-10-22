# bookmark-jumper
Jump instantly between bookmarks in your code — fast, simple, and workspace-based.
=======
# 🏷️ Bookmark Extension for VS Code

A lightweight productivity tool for developers who want to **jump instantly between important lines of code**.  
Easily create, navigate, and manage **up to 9 quick bookmark slots** across your workspace — all with simple keyboard shortcuts.

---

## 🚀 Features

- Save up to **9 bookmarks per workspace** (`Slot 1–9`)
- Jump instantly to any saved bookmark
- QuickPick panel to view, open, or delete bookmarks
- One-click “Clear All” and “Refresh” actions
- Platform-aware keyboard shortcuts (Windows/Linux & macOS)
- Persistent per-workspace storage (each project has its own bookmarks)
- Optional Status Bar shortcut for easy access

---

## 🧠 How It Works

Each slot stores:
- File URI and path  
- Line and column position  
- Language ID and timestamp  

Bookmarks are saved in the **workspace storage**, so every project keeps its own independent set.

---

## 🎹 Default Shortcuts

| Action | Windows / Linux | macOS |
|:-------|:----------------|:------|
| Save to Slot 1–9 | `Shift + Alt + [1–9]` | `Ctrl + Cmd + [1–9]` |
| Go to Slot 1–9 | `Ctrl + Alt + Shift + [1–9]` | `Ctrl + Cmd + Shift + [1–9]` |
| Show All Slots (QuickPick) | `Shift + Alt + 0` | `Ctrl + Cmd + 0` |


> You can customize or override any keybinding in your personal `keybindings.json`.

---

## ⚙️ Configuration Options

Accessible from **Settings → Extensions → Bookmark Extension**:

| Setting | Type | Default | Description |
|:---------|:-----|:---------|:-------------|
| `bookmarkExtension.maxSlots` | number | 9 | Maximum number of bookmark slots to use |
| `bookmarkExtension.copyToClipboard` | boolean | false | Copy the file path and position to clipboard when saving a bookmark |

---

## 💡 Usage

1. Open any file and place the cursor where you want to create a bookmark.  
2. Press a slot shortcut (e.g., `Shift + Alt + 1`).  
3. Use `Shift + Alt + 0` to open the QuickPick list and jump between bookmarks.  
4. Use the trash icons in QuickPick to remove bookmarks or clear them all.

---

## 🧭 Status Bar Shortcut (optional)

A small bookmark icon is added to the VS Code status bar.  
Click it anytime to open the **QuickPick slots panel** instantly.

---

## 🔒 Data Storage

All data is stored **locally in VS Code workspace storage**.  
No telemetry, network access, or external I/O.  
Your bookmarks never leave your machine.

---

## 🧰 Tech Stack

- Node.js + VS Code API  
- JavaScript (ES modules)  
- `workspaceState` for per-project persistence  
- QuickPick UI + StatusBar API

---

## 🧪 Development & Testing

```bash
# install dependencies
npm install

# run in Extension Development Host
F5
```

Press `Ctrl + Shift + P` → **Bookmarks: Show Slots**  
or trigger any shortcut to test interactions.

---

## 🧱 Folder Structure

```
bookmark-extension/
├─ extension.js
├─ package.json
├─ README.md
├─ media/
│  ├─ icon.svg
│  ├─ styles.css
│  └─ panel.js
└─ .vscodeignore
```

---

## 📦 Packaging & Publishing

```bash
npm install -g @vscode/vsce
vsce package     # create .vsix file
vsce publish     # publish to Marketplace
```

> Before publishing, ensure your `publisher` field in `package.json` matches your Marketplace publisher ID.

---

## 🪪 License

MIT License © 2025 Burak Şensöz  
See [LICENSE](LICENSE) for details.

---

## ❤️ Contribute

Contributions, bug reports, and feature ideas are welcome!  
Clone, tweak, and submit a pull request — or just star ⭐ the repo if it helps your workflow.

---

### Made with focus & coffee ☕ by [Burak Şensöz](https://github.com/buraksensoz)
>>>>>>> 9320a3d (Initial commit: BookmarkJumper extension)

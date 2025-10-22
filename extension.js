const vscode = require('vscode');


const SLOT_KEY = (i) => `bookmark.slot.${i}`;

function activate(context) {
    console.log('bookmarkext Activated 🎉');


    for (let i = 1; i <= 9; i++) {
        const cmdId = `bookmark.save.${i}`;
        const disposable = vscode.commands.registerCommand(cmdId, async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showWarningMessage('File not opened.');
                return;
            }

            const doc = editor.document;
            const pos = editor.selection.active;

            const payload = {
                uri: doc.uri.toString(),
                fsPath: doc.uri.scheme === 'file' ? doc.uri.fsPath : null,
                line: pos.line + 1,
                column: pos.character + 1,
                languageId: doc.languageId,
                savedAt: Date.now()
            };

            await context.workspaceState.update(SLOT_KEY(i), payload);

            const rel = vscode.workspace.asRelativePath(doc.uri, false);
            vscode.window.showInformationMessage(
                `Slot ${i} saved: ${rel} @ ${payload.line}:${payload.column}`
            );
        });
        context.subscriptions.push(disposable);
    }

    for (let i = 1; i <= 9; i++) {
        const cmdId = `bookmark.goto.${i}`;
        const disposable = vscode.commands.registerCommand(cmdId, async () => {
            const data = context.workspaceState.get(SLOT_KEY(i), null);
            if (!data || !data.uri) {
                vscode.window.showWarningMessage(`Slot ${i} is empty.`);
                return;
            }
            await openAt(data.uri, data.line, data.column);
        });
        context.subscriptions.push(disposable);
    }


    const showSlotsCmd = vscode.commands.registerCommand('bookmark.showSlots', async () => {
        const items = [];
        for (let i = 1; i <= 9; i++) {
            const data = context.workspaceState.get(SLOT_KEY(i), null);
            if (data && data.uri) {
                const rel = tryRelPath(data.uri);
                items.push({
                    label: `$(bookmark) Slot ${i}`,
                    description: `${rel} @ ${data.line}:${data.column}`,
                    detail: data.fsPath || data.uri,
                    slot: i,
                    data,
                    type: 'slot'
                });
            } else {
                items.push({
                    label: `$(circle-slash) Slot ${i} (empty)`,
                    description: '',
                    detail: '—',
                    slot: i,
                    data: null,
                    type: 'slot'
                });
            }
        }
        items.push({
            label: '$(trash) Clear All Slots',
            description: '',
            detail: 'Delete all saved slots',
            type: 'deleteAll',
            data: 'delete all Slots'
        });

        const pick = await vscode.window.showQuickPick(items, {
            placeHolder: 'Select Slot to Open',
            matchOnDetail: true
        });
        if (!pick || !pick.data) return;
        if (pick.type === 'slot') {
            await openAt(pick.data.uri, pick.data.line, pick.data.column);
        } else if (pick.type === 'deleteAll') {
            const ok = await vscode.window.showWarningMessage(
                'delete all slots?',
                { modal: true },
                'Yes'
            );
            if (ok !== 'Yes') return;
            const ops = [];
            for (let i = 1; i <= 9; i++) ops.push(context.workspaceState.update(SLOT_KEY(i), null));
            await Promise.all(ops);
            vscode.window.showInformationMessage('All slots cleared.');
        }
    });
    context.subscriptions.push(showSlotsCmd);


    const clearSlotCmd = vscode.commands.registerCommand('bookmark.clearSlot', async () => {
        const num = await vscode.window.showInputBox({
            prompt: 'Select Number to delete Slot (1-9)',
            validateInput: (v) => (/^[1-9]$/.test(v) ? null : 'Enter a number between 1-9')
        });
        if (!num) return;
        await context.workspaceState.update(SLOT_KEY(Number(num)), null);
        vscode.window.showInformationMessage(`Slot ${num} cleared.`);
    });
    context.subscriptions.push(clearSlotCmd);

}



function deactivate() {
    console.log('extension deactivated');
}


async function openAt(uriStr, line = 1, column = 1) {
    try {
        const uri = vscode.Uri.parse(uriStr);
        const doc = await vscode.workspace.openTextDocument(uri);
        const editor = await vscode.window.showTextDocument(doc, { preview: false });

        const pos = new vscode.Position(Math.max(0, line - 1), Math.max(0, column - 1));
        editor.selection = new vscode.Selection(pos, pos);
        editor.revealRange(new vscode.Range(pos, pos), vscode.TextEditorRevealType.InCenter);
    } catch (e) {
        vscode.window.showErrorMessage('File not Open: ' + e.message);
    }
}

function tryRelPath(uriStr) {
    try {
        const uri = vscode.Uri.parse(uriStr);
        return vscode.workspace.asRelativePath(uri, false);
    } catch {
        return uriStr;
    }
}

module.exports = {
    activate,
    deactivate
};

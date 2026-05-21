import * as vscode from 'vscode';

async function listSkills(): Promise<string[] | undefined> {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    vscode.window.showErrorMessage('Open a workspace containing a skills/ folder.');
    return;
  }
  const root = workspaceFolders[0].uri;
  const skillsUri = vscode.Uri.joinPath(root, 'skills');
  try {
    const entries = await vscode.workspace.fs.readDirectory(skillsUri);
    const dirs = entries.filter(([, type]) => type === vscode.FileType.Directory).map(([name]) => name);
    return dirs;
  } catch (e) {
    vscode.window.showErrorMessage('Could not read skills/ folder in workspace.');
    return;
  }
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('mcpSkills.list', async () => {
      const skills = await listSkills();
      if (!skills || skills.length === 0) {
        vscode.window.showInformationMessage('No skills found in skills/');
        return;
      }
      const pick = await vscode.window.showQuickPick(skills, { placeHolder: 'Select a skill' });
      if (pick) {
        vscode.window.showInformationMessage(`Selected skill: ${pick}`);
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('mcpSkills.install', async () => {
      const skills = await listSkills();
      if (!skills || skills.length === 0) {
        vscode.window.showInformationMessage('No skills found in skills/');
        return;
      }
      const pick = await vscode.window.showQuickPick(skills, { placeHolder: 'Select a skill to install' });
      if (!pick) return;

      const choice = await vscode.window.showQuickPick(['Docker (no install)', 'Local (requires skr)'], { placeHolder: 'Install method' });
      if (!choice) return;

      const terminal = vscode.window.createTerminal('MCP Skills');
      terminal.show();
      if (choice.startsWith('Docker')) {
        terminal.sendText(`docker run --rm -v \"${vscode.workspace.rootPath}\":/workspace -w /workspace ghcr.io/yogananda1504/skr:latest skr install ghcr.io/yogananda1504/mcp-skills-plugin.${pick}:latest`);
      } else {
        terminal.sendText(`skr install ghcr.io/yogananda1504/mcp-skills-plugin.${pick}:latest`);
      }
    })
  );
}

export function deactivate() {}

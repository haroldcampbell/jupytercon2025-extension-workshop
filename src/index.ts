import {
	JupyterFrontEnd,
	JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { ICommandPalette } from '@jupyterlab/apputils';
import { ILauncher } from '@jupyterlab/launcher';

import { requestAPI } from './request';
import { ImageCaptionMainAreaWidget } from './widgets';

/**
 * Initialization data for the jupytercon2025-extension-workshop extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
	id: 'jupytercon2025-extension-workshop:plugin',
	description: 'HMC: A JupyterLab extension: random image generator',
	autoStart: true,
	requires: [ICommandPalette, ILauncher], // dependencies of our extension

	activate: (
		app: JupyterFrontEnd,
		// The activation method receives dependencies in the order they are specified in
		// the "requires" parameter above:
		palette: ICommandPalette,
		launcher: ILauncher
	) => {
		console.log('HMC Extension is activated!');

		requestAPI<any>('hello')
			.then(data => {
				// console.log(data);
				console.log('HELLO API: HMC Extension is activated!');
			})
			.catch(reason => {
				console.error(
					`The jupytercon2025_extension_workshop server extension appears to be missing.\n${reason}`
				);
			});

		//Register a new command:
		const command_id = 'image-caption:open';
		app.commands.addCommand(command_id, {
			label: 'View a random image & caption',
			execute: () => {
				// When the command is executed, create a new instance of our widget
				const widget = new ImageCaptionMainAreaWidget();

				// Then add it to the main area:
				app.shell.add(widget, 'main');
				return widget;
			}
		});

		palette.addItem({ command: command_id, category: 'Tutorial' });
		launcher.add({ command: command_id });
	}
};

export default plugin;

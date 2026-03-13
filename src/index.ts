import {
	JupyterFrontEnd,
	JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { requestAPI } from './request';

/**
 * Initialization data for the jupytercon2025-extension-workshop extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
	id: 'jupytercon2025-extension-workshop:plugin',
	description: 'HMC: A JupyterLab extension: random image generator',
	autoStart: true,
	activate: (app: JupyterFrontEnd) => {
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
	}
};

export default plugin;

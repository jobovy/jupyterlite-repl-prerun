import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the jupyterlite-repl-prerun extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlite-repl-prerun:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlite-repl-prerun is activated!');
  }
};

export default plugin;

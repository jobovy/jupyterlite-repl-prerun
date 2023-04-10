import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IConsoleTracker } from '@jupyterlab/console';

/**
 * Initialization data for the jupyterlite-repl-prerun extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlite-repl-prerun:plugin',
  autoStart: true,
  optional: [IConsoleTracker],
  activate: (app: JupyterFrontEnd, tracker: IConsoleTracker | null) => {
    if (!tracker) {
      return;
    }
    const search = window.location.search;
    const urlParams = new URLSearchParams(search);
    const prerun = urlParams.getAll('prerun');
    const prerunCode = urlParams.getAll('prerun-code');

    tracker.widgetAdded.connect(async (_, widget) => {
      const { console } = widget;

      if (prerun[0]) {
        await console.sessionContext.ready;
        prerun.forEach(line =>
          console.sessionContext.session?.kernel?.requestExecute({
            code: line,
            silent: true,
            store_history: false
          })
        );
      }

      if (prerunCode) {
        await console.sessionContext.ready;
        prerunCode.forEach(line => console.inject(line));
      }
    });
  }
};

export default plugin;

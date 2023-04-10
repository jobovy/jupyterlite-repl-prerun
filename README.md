# jupyterlite-repl-prerun

[![Github Actions Status](https://github.com/jobovy/jupyterlite-repl-prerun/workflows/Build/badge.svg)](https://github.com/jobovy/jupyterlite-repl-prerun/actions/workflows/build.yml)
[![JupyterLite](https://jupyterlite.rtfd.io/en/latest/_static/badge-launch.svg)](https://jupyterlite-repl-prerun.rtfd.io/en/latest/lite/repl/index.html?kernel=python&prerun=import%20numpy%20as%20np&prerun-code=print(np.pi))

Jupyterlite extension to allow code to be pre-run in the repl app

## Requirements

- JupyterLab >= 3.0

## Install

To install the extension, execute:

```bash
pip install jupyterlite_repl_prerun
```

## Usage

JupyterLite allows you to [embed a live REPL](https://jupyterlite.readthedocs.io/en/latest/quickstart/embed-repl.html) in a webpage. This extension allows you to specify code that should be pre-run in the REPL using the `prerun` URL parameter. For example, when using the `pyodide` kernel, you can use this extension to install a package not included by default in `pyodide` or to set configuration variables.

Example:

```html
<iframe
  src="https://jupyterlite-repl-prerun.rtfd.io/en/latest/lite/repl/index.html?kernel=python&prerun=import%20numpy%20as%20np&prerun-code=print(np.pi)"
  width="100%"
  height="100%"
></iframe>
```

To launch this example, click the JupyterLite badge at the top of this page.

Note that if you also want to include code to be displayed and run in the REPL, you can use the `prerun-code` URL parameter. For example, the URL above will pre-run the code to import `numpy` and then display and run the code to print `pi`. `prerun-code` replaces the usual JupyterLite `code` parameter, which cannot be combined with `prerun`.

To encode a, potentially multi-line, string in a URL, you can use an online
[URL encoder](https://www.urlencoder.org/). Or you can use the `urllib.parse.quote` function in Python. For example, assuming that the code you want to pre-run is in a file `prerun.py`, you can use the following command to encode the contents of the file:

```bash
CODE_FROM_PRERUN_DOT_PY=$(python -c "import urllib.parse; f= open('prerun.py','r'); out= [urllib.parse.quote(line,safe='')+'%0A' for line in f.readlines() if line[0] != '#']; f.close(); print(''.join(out))")
```

## Use in your own JupyterLite deployment

You can add this extension to your own JupyterLite deployment by installing
the extension into the environment you are using to build the JupyterLite
deployment. Look at the [JupyterLite documentation on adding extensions](https://jupyterlite.readthedocs.io/en/latest/howto/configure/simple_extensions.html).

## Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyterlite_repl_prerun
```

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlite_repl_prerun directory
# Install package in development mode
pip install -e "."
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall jupyterlite_repl_prerun
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `jupyterlite-repl-prerun` within that folder.

### Packaging the extension

See [RELEASE](RELEASE.md)

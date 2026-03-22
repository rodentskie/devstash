# Devstash

A developer knowledge hub for snippets, commands, prompts, notes, files, images, links and custom types.

## Run tasks

To run the dev server for your app, use:

```sh
TASK=dev APP=app pnpm run nx-run
```

To create a production bundle:

```sh
TASK=build APP=app pnpm run nx-run
```

To see all available targets to run for a project, run:

```sh
APP=app pnpm run nx-show
```

## Add new projects

To generate a new application, use:

```sh
APP=app pnpm run nx-next:app-generate
```

To generate a new library, use:

```sh
APP=types pnpm run nx-react:lib-generate
```

Append `--dry-run` argument to run it on `dryRun` and will only show the results and won't create the files.
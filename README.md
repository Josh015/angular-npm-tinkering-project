# Angular NPM Tinkering Project

This test project is a heavily-modified version of the code from the Pluralsight course [Styling Applications with Angular Material](https://www.pluralsight.com/courses/angular-material). My goal is to have a reasonably complex Angular codebase which integrates a set of NPM packages that I consider to be essential for modern web applications

## Running the Application

```shell
pnpm install
pnpm start
```

## Packages

- [Angular](https://angular.dev/)
- [Angular Material](https://material.angular.io/)
- [ESLint](https://eslint.org/)
- [Jest](https://jestjs.io/)
- [Lodash](https://lodash.com/)
- [messageformat](https://messageformat.github.io/messageformat/)
- [ng-mocks](https://ng-mocks.sudo.eu/)
- [pNpM](https://pnpm.io/)
- [Prettier](https://prettier.io/)
- [Spectator](https://ngneat.github.io/spectator/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Transloco](https://jsverse.github.io/transloco/)

## Screenshot

![Angular NPM Tinkering Project Preview](screenshots/preview.png)

## Known Issues

- Node 20 LTS is the maximum supported version since later versions have a bug that break tailwindcss configs that use Typescript.

# AngularHttpclientExample

Based on Articles:
[1. Angular 9/10 Tutorial By Example: REST CRUD APIs & HTTP GET Requests with HttpClient](https://www.techiediaries.com/angular/angular-9-8-tutorial-by-example-rest-crud-apis-http-get-requests-with-httpclient/)

[Angular 9/8 Material Data-Table Tutorial & Example](https://www.techiediaries.com/angular-material-table/)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Project Notes

Install Prettier
npm i -D prettier

ng generate component home

ng generate component about

ng add @angular/material

ng generate service data

ng generate interface product

ng generate component dataTable

ng generate interface policy

ng generate component account

### Faker

Use Faker.js to generate fake products to return via fake API server
[Faker](https://github.com/marak/Faker.js/#api-methods)

NOTE: Removal of functional code in faker.js

[GitHub Guidance](https://github.com/advisories/GHSA-5w9c-rv96-fr7g)

[Faker Replacement package and installation instructions](https://github.com/faker-js/faker)

Please replace your faker dependency with @faker-js/faker. This is the official, stable fork of Faker.

> npm uninstall faker
> npm install @faker-js/faker

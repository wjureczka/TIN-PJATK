# TIN-PJATK - WORK IN PROGRESS
TIN-PJATK is a final exam study project. It consists of 2 subprojects: frontend and backend. The main purpose is to create somekind of a web system.

## Prerequisites
- npm >=6.x.x
- node lts >=12.x.x
- docker for dockerized db and db's ui

## Installation
```bash
npm i
```

```bash
npx lerna bootstrap
```

## How to run in development mode
### Normal mode:
```bash
npm run TIN:start
```
### Docker mode:
```bash
npm run TIN:start-docker
```

## How to build
```bash
npm run TIN:build
```

## Designs and prototypes
Here you can find designs and prototypes used to develop TIN: https://www.figma.com/file/QfLBREydpFz2jj4pFm3yax/TIN

Helpful library for Material Design: https://material.angular.io/

## Using docker
If you have problem running docker check: https://github.com/docker/compose/issues/6677#issuecomment-544204451

## Styleguides used in project
Node: https://github.com/goldbergyoni/nodebestpractices
Angular: https://angular.io/guide/styleguide

# CMS-PJATK
CMS-PJATK is a final exam study project. It consists of 2 subprojects: frontend and backend. The main purpose is to recreate Content Management System from the very bottom.

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
npm run cms:start
```
### Docker mode:
```bash
npm run cms:start-docker
```

## How to build
```bash
npm run cms:build
```
 
## Designs and prototypes
Here you can find designs and prototypes used to develop CMS: https://www.figma.com/file/YcCKRfK9SY10Vri9K01wNU/CMS-Design?node-id=2%3A0

Helpful library for Material Design: https://material.angular.io/

## Using docker
If you have problem running docker check: https://github.com/docker/compose/issues/6677#issuecomment-544204451

## Styleguides used in project
Node: https://github.com/goldbergyoni/nodebestpractices
Angular: https://angular.io/guide/styleguide

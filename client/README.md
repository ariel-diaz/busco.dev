# The Project

## [👉 Read CONTRIBUTING.md before doing anything](CONTRIBUTING.md)

## 👈 Check out the Project Wiki as well

## Technology and Folder Structure

This project is written using [Next.js](https://nextjs.org/), ES7,
[React](https://reactjs.org/), [Jest](https://jestjs.io/]) and
[Cypress](https://www.cypress.io/). Files are structured as follows:

* **/pages**: The pages for the project. Use one per url to keep the code tidy.
* **/components**: The components. You should organize them by logical groups
and the folder structure just one level deep.
* **/contexts**: For React Context files. We usually prefer the Context API
instead of Redux or some more convoluted solutions.
* **/public**: All public files, like `favicon.ico` or `robots.txt`. Static
files (images, videos) go into the `/public/static` folder.
* **/cypress**: Cypress E2E tests.
* **/.gitlab**: The CI configuration files. They start at `.gitlab-ci.yml` and
you should check out the [documentation](https://docs.gitlab.com/ee/ci/yaml/).
* **/Dockerfile**: The Dockerfile for CI. You probably won't need to touch it.

## Getting Started

* Just run `npm ci` to get started. It's faster than `npm i`.

* You can find all necessary `.env` files in the Wiki.

## Linter

There's a precommit hook to run Prettier automatically on all staged files.
In case you need more commands, you can run:

* `npm run lint`: Runs the linter project-wide.
* `npm run lint:fix`: Fixes ESLint issues.
* `npm run lint:markdown`: Lints markdown files.

## Testing

Tests are created together with the component name, using the same name and the
suffix `.test.js`. We use **[Jest](https://jestjs.io/)** as a test framework.
Read the [CONTRIBUTING.md](CONTRIBUTING.md) document for more info.

In React code you should add a `data-test-id` in all critical UI components to make
the tests easier to understand.

## Continuous Integration

We use [Dokku](http://dokku.viewdocs.io/dokku/) to automate our internal
deployments, and you'll get an automatic server for every branch in the
project.

* You need to add the `DOKKU_KEY` var in the Gitlab project to be able to
deploy the project automatically for each branch. Ask around for Aerolab's
Dokku Key SSH Key.

* You need to set the `REVIEW_APPS_SUBDOMAIN_PREFIX: 'PROJECT_NAME'` in
[.gitlab/ci/deploy/dokku.yml](.gitlab/ci/deploy/dokku.yml) to the full name of
the project.

* You can also set docker build args and environment variables in
[.gitlab/ci/deploy/dokku.yml](.gitlab/ci/deploy/dokku.yml).

* You can configure the quality gates for Lighthouse and other steps in the
variables section of [.gitlab-ci.yml](.gitlab-ci.yml).

## Typical Problems

Make sure you use
[Next's Link Component](https://nextjs.org/learn/basics/navigate-between-pages)
for internal navigation. Using regular links will completely mess up the
performance of the site.

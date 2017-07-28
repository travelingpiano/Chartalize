# Chartalize

[Chartalize](http://chartalize.com) is a web application for users to build charts and perform simple data analysis using uploaded data tables. Inspired by Chartio, Chartalize allows users to upload data sources, generate charts and share generated charts with fellow users.

Chartalize is a personal project by Li Hsuan Lu.

## Features

- Hosting on Heroku
- New account creation and login
- Guest/demo account
- Upload data and visualize it with a variety of charts
- Logged in users can persist their data
- Supports JSON, TSV and CSV formats
- Users can share generated charts with other users

## Design Features

## Project Design

Chartalize was designed and built in two weeks.

A [proposal](./docs/README.md) was drafted to help provide an implementation timelines during the development process.

A [database schema](./docs/schema.md) was prepared alongside the design proposal.

## Technology

Chartalize is a single-page application built with a frontend framework of React/Redux and a backend support of Ruby on Rails.

I also used the following components and packages in the project:

- [React DnD](https://github.com/react-dnd/react-dnd)
- [Recharts.js](http://recharts.org/#/en-US/)
- [React Dropzone](https://react-dropzone.netlify.com/)
- [AnimateCSS](https://daneden.github.io/animate.css/)
- [Lodash](https://lodash.com/)

## Future Implementations

Currently, Chartalize supports data upload three different file types (CSV, TSV, JSON), charting using a single x-axis and y-axis, four sorting methods (x-axis and y-axis, ascending and descending), and chart sharing by username.

The features that will be added later can be found in this [future](./docs/future.md) readme.

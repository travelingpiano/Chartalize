# Chartalize

## Links

### General
* [Heroku][heroku]
* [Trello][trello]

[heroku]: https://www.heroku.com/
[trello]: https://trello.com/b/rcGtdv2g/a-a-full-stack-project

### Documentation
* [View Wireframes][wireframes]
* [React Components][components]
* [API Endpoints][api-endpoints]
* [Schema][schema]
* [Sample State][sample-state]

[wireframes]: wireframes
[components]: component-hierarchy.md
[api-endpoints]: api-endpoints.md
[sample-state]: sample-state.md
[schema]: schema.md

## Minimum Viable Product

Chartelize is a web application inspired by [Chartio](https://www.chartio.com) built using Ruby on Rails backend and React/Redux frontend.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria with smooth, bug-free navigation, adequate seed data and
sufficient CSS styling:
- [x] Hosting on heroku
- [x] New account creation and login
- [x] Guest/demo account
- [ ] Upload data and visualize it with a variety of charts
- [ ] Logged in users can persist their data
- [ ] Share charts with other users
- [ ] Supports JSON, TSV, and CSV formats
- [ ] [Production README](docs/production_readme.md)

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (2 days)

**Objective:** Working authentication for both front and backend. Users created are persisted in database.

- [x] Functional
  - [x] Sign up
  - [x] Sign In
  - [x] Demo
- [x] Webpage
  - [x] Log In/Sign Up page
  - [x] Intro page
  - [x] Landing page

### Phase 2: Import New Data (1 day)

**Objective:** Data can be uploaded for users and data will be persisted in database.

- [x] Functional
  - [x] Store data with user in database
  - [x] Support JSON, TSV, CSV
  - [ ] Data stored can be queried
- [ ] Webpage
  - [ ] New data table form page
  - [x] Data index page
  - [ ] Data show page

### Phase 3: Create Chart (3 days)

**Objective:** Charts can be created, shown and deleted from imported data tables by users.

- [ ] Functional
  - [ ] Queries done to selected to data table
  - [ ] Charts using [Victory.js](http://formidable.com/open-source/victory/)
  - [ ] Enable bar, line, bar-line, scatter and pie charts
  - [ ] Created charts can be deleted
- [ ] Webpage
  - [ ] New chart form page
  - [ ] Chart show page

### Phase 4: Chart Sharing (2 days)

**Objective:** Charts can be shared with other users in database and users can view all charts shared with them.

- [ ] Functional
  - [ ] Allow shared users to see charts
  - [ ] See charts shared with current user
  - [ ] Able to search for users to share chart
- [ ] Visual
  - [ ] New share chart form page
  - [ ] Shared charts index page

### Phase 5: Additional Styling (1 days)

**Objective:** Clean up on styling to make interface presentable and professional

- [ ] Clean charts and data tables
- [ ] Clear form for creating new chart


### User Experience Testing

**Objective:** To get third party opinions on webpage display

- [ ] Ask 5-10 friends to review webpage at various points of development

### Bonus Features (TBD)
- [ ] Functional
  - [ ] Allow users to add background image to charts
  - [ ] Allow users to edit charts
  - [ ] Allow users to edit data
  - [ ] Allowing users to create dashboards and populate them with charts
  - [ ] Schema and relational databases
- [ ] Webpage
  - [ ] Chart and data edit pages
  - [ ] Dashboard show, create, edit, delete pages
  - [ ] Splash page on first login with basic information on how to navigate Chartalize
  - [ ] Tutorial video on how to navigate Chartalize
  - [ ] Able to display charts in list view and chart view

# Chartalize

## Links

### General
* [Heroku][heroku]
* [Trello][trello]

[heroku]: https://chartalize.herokuapp.com
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
- [x] Upload data and visualize it with a variety of charts
- [x] Logged in users can persist their data
- [x] Share charts with other users
- [x] Supports JSON, TSV, and CSV formats
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
  - [x] Data stored can be queried
- [x] Webpage
  - [x] New data table form page
  - [x] Data index page
  - [x] Data show page

### Phase 3: Create Chart (3 days)

**Objective:** Charts can be created, shown and deleted from imported data tables by users.

- [x] Functional
  - [x] Selected chart data from previously uploaded data tables
  - [x] Charts using [rechart](http://recharts.org/#/en-US/)
  - [x] Enable bar, line, area, scatter and pie charts
  - [x] Created charts can be deleted
- [x] Webpage
  - [x] New chart form page
  - [x] Chart show page

### Phase 4: Chart Sharing (2 days)

**Objective:** Charts can be shared with other users in database and users can view all charts shared with them.

- [x] Functional
  - [x] Allow shared users to see charts
  - [x] See charts shared with current user
  - [x] Able to search for users to share chart
- [x] Visual
  - [x] New share chart form page
  - [x] Shared charts index page

### Phase 5: Additional Styling (1 days)

**Objective:** Clean up on styling to make interface presentable and professional

- [x] Clean charts and data tables
- [x] Clear form for creating new chart


### User Experience Testing

**Objective:** To get third party opinions on webpage display

- [x] Ask 5-10 friends to review webpage at various points of development

### Bonus Features (TBD)
- [ ] Functional
  - [x] Allow charts to be shared by x and y axes, ascending and descending
  - [ ] Allow users to add background image to charts
  - [ ] Allow users to edit charts
  - [ ] Allow users to edit data
  - [ ] Allowing users to create dashboards and populate them with charts
  - [ ] Schema and relational databases
- [ ] Webpage
  - [x] Help page with information on site
  - [x] Modal for login and signup forms
  - [x] Custom dropdown for username and logout button
  - [x] Site also hosted on separate domain [here](http://chartalize.com)
  - [ ] Chart and data edit pages
  - [ ] Dashboard show, create, edit, delete pages
  - [ ] Splash page on first login with basic information on how to navigate Chartalize
  - [ ] Tutorial video on how to navigate Chartalize
  - [ ] Able to display charts in list view and chart view

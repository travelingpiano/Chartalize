# Component Hierarchy

## Components

**SessionFormContainer**
- SessionForm
- mapStateToProps: loggedIn, errors
- mapDispatchToProps: login, signup

**NavBarContainer**
- NavBar
- mapStateToProps: currentUser
- mapDispatchToProps: logout

**ChartNewContainer**
- ChartNew
  - NavBarContainer
  - DataSelection
    - Selections
    - Axis
  - ChartGenerator
- mapStateToProps: dataTables, chartTable, errors
- mapDispatchToProps: fetchAllDataTables, fetchChartTable, makeChart

**ChartsIndexContainer**
- ChartIndex
  - NavBarContainer
  - SideBar
  - ChartIndexItem
- mapStateToProps: charts
- mapDispatchToProps: fetchAllCharts, deleteChart

**ChartShowContainer**
- ChartShow
  - NavBarContainer
  - SideBar
- mapStateToProps: chart
- mapDispatchToProps: fetchOneChart

**DataTableIndexContainer**
- DataTableIndex
  - NavBarContainer
  - SideBar
  - DataIndexItem
- mapStateToProps: dataTables
- mapDispatchToProps: deleteDataTable, fetchAllDataTables

**UploadFormContainer**
- UploadForm
  - NavBarContainer
  - SideBar
- mapStateToProps: state, errors
- mapDispatchToProps: makeDataTable

**SharedChartsContainer**
- SharedCharts
  - NavBarContainer
  - SideBar
- mapStateToProps: charts
- mapDispatchToProps: fetchSharedCharts

**ShareChartContainer**
- ShareChart
  - NavBarContainer
  - SideBar
- mapStateToProps: users, chart
- mapDispatchToProps: fetchOneChart, fetchAllUsers, editChart

**SharedChartShowContainer**
- SharedChartShow
  - NavBarContainer
  - SideBar
- mapStateToProps: chart
- mapDispatchToProps: fetchSharedChart

**SideBar**

**Homepage**
- SessionFormContainer
- NavBarContainer

**HelpPage**

## Routes

Path                      | Component
--------------------------|----------
/                         | Homepage
/help                     | HelpPage
/charts                   | ChartsIndexContainer
/charts/:chartId          | ChartShowContainer
/charts/new               | ChartNewContainer
/charts/shared            | SharedChartsContainer
/charts/shared/:chartId   | SharedChartShowContainer
/charts/:chartId/share    | ShareChartContainer
/data_tables              | DataTableIndexContainer
/data_tables/:datatableId | DataTableShowContainer
/data_tables/new          | UploadFormContainer

# Component Hierarchy

## Components

**SessionFormContainer**
- SessionForm

**NavBarContainer**
- NavBar

**IntroContainer**
- Intro

**DashboardsContainer**
- Dashboards

**ChartIndexContainer**
- ChartIndex

**ChartDetailsContainer**
- ChartDetails

**ChartFormContainer**
- ChartForm

**DataTableIndexContainer**
- DataTableIndex

**DataTableFormContainer**
- DataTableForm

**DataTableItemContainer**
- DataTableItem

**ShareIndexContainer**
- ShareIndex

**ShareFormContainer**
- ShareForm

## Routes

Path                      | Component
--------------------------|----------
/                         | IntroContainer
/login                    | SessionFormContainer
/signup                   | SessionFormContainer
/dashboards               | DashboardsContainer
/charts                   | ChartIndexContainer
/charts/:chartId          | ChartDetailsContainer
/charts/new               | ChartFormContainer
/datatables               | DataTableIndexContainer
/datatables/:datatableId  | DataTableItemContainer
/datatables/new           | DataTableFormContainer
/share                    | ShareIndexContainer
/share/new                | ShareFormContainer

# Component Hierarchy

## Components

**SessionFormContainer**
- SessionForm

**NavBarContainer**
- NavBar

**IntroContainer**
- Intro

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
/charts                   | ChartIndexContainer
/charts/:chartId          | ChartDetailsContainer
/charts/new               | ChartFormContainer
/datatables               | DataTableIndexContainer
/datatables/:datatableId  | DataTableItemContainer
/datatables/new           | DataTableFormContainer
/share                    | ShareIndexContainer
/share/new                | ShareFormContainer

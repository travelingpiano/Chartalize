# Sample State


```
{
  session: {
    currentUser: {
      username: "Li Hsuan",
    },
    errors: {}
  }

  charts: {
    1: {
      title: "Temperature History of SF",
      type: "Bar",
      axes: {
        x: {
          title: "Month",
          type: "date"
        },
        y: {
          title: "Temperature",
          type: "degrees"
        }
      },
      query: "SELECT Month AS x AND Temperature AS y",
      data_table_id: 1
    }
  }

  data_tables: {
    1: {
      title: "SF Temperature First Half of 2016",
      type: "CSV",
      columns: ["Month", "Temperature"]
      values: [
        [January, 53],
        [February, 57],
        [March, 58],
        [April, 61],
        [May, 62],
        [June, 64]
      ],
      url: "/temperature/sf/2016"
    }
  }
}
```

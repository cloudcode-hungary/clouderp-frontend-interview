import React from'react';
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';

const apiUrl = "https://random-data-api.com/api/v2/"
const dataSources = {
  users: {
    "id": "number",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "avatar": "image",
  },
  beers: {
    "id": "number",
    "name": "string",
    "brand": "string",
    "alcohol": "string",
  },
}

const fetchAdata = async (model, options = {}) => {
  const response = await fetch(apiUrl + model + "?size=100", options)
  const data = await response.json()
  return data
}

function App() {
  const [model, setModel] = React.useState("users")
  const [data, setData] = React.useState(null)
  React.useEffect(() => {
    fetchAdata(model).then(setData)
  }, [model])
  return (
    <div className="App">
      <header className="App-header">
        {data ?
          <DataGrid
            columns={Object.entries(dataSources[model]).map(([key, value]) => ({
              field: key,
              headerName: key,
              renderCell: (params) => {
                if (value === "image") {
                  return <img src={params.row[key]} alt={key} style={{ width: 40, height: 40 }} />
                }
                return params.row[key]
              }
            }))}
            rows={data}
          /> : <CircularProgress />}
      </header>
    </div>
  );
}

export default App;

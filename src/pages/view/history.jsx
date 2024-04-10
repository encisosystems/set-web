import React from "react";
import { useHistory } from "../domain/history/useHistory";
import { TextField } from "@mui/material";

export default function HistoryPage() {
  const { history } = useHistory();

  return (
    <div style={{ padding: "100px" }}>
      <h1>Historial</h1>
      <div style={{ height: "500px", overflow: "auto" }}>
        {history.map((data, index) => (
          <TextField
            key={index}
            label={data.date}
            value={data.estimations}
            multiline
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        ))}
      </div>
    </div>
  );
}

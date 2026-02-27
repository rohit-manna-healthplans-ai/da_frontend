import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import PageHeader from "../../components/ui/PageHeader";

export default function Claims() {
  return (
    <Box className="dash-page page-enter">
      <PageHeader title="Claims" subtitle="Claims workspace (coming soon)" />
      <Paper className="glass" elevation={0} sx={{ p: 3 }}>
        <Typography sx={{ fontWeight: 900, fontSize: 20, mb: 1 }}>
          Claims dashboard is under construction
        </Typography>
        <Typography className="muted">
          This section is reserved for future claims analytics and management. You can continue using the Overview,
          Users, and Insights tabs while we wire this up.
        </Typography>
      </Paper>
    </Box>
  );
}


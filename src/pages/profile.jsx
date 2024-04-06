import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const Profile = () => {
  return (
    <Stack>
      <Grid container>
        <Grid lg={12} md={12} xs={12}>
          <AccountInfo />
        </Grid>
        <Grid lg={12} md={12} xs={12}>
          <AccountDetailsForm />
        </Grid>
      </Grid>
    </Stack>
  );
};

function AccountDetailsForm() {
  const states = [
    { value: "alabama", label: "Alabama" },
    { value: "new-york", label: "New York" },
    { value: "san-francisco", label: "San Francisco" },
    { value: "los-angeles", label: "Los Angeles" },
  ];

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
          sx={{ "margin-left": "30px" }}
        />
        <Divider />
        <CardContent>
          <Grid container sx={{ paddingX: "30px" }} gap={1}>
            <Grid md={5.9} xs={11}>
              <FormControl fullWidth required>
                <InputLabel>First name</InputLabel>
                <OutlinedInput
                  defaultValue="Sofia"
                  label="First name"
                  name="firstName"
                />
              </FormControl>
            </Grid>
            <Grid md={5.9} xs={11}>
              <FormControl fullWidth required>
                <InputLabel>Last name</InputLabel>
                <OutlinedInput
                  defaultValue="Rivers"
                  label="Last name"
                  name="lastName"
                />
              </FormControl>
            </Grid>
            <Grid md={5.9} xs={11}>
              <FormControl fullWidth required>
                <InputLabel>Email</InputLabel>
                <OutlinedInput
                  defaultValue="sofia@devias.io"
                  label="Email address"
                  name="email"
                />
              </FormControl>
            </Grid>
            <Grid md={5.9} xs={11}>
              <FormControl fullWidth>
                <InputLabel>Phone number</InputLabel>
                <OutlinedInput label="Phone number" name="phone" type="tel" />
              </FormControl>
            </Grid>
            <Grid md={5.9} xs={11}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select
                  defaultValue="New York"
                  label="State"
                  name="state"
                  variant="outlined"
                >
                  {states.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid md={5.9} xs={11}>
              <FormControl fullWidth>
                <InputLabel>City</InputLabel>
                <OutlinedInput label="City" />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "center" }}>
          <Button variant="contained">Save details</Button>
        </CardActions>
      </Card>
    </form>
  );
}

function AccountInfo() {
  const user = {
    name: "Sofia Rivers",
    avatar: "/avatar.png",
    jobTitle: "Senior Developer",
    country: "USA",
    city: "Los Angeles",
    timezone: "GTM-7",
  };
  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <div>
            <Avatar src={user.avatar} sx={{ height: "50px", width: "70px" }} />
          </div>
          <Stack spacing={2} sx={{ textAlign: "center" }}>
            <Typography variant="h5">{user.name}</Typography>
            <Typography color="text.secondary" variant="body2">
              {user.city} {user.country}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user.timezone}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
}

export default Profile;

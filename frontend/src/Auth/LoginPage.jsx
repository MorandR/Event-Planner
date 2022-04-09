import {
    Avatar,
    Box,
    Checkbox,
    FormControlLabel,
    Grid,
    Link,
    TextField
  } from "@mui/material";
  // import LockIcon from "@mui/icons-material/Lock";
  import RegisterPage from "./RegisterPage";
  
  import CustomButton from "../UI/Button";
  
  export default function LoginPage(props) {
    return (
      <Grid sx={{height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Box
        sx={{
          flexDirection: "row",
          alignItems: "center",
          borderStyle: "solid",
          borderColor: "red",
          width: 300
        }}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Avatar sx={{ bgcolor: "primary.main" }}>
          </Avatar>
        </Grid>
        <Box
          component="form"
          onSubmit={props.handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          <TextField
            margin="normal"
            sx={{ borderRadius: 100 }}
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(event) => props.setEmail(event.target.value)}
            defaultValue={props.email}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(event) => props.setPassword(event.target.value)}
          />
          <Grid container justifyContent="space-between">
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              checked={props.remember}
              onChange={(event) => props.setRemember(event.target.checked)}
            />
            <Link
              href="#"
              variant="body2"
              sx={{ alignSelf: "center" }}
              onClick={() => {
                props.setCurrentBox("nopass");
              }}
            >
              Forgot password?
            </Link>
          </Grid>
          <CustomButton
            loading={props.loading}
            type="submit"
            fullWidth
            variant="contained"
            disabled={props.email === "" || props.password === ""}
            sx={{ mt: 3, mb: 3 }}
          >
            Sign In
          </CustomButton>
          <Link
            href="/register"
            variant="body2"
            onClick={() => {
              props.setCurrentBox("register");
            }}
          >
            {"Don't have an account yet? Create one!"}
          </Link>
        </Box>
      </Box>
      </Grid>
    );
  }
  
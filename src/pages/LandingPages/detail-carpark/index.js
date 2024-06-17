import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { View, Image, StyleSheet } from "react";
import { StyleSheet, Image, View } from "react-native";
// react-router-dom components
// import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";

// Material Kit 2 React components
import MKBox from "components/MKBox";
// import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import bgImage from "assets/images/building-scaled.jpg";
import iconImage from "assets/images/punn-logo.png";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
// import axios from "axios";
import api from "api/environment";
import Swal from "sweetalert2";
// import { QRCodeCanvas } from "qrcode.react";

function DetailCarpark() {
  // const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate("");
  const [LogCarpark, setLogCarpark] = useState("");
  // const [qrcode] = useState("This is the first line.\r\nThis is the second line");
  const [Data, setData] = useState();

  // const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
    },
    tinyLogo: {
      width: 200,
      height: 75,
    },
    displayCenter: {
      display: "flex",
      backgroundColor: "#444D58",
    },
    logo: {
      width: 66,
      height: 58,
    },
  });

  // eslint-disable-next-line no-unused-vars
  const getParkingDetail = () => {
    let Log = LogCarpark;
    let tempdata = {
      search: Log,
      lostCard: false,
    };

    api
      .post(`Redemption/GetParkingDetail`, tempdata)
      .then(function (res) {
        setData(res.data);
        console.log(Data);

        if (res.data.status == "0") {
          navigate("/ParkingFee/" + Log);
          setLogCarpark("");
        } else if (res.data.status == "1") {
          Swal.fire({
            title: res.data.message,
            icon: "error",
            confirmButtonText: "Close",
          });
          setLogCarpark("");
        }

        // console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://punnspaces.com/",
          label: "PUNN | Smart Workspace",
          color: "info",
        }}
        transparent
        light
      />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
                justifyContent="center"
                alignItems="center"
                style={styles.displayCenter}
              >
                {/* <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  PUNN
                </MKTypography> */}
                <View style={styles.container}>
                  <Image style={styles.tinyLogo} source={iconImage} />
                </View>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  {/* <QRCodeCanvas value={qrcode} /> */}
                  <MKBox mb={2}>
                    <MKInput
                      type="search"
                      label="Search"
                      value={LogCarpark}
                      onChange={(e) => setLogCarpark(e.target.value)}
                      fullWidth
                    />
                  </MKBox>
                  {/* {LogCarpark !== "" && <p>Your name is {LogCarpark}.</p>} */}
                  {/* <MKBox mb={2}>
                    <MKInput type="password" label="Password" fullWidth />
                  </MKBox> */}

                  <MKBox mt={4} mb={1}>
                    {/* <MKButton
                      variant="gradient"
                      color="info"
                      onClick={() => navigate("ParkingFee/232141123123123")}
                      fullWidth
                    >
                      search
                    </MKButton> */}
                    <MKButton
                      variant="gradient"
                      color="info"
                      onClick={() => getParkingDetail()}
                      fullWidth
                    >
                      search
                    </MKButton>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      {/* <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox> */}
    </>
  );
}

export default DetailCarpark;

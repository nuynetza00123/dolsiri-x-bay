import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
// eslint-disable-next-line no-unused-vars
import MKTypography from "components/MKTypography";
// eslint-disable-next-line no-unused-vars
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
  const location = useLocation();
  const navigate = useNavigate("");
  console.log(location.pathname);
  const words = location.pathname.split("/");

  console.log(words[words.length - 1]);

  const [show, setshow] = useState(false);
  const [LogCarpark, setLogCarpark] = useState("");
  // const [qrcode] = useState("This is the first line.\r\nThis is the second line");
  const [Data, setData] = useState([]);

  // const handleSetRememberMe = () => setRememberMe(!rememberMe);

  useEffect(() => {
    setLogCarpark(words[words.length - 1]);

    getParkingDetail(words[words.length - 1]);
  }, []);

  console.log(Data);

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

  const getQr = (Log) => {
    if (Data.total > 0) {
      navigate("/QrPayment/" + Log);
    }
  };

  const getParkingDetail = (Log) => {
    // let data = { ...Data };
    let tempdata = {
      search: Log,
      lostCard: false,
    };

    api
      .post(`Redemption/GetParkingDetail`, tempdata)
      .then(function (res) {
        if (res.data.status == "0") {
          // setData(res.data.data[0]);

          setData((Data) => ({
            Data,
            ...res.data.data[0],
          }));
          setshow(true);
          setLogCarpark(Log);
        } else if (Data.status == "1") {
          Swal.fire({
            title: Data.message,
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
          <Grid item xs={11} sm={9} md={7} lg={5} xl={4}>
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
                <View style={styles.container}>
                  <Image style={styles.tinyLogo} source={iconImage} />
                </View>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  {show && (
                    <Grid
                      container
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                    >
                      <Grid container item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <MKTypography variant="button">PlateNo</MKTypography>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        item
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                        xl={6}
                      >
                        <MKTypography fontWeight="bold" variant="button">
                          {Data.plateNo}
                        </MKTypography>
                      </Grid>
                      <Grid container item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <MKTypography variant="button">Vehicle</MKTypography>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        item
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                        xl={6}
                      >
                        <MKTypography fontWeight="bold" variant="button">
                          {Data.vehicleTypeName}
                        </MKTypography>
                      </Grid>
                      <Grid container item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <MKTypography variant="button">TicketNo</MKTypography>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        item
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                        xl={6}
                      >
                        <MKTypography fontWeight="bold" variant="button">
                          {Data.ticketNo}
                        </MKTypography>
                      </Grid>
                      <Grid container item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <MKTypography variant="button">Log Id</MKTypography>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        item
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                        xl={6}
                      >
                        <MKTypography fontWeight="bold" variant="button">
                          {Data.logId}
                        </MKTypography>
                      </Grid>
                      <Grid container item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <MKTypography variant="button">DateTime In</MKTypography>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        item
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                        xl={6}
                      >
                        <MKTypography fontWeight="bold" variant="button">
                          {Data.entryDateTime}
                        </MKTypography>
                      </Grid>
                      <Grid container item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <MKTypography variant="button">Duration</MKTypography>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        item
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                        xl={6}
                      >
                        <MKTypography fontWeight="bold" variant="button">
                          {Data.parkHH + " hrs " + Data.parkMM + " mins"}
                        </MKTypography>
                      </Grid>
                      <Grid container item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <MKTypography variant="button">Total</MKTypography>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        item
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                        xl={6}
                      >
                        <MKTypography fontWeight="bold" variant="button">
                          {Data.total + " Baht"}
                        </MKTypography>
                      </Grid>
                      <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <MKTypography variant="button">Rate Detail</MKTypography>
                      </Grid>
                      <Grid container direction="row" item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <MKTypography fontWeight="bold" variant="button" color="error">
                          {Data.rateDetailEN}
                        </MKTypography>
                      </Grid>
                      <Grid container direction="row" item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <MKTypography fontWeight="bold" variant="button" color="error">
                          {Data.rateDetailTH}
                        </MKTypography>
                      </Grid>
                    </Grid>
                  )}

                  {Data.total != 0 && (
                    <MKBox
                      mt={4}
                      mb={1}
                      textAlign="center"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <MKButton
                        variant="gradient"
                        color="success"
                        onClick={() => getQr(LogCarpark)}
                      >
                        Payment
                      </MKButton>
                    </MKBox>
                  )}
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

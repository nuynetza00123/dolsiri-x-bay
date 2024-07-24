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
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

// Material Kit 2 React components
import MKBox from "components/MKBox";
// eslint-disable-next-line no-unused-vars
import MKTypography from "components/MKTypography";
// eslint-disable-next-line no-unused-vars
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import bgImage from "assets/images/BG-QR.jpg";
import iconImage from "assets/images/ThaiQRs.jpg";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
// import axios from "axios";
import api from "api/environment";
import Swal from "sweetalert2";
// import { QRCodeCanvas } from "qrcode.react";

function Qrscan() {
  // const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate("");
  const location = useLocation();
  // console.log(location.pathname);
  const words = location.pathname.split("/");

  // console.log(words[words.length - 1]);

  const [show, setshow] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [paymentSuccess, setpaymentSuccess] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [LogCarpark, setLogCarpark] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [qrcode, setQrCode] = useState("");
  const [Data, setData] = useState([]);

  // const handleSetRememberMe = () => setRememberMe(!rememberMe);

  useEffect(() => {
    GetQrcode(words[words.length - 1]);
  }, []);

  // console.log(Data);

  const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
    },
    tinyLogo: {
      width: 250,
      height: 75,
    },
    displayCenter: {
      display: "flex",
      color: "#FCDC00",
      backgroundColor: "#1A3761",
    },
    displayCenterButton: {
      color: "#FFFFFF",
      backgroundColor: "#1A3761",
    },
    logo: {
      width: 66,
      height: 58,
    },
    logoQrcode: {
      width: 220,
      height: 220,
    },
    Icon: {
      width: 100,
      height: 100,
      color: "green",
    },
  });

  const back = () => {
    navigate("/Detail");
  };

  const GetQrcode = (Log) => {
    // let data = { ...Data };
    let tempdata = {
      invoiceNo: Log,
    };

    api
      .post(`Payment/GetQrcode`, tempdata, {
        headers: {
          "API-Key": "6b3a44e1-043c-4b3b-9317-7bcefa2c92c6",
        },
      })
      .then(function (res) {
        if (res.data.status == "200") {
          console.log(res.data.data);
          setData((Data) => ({
            Data,
            ...res.data.data,
          }));
          setshow(true);
          setLogCarpark(Log);
        } else if (res.data.status == "1") {
          Swal.fire({
            title: res.data.message,
            icon: "error",
            confirmButtonText: "Close",
          });
          setLogCarpark("");
          navigate("/ParkingFee/" + Log);
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
          <Grid item xs={11} sm={8} md={4} lg={3} xl={3}>
            <Card>
              {show && (
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
              )}

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
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                      ></Grid>

                      <Image
                        style={styles.logoQrcode}
                        source={{
                          uri: Data.imageAsBase64,
                        }}
                      />
                      <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                      >
                        <MKTypography fontWeight="bold" variant="button">
                          {"กรุณาชำระก่อนเวลา : 2:00"}
                        </MKTypography>
                      </Grid>
                      <Grid container item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <MKTypography variant="button">Amount</MKTypography>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        item
                        xs={8}
                        sm={8}
                        md={8}
                        lg={8}
                        xl={8}
                      >
                        <MKTypography fontWeight="bold" variant="button">
                          {Data.amount + " Baht"}
                        </MKTypography>
                      </Grid>
                      <Grid container item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <MKTypography variant="button">Name</MKTypography>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        item
                        xs={8}
                        sm={8}
                        md={8}
                        lg={8}
                        xl={8}
                      >
                        <MKTypography fontWeight="bold" variant="button">
                          {"Dolsiri Development co. ltd"}
                        </MKTypography>
                      </Grid>
                      <Grid container item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <MKTypography variant="button">Ref.1</MKTypography>
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
                          {Data.ref1}
                        </MKTypography>
                      </Grid>
                      <Grid container item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <MKTypography variant="button">Ref.2</MKTypography>
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
                          {Data.ref2}
                        </MKTypography>
                      </Grid>
                      <MKBox
                        mt={4}
                        mb={1}
                        textAlign="center"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <MKButton
                          onClick={() => back()}
                          variant="gradient"
                          style={styles.displayCenterButton}
                        >
                          Download Qr Code
                        </MKButton>
                      </MKBox>
                    </Grid>
                  )}
                  {!show && (
                    <Grid
                      container
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                    >
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                      >
                        {paymentSuccess && <TaskAltIcon style={styles.Icon} />}
                        {!paymentSuccess && <HighlightOffIcon style={styles.Icon} />}
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                      >
                        {paymentSuccess && (
                          <MKTypography fontWeight="bold" variant="h3" color="primary">
                            payment successful
                          </MKTypography>
                        )}
                        {!paymentSuccess && (
                          <MKTypography fontWeight="bold" variant="h3" color="primary">
                            payment failed
                          </MKTypography>
                        )}
                      </Grid>

                      <MKBox
                        mt={4}
                        mb={1}
                        textAlign="center"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <MKButton
                          onClick={() => back()}
                          variant="gradient"
                          style={styles.displayCenterButton}
                        >
                          Back To Main Page
                        </MKButton>
                      </MKBox>
                    </Grid>
                  )}

                  {/* <MKBox
                    mt={4}
                    mb={1}
                    textAlign="center"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <MKButton variant="gradient" style={styles.displayCenterButton}>
                      Download Qr Code
                    </MKButton>
                  </MKBox> */}
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

export default Qrscan;

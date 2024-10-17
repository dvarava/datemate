import React from "react";
import { ViewStyle } from "react-native";
import Svg, { Path, G, Defs, LinearGradient, Stop } from "react-native-svg";

interface CustomSvgProps {
  style?: ViewStyle;
}

const styles = {
  st0: "#1C1C1C",
  st1: "#FFFFFF",
  st2: "#FF0262",
  st3: "#FF1865",
  st4: "#FF1E66",
  st5: "#FF1164",
  st6: "#FF557B",
  st7: "#FF6987",
  st8: "#FF0A63",
  st9: "#FF6484",
  st10: "#FF5F81",
  st11: "#FF2267",
  st12: "#FF4372",
  st13: "#FF3E70",
  st14: "#FF386E",
  st15: "#FF2B69",
  st16: "#FF2A69",
  st17: "#FF306B",
  st18: "#FF4975",
  st19: "#FF396E",
  st20: "#FF4B76",
  st21: "#FF346C",
  st22: "#FF5079",
  st23: "#FF2768",
  st24: "#452F33",
  st25: "#FF8A9D",
  st26: "#FF889C",
  st27: "#FF8498",
  st28: "#FF718C",
  st29: "#FF8196",
  st30: "#FF879B",
  st31: "#FE2668",
  st32: "#FF7D94",
  st33: "#FF7A92",
  st34: "#FF7790",
  st35: "#FF5A7E",
  st36: "#FF8197",
  st37: "#FF748E",
  st38: "#FF2668",
  st39: "#FF6E8A",
  st40: "#FE0262",
  st41: "#FE758F",
  st42: "#FE748E",
  st43: "#FE6584",
  st44: "#FE6B88",
  st45: "#FE7D94",
  st46: "#FE5D80",
  st47: "#FE4674",
  st48: "#FE5B7F",
  st49: "#FE3D70",
  st50: "#FF6B88",
  st51: "#FE4F78",
  st52: "#FE557B",
  st53: "#FE4E78",
  st54: "#FE567C",
  st55: "#FE889C",
  st56: "#FE336C",
  st57: "#FE2B69",
  st58: "#FE2167",
  st59: "#FE8298",
  st60: "#FE1765",
  st61: "#FE1A65",
  st62: "#FE899C",
  st63: "#FE0E63",
  st64: "#FE0D63",
  st65: "#FF4F78",
  st66: "#FF8B9E",
  st67: "#FF8499",
};

const CustomSvg: React.FC<CustomSvgProps> = ({ style }) => (
  <Svg viewBox="0 0 1000 1000" style={style}>
    <Defs>
      {/* Define gradients or other definitions here if needed */}
    </Defs>

    {/* Existing Paths from the first part */}
    <Path
      d="M298.7,192.6c8.1,6.9,14.5,14.7,18.6,23.9c2.9,6.4,5.4,13.1,4.6,20.4c-0.5,4.7,1.1,7.5,5.3,10
        c17,9.9,32.8,21.7,45.5,36.8c12,14.2,20.4,30.6,25.4,48.7c1,3.5,0.2,4.7-3.6,4.6c-10-0.2-19.9-0.1-29.9,0c-2.6,0-3.7-0.8-4.6-3.2
        c-7.6-19-19.7-34.4-37.2-45.5c-1.5,1-0.8,2.6-0.8,4c-0.1,13.5-0.2,26.9,0,40.4c0,3.5-1,4.4-4.5,4.4c-54.2-0.1-108.4-0.1-162.5,0
        c-3.4,0-4.6-0.8-4.5-4.4c0.3-8.6,0-17.3,0.1-25.9c0.1-2.8-0.8-3.7-3.6-3.9c-7.8-0.7-15.6-1.4-23.2-2.9
        c-40.4-8-70.8-29.7-90.3-66.2c-2.3-4.4-5.1-8.5-7.6-12.8c-1.1-2-3.1-1.7-4.8-2.1C6.6,215-2.1,202.6,0.4,189c0.2-1,0.4-2,0.7-2.9
        c1-2.5,2.5-4.6,5.5-4c3.1,0.6,4.1,2.9,3.8,6c-0.9,9.8,2.4,15.5,10.8,19.5c2.3,1.1,3.8,1.2,5.2-1.5c3.9-7.6,10.3-11,18.9-9.9
        c2.1,0.3,3-0.4,3.7-2.2c2.8-6.6,0.1-14.2-6.5-17.3c-3-1.4-5.8-2.8-4.1-6.5c1.9-4,5.4-3.2,8.6-1.6c10.1,5.1,14.6,17.4,10.2,28.7
        c-1.1,2.9-0.9,4.8,1.2,7c6.1,6.3,8.2,15.1,13.3,22.1c15.5,21.1,35.9,34.1,62,37.9c4.3,0.6,8.6,0.9,12.8,1.7c3.8,0.7,5.4,0,5.2-4.4
        c-0.3-9,0.2-17.9-0.2-26.9c-0.6-14.2,6.2-24.9,15.4-34.7c2.2-2.4,4.6-4.7,8.1-6.6c-3.6-1.6-6.5-0.9-9.3-0.8
        c-12.1,0.5-23-2.8-32.5-10.1c-12.4-9.7-21.5-21.4-20.7-38.4c0.4-8.8,0.5-17.6,0-26.4c-0.8-13.6,5.4-24.1,14.4-33
        C134.7,77.1,144,71.8,155,70c1.6-0.3,3.3-0.4,4.9-0.4c22.1,0,44.2-0.1,66.3,0.1c4.3,0,6.3-0.9,6.1-5.8
        c-0.4-12.1-0.2-24.2-0.1-36.4c0-3.1-0.6-5.2-3.4-7c-3.9-2.4-5.4-8.6-3.1-13.5c1.9-4,4.5-7.4,9.9-7c5.1,0.4,10.9,3.8,12.3,7.9
        c1.6,4.7,0,9.2-4.7,12.9c-1.5,1.2-2,2.4-1.9,4.2c0.1,13.6,0.2,27.2-0.1,40.9c-0.1,4,2,3.7,4.7,3.7c22.1-0.1,44.2,0.1,66.3-0.1
        c22.9-0.1,45.4,19.5,48.9,41.6c2.1,13.1,2,26.6,0,39.7c-2.7,17.4-13.8,29-29.4,36.8c-8.5,4.3-17.3,5.1-26.5,4.9
        C303.1,192.6,300.9,192.6,298.7,192.6L298.7,192.6z"
      fill={styles.st0}
    />

    <Path
      d="M180.7,113.9c1.1-1.9,2.4-3.5,4.2-4.7c7.1-4.5,18.6-2.1,21.7,8.5c1.6,5.4,0.3,10.3-2.4,15
      c-3.8,6.5-9.2,11.6-15,16.3c-2.3,1.9-4.7,3.7-7.2,5.3c-0.9,0.6-1.8,0.8-2.7,0.1c-8.2-5.6-15.8-11.8-21.4-20.2
      c-2.6-3.9-4.4-8.1-4-12.9c0.7-8.1,6.7-14.2,14.4-14.2c5.3,0.1,9.2,1.9,12,6.4C180.4,113.7,180.5,113.8,180.7,113.9L180.7,113.9z"
      fill={styles.st1}
    />

    <Path
      d="M293.1,114.7c1.1-1.9,2.4-3.5,4.2-4.7c7.1-4.5,18.6-2.1,21.7,8.5c1.6,5.4,0.3,10.3-2.4,14.9
      c-3.8,6.5-9.2,11.6-15,16.3c-2.3,1.9-4.7,3.7-7.2,5.3c-0.9,0.6-1.8,0.8-2.7,0.1c-8.2-5.6-15.8-11.8-21.4-20.2
      c-2.6-3.9-4.5-8.1-4-12.9c0.7-8.1,6.7-14.2,14.4-14.2c5.3,0.1,9.2,1.9,12,6.4C292.8,114.5,292.9,114.5,293.1,114.7L293.1,114.7z"
      fill={styles.st1}
    />

    {/* New SVG Elements from the Second Part */}
    <G>
      <G>
        {/* Path with class "st0" */}
        <Path
          d="M-1130-884c1086.7,0,2173.3,0,3260,0c0,922.7,0,1845.3,0,2768c-1086.7,0-2173.3,0-3260,0
            C-1130,961.3-1130,38.7-1130-884z"
          fill={styles.st0}
        />

        {/* Path with class "st1" */}
        <Path
          d="M962.8,1435.8c-35.4,32-74,59.9-112.3,88.2c-46.9,34.6-93.7,69.4-140.9,103.5c-20.2,14.6-41.4,28-62.3,41.6
            c-54.1,35.3-107.3,71.9-162.6,105.3c-6.6,4-11.1,4.1-17.9,0.4c-64.4-35.7-126.1-75.6-186.5-117.8
            c-79.2-55.4-156.1-113.7-232.4-172.9c-12.6-9.8-25.5-19.3-38.4-28.7c-2.3-1.7-4.3-3-4.2-6c-3-5.8-3.3-12.1-3.3-18.5
            c0.1-59.9-0.6-119.9,0.2-179.8c1.9-140.1,0.2-280.3,0.9-420.4c0-1.8,0-3.5,0.2-5.3c9.5-64.3,37.1-119.6,83.3-165.6
            c6.8-6.8,14.9-12.2,22.7-20.1c-29.4-1.4-57.9,1.4-86.1-2.9c-1-0.1-1.9-0.3-2.8-0.6c-2.9-1.3-6.1-1.5-9.3-2
            c-0.9-0.1-1.8-0.3-2.6-0.6c-3-1.1-6.3-0.8-9.4-1.7c-21.6-5.3-42.7-12-62.4-22.3c-0.8-0.4-1.5-0.8-2.3-1.3c-1-0.6-2-1.3-3-1.9
            c-0.6-0.3-1.3-0.7-1.9-1.1c-0.9-0.5-1.8-1-2.7-1.5c-0.6-0.3-1.2-0.6-1.8-0.9c-0.9-0.4-1.8-0.9-2.7-1.4c-0.6-0.3-1.2-0.7-1.8-1.1
            c-0.6-0.4-1.2-0.8-1.8-1.2c-0.3-0.2-0.6-0.4-1-0.6c-1.4-0.7-2.9-1.4-4.3-2.1c-16.9-9.8-31.6-22.3-46.2-35
            c-10.3-8.7-18.2-19.5-26.6-29.8c-0.5-0.6-1-1.3-1.6-1.9c-0.5-0.6-1-1.2-1.5-1.8c-0.2-0.3-0.5-0.6-0.7-0.9
            c-0.5-0.5-0.9-1.1-1.4-1.7c-0.4-0.6-0.8-1.2-1.2-1.8c-0.4-0.6-0.8-1.2-1.1-1.8c-0.4-0.5-0.8-1.1-1.2-1.7c-0.4-0.5-0.8-1.1-1.2-1.7
            c-0.4-0.5-0.8-1.1-1.2-1.7c-0.6-0.9-1.2-1.7-1.9-2.6c-0.5-0.5-1-1.1-1.4-1.7c-0.5-0.6-1-1.2-1.4-1.8c-0.5-0.6-0.9-1.3-1.4-2
            c-0.9-1.5-1.9-2.9-2.9-4.4c-15.9-23.5-25.2-49.9-33.8-76.6c-8.3-31-11.8-62.5-10-94.6c0.1-2,0-4-0.5-5.9
            c-0.5-14.3-0.3-28.5,0.4-42.8c-0.6-3.1,0.6-6.2,0-9.3c-1-16.6-1.2-33.3,0.2-49.9c0.6-17.3,2-34.6,5.7-51.5c0.2-1,0.5-1.9,0.8-2.9
            c0.9-2.5,1.9-5.1,2.3-7.8c0.2-0.8,0.4-1.7,0.7-2.5c0.8-2,1-4.1,1.5-6.1c0.2-0.9,0.4-1.7,0.7-2.5c1.1-3.3,2.4-6.5,2.9-9.9
            c0.2-0.8,0.5-1.6,0.8-2.4c0.4-1.1,1-2.3,1.5-3.4c0.3-0.7,0.6-1.5,0.9-2.2c0.4-1.1,0.8-2.2,1.2-3.3c0.2-0.8,0.5-1.5,0.7-2.2
            c0.4-1.1,0.7-2.2,1.2-3.3c0.2-0.7,0.5-1.4,0.8-2.1c0.4-1,0.9-2,1.4-3c0.2-0.7,0.5-1.3,0.8-1.9c0.3-1,0.7-2,1-3
            c0.2-0.7,0.4-1.3,0.7-2c0.4-1,0.8-1.9,1.3-2.8c0.3-0.6,0.6-1.2,1-1.8c0.5-0.9,1-1.8,1.4-2.7c0.3-0.6,0.6-1.2,0.9-1.8
            c0.3-0.6,0.6-1.2,0.9-1.8c0.3-0.6,0.6-1.2,0.9-1.8c0.4-0.9,0.9-1.8,1.3-2.6c0.2-0.6,0.5-1.2,0.8-1.8c0.2-0.6,0.6-1.2,0.9-1.8
            c0.3-0.6,0.6-1.2,1-1.7c0.3-0.6,0.7-1.1,1.1-1.6c0,0,0.6-0.8,0.6-0.8c0.5-0.8,1-1.6,1.5-2.5c0.3-0.6,0.6-1.2,0.9-1.8
            c0.4-0.9,0.9-1.8,1.4-2.7c0.3-0.6,0.7-1.3,1.1-1.9c0.8-1.2,1.6-2.5,2.3-3.8c0.3-0.7,0.7-1.4,1.1-2.1c0.8-1.5,1.6-3,2.6-4.4
            c29.8-44.1,68.8-77.4,116.8-100.3C-32-40.8-5-48.6,22.9-52.9c7.7-0.1,15-3.4,22.8-2.3c70.9,0.5,141.8-0.2,212.6,0.3
            c62.9,0.4,125.7-1.3,188.6-1.1c12.2,0,13-0.9,13.1-13.1c0.1-27,0-53.9,0-80.9c0-15.6-0.5-31.2,0.7-46.8
            c-1.3-29.9-0.2-59.9-0.6-89.9c-0.1-5-0.5-10,0.1-15c1.2-11-2.1-19.5-11.7-25.3c-20-17.9-29.3-39.8-23.7-66.7
            c6.2-29.2,24.7-46.8,53.1-54.7c10.9-0.2,21.9-2.1,32.7,0.9c22.4,6.2,37.8,20.2,46.7,41.4c1.2,2.7,1.2,5.8,2.3,8.6
            c0.3,0.9,0.6,1.8,0.7,2.7c0.4,3.7,0.5,7.4,1.6,10.9c0.3,1.8,0.3,3.7,0,5.5c-1.3,3.8-1.2,7.9-1.6,11.8c-0.1,0.8-0.3,1.7-0.6,2.5
            c-0.5,1.5-1.1,3-1.6,4.5c-0.2,0.7-0.5,1.4-0.8,2.1c-0.5,1.3-1,2.7-1.5,4c-0.2,0.7-0.5,1.3-0.8,1.9c-0.4,0.9-0.9,1.8-1.4,2.7
            c-0.3,0.6-0.7,1.2-1.1,1.7c-0.3,0.6-0.8,1.1-1.2,1.6c0,0-0.6,0.8-0.6,0.8c-0.5,0.9-1.1,1.7-1.6,2.6c-0.3,0.6-0.7,1.2-1.1,1.8
            c-0.4,0.6-0.8,1.2-1.3,1.8c-0.2,0.3-0.5,0.6-0.7,0.9c-0.7,0.9-1.4,1.8-2,2.7c-0.4,0.7-0.9,1.3-1.4,1.9c-0.5,0.6-1,1.1-1.6,1.6
            c-0.6,0.5-1.2,1-1.8,1.4c-0.9,0.6-1.8,1.2-2.7,1.8c-0.5,0.5-1.1,0.9-1.6,1.3c-0.5,0.5-1,0.9-1.6,1.3c-0.2,0.2-0.5,0.4-0.8,0.7
            c-0.5,0.5-1,0.9-1.6,1.3c-0.5,0.4-1.1,0.8-1.7,1.1c-0.9,0.5-1.7,1-2.6,1.5c-0.5,0.4-1.1,0.8-1.6,1.2c-0.8,0.8-1.3,1.7-1.8,2.7
            c-0.2,0.9-0.4,1.7-0.7,2.5c-0.3,8.4,0,16.7-0.1,25.1c0,72.3,0,144.5,0,216.7c0,15.8,1.9,17.7,17.9,17.7
            c92.9,0,185.8,0.5,278.6-0.3c30.9-0.2,61.9-0.4,92.8-0.7c5,0,10-0.2,14.9,0.7c9.2,2.9,18.9,2.7,28.4,4.4
            c27.3,4.7,53.2,13.6,78,25.9c22.8,13.1,45.4,26.5,64.2,45.3c20.2,19.7,39.2,40.5,53,65.4c5.6,10.1,10.5,20.7,16,30.9
            c12.1,26.2,18.1,54,22,82.3c0.1,1.2,0.1,2.4,0.2,3.6c0,59.6,0.1,119.2,0,178.7c0,1.1-0.1,2.2-0.2,3.3c-1.3,4.3-2.1,8.7-2.1,13.3
            c-0.1,0.9-0.3,1.8-0.6,2.7c-1.3,2.8-1.1,5.9-1.5,8.9c-0.1,0.8-0.3,1.7-0.5,2.5c-0.6,2-1.2,3.9-1.5,6c-0.1,0.8-0.4,1.6-0.6,2.4
            c-0.7,1.9-1.1,3.9-1.5,5.9c-0.1,0.8-0.3,1.6-0.6,2.4c-0.7,1.9-1.1,4-1.4,6c-0.1,0.9-0.4,1.7-0.7,2.5c-2.5,6.5-4.2,13.4-7,19.8
            c-0.3,0.8-0.6,1.6-1,2.4c-1.2,2.2-1.8,4.7-3,6.9c-0.3,0.7-0.7,1.5-1.1,2.2c-0.5,1-1.1,2-1.7,3c-0.3,0.7-0.7,1.4-1,2
            c-0.3,0.7-0.7,1.4-1,2c-0.3,0.7-0.7,1.3-1,2c-0.3,0.7-0.6,1.3-1,2c-0.3,0.7-0.7,1.3-1,2c-0.3,0.7-0.6,1.3-1,2
            c-0.3,0.7-0.7,1.3-1,2c-0.3,0.7-0.6,1.4-1,2c-0.3,0.7-0.7,1.4-1,2.1c-0.5,1.1-1,2.2-1.5,3.3c-0.3,0.8-0.7,1.6-1.1,2.4
            c-25.6,44.2-60.3,79.4-104.5,105.1c-0.7,0.4-1.5,0.8-2.1,1.3c-0.7,0.5-1.4,0.9-2.1,1.2c-0.7,0.4-1.4,0.8-2.1,1.1
            c-0.7,0.4-1.3,0.7-2,1c-0.6,0.4-1.3,0.7-2,1c-0.6,0.4-1.3,0.7-2,1c-0.6,0.4-1.3,0.7-2,1c-0.6,0.4-1.3,0.7-2,1
            c-0.6,0.4-1.3,0.7-2,1c-0.6,0.4-1.3,0.7-1.9,1c-0.6,0.4-1.3,0.6-1.9,0.9c-1,0.5-1.9,0.9-2.9,1.4c-0.6,0.3-1.3,0.6-2,0.8
            c-1,0.4-2,0.7-3,1.1c-0.7,0.3-1.3,0.6-2,0.8c-1,0.5-2,1-3,1.5c-0.7,0.4-1.4,0.8-2.1,1.2c-1.6,0.8-3.2,1.6-4.8,2.3
            c-18.8,7.2-38.2,12-58.1,15c-1,0.3-2,0.5-3,0.7c-5.1,0.3-10.3,0-15.2,1.9c-1.5,0.4-3.1,0.6-4.7,0.4c-19.4-0.1-38.9,0-58.3,0
            c-2.9,0-6-0.8-8.5,1.1c3.6,6.4,10.2,9.4,15.2,14.2c11.1,10.5,21.6,21.7,31.2,33.6c1.3,1.6,2.1,3.5,3.4,5.1c0.5,0.6,1,1.2,1.4,1.8
            c0.5,0.6,0.9,1.2,1.4,1.8c0.5,0.6,0.9,1.3,1.3,1.9c0.7,1,1.4,2,2.1,2.9c0.6,0.7,1.1,1.3,1.6,2.1c11.7,16.4,21,34.1,28.7,52.7
            c5.7,13.8,10,27.9,13.4,42.4c0.9,3.1,0.5,6.5,1.6,9.5c0.3,0.8,0.5,1.7,0.7,2.6c0.6,3.4,0.2,7,1.5,10.3c0.3,0.9,0.5,1.7,0.7,2.6
            c0.8,4.5-0.3,9.2,1.6,13.6c0.3,1,0.5,1.9,0.6,2.9c0,5.2,0.5,10.4,2.2,15.4c1.6,5.8-0.4,11.7,0.5,17.6c1.2,19.7,0.8,39.4,0.2,59.1
            c-0.1,2.6-0.5,5.2,0.2,7.8c0.1,34.6,1,69.2-0.5,103.8c1.4,33,1,66.1,0.2,99.1c-0.1,2.3-0.3,4.6-0.2,6.9c1.4,35.7,1,71.3,0.2,107
            c0,2.3-0.4,4.6-0.2,6.9c1.3,34.4,1.3,68.9-0.1,103.3c1.6,9.9,0.6,19.9-0.1,29.8c0.9,4.7,0.6,9.4,0,14.1c0,2.8-0.1,5.6,0.1,8.4
            c0.5,3.2-0.2,6.4-0.8,9.5C965.6,1431.4,963.4,1433.2,962.8,1435.8z"
          fill={styles.st2}
        />

        {/* Path with class "st2" */}
        <Path
          d="M-779.8,534c-8.4-14.4-14.6-29.8-21.2-45c-11.4-25.9-22-52.1-31.8-78.7c-16.3-44.4-30.3-89.5-41.7-135.4
            c-8.2-32.9-14.9-66.1-20.3-99.7c-4.1-25.7-6.8-51.5-10.4-77.2c-0.2-1.6-0.3-3.3-0.4-5c-1.3-22.2-2.5-44.5-4-66.7
            c-2.3-35.6,0.6-71.1,2.8-106.6c1.1-18.3,2.6-36.5,4.8-54.7c3.4-26.8,8.6-53.2,14.6-79.5c8.5-37.3,19.8-73.9,33.2-109.7
            c17.7-47.3,40.6-91.9,69.7-133.3c25.4-36.1,54.3-69.1,86.7-99c30.6-28.3,63.6-53.5,98-77.3c52.4-36.3,109-64.3,167.4-88.6
            c33.8-14.1,68.6-25.6,104.4-33.9c21.7-5.1,43.3-10.2,65.4-13.5c12.2-1.8,24.4-3.2,36.7-3.8c29.6-1.3,59.2-3.4,88.8-2.5
            c32.9,1,65.8,1.9,98.6,6.9c16.7,2.5,33.7,3.9,50.4,7.1c14.7,2.8,29.4,5.8,44,8.8c2.9,0.6,6,0.9,8.2,3.3c7.1,5.1,2.3,10.3-0.5,14.7
            c-9.8,15.9-20.2,31.4-30.4,47c-87,133.5-173.3,267.3-260.3,400.8c-47.5,72.9-94.7,145.9-142,218.9
            c-74.5,114.9-149.1,229.8-223.7,344.7c-55.2,85-110.3,170-165.4,255c-2.4,3.6-4.5,7.5-7.7,10.4c-3,2.8-6.4,5.4-10,0.5l0,0
            c-1.1-1.1-0.8-2.9-1.9-4.1l0,0C-779.2,536.9-778.8,535.1-779.8,534z"
          fill={styles.st2}
        />

         {/* Path with class "st3" */}
         <Path
          d="M-674.1,728.1c-13.8-20.7-27.3-41.6-37.9-64.2c-5.3-7.8-3-14.3,1.9-21.7c77.9-119,155-238.5,232.6-357.8
          c56.5-86.8,112.8-173.8,169.2-260.7c65.6-101.2,131.3-202.3,197-303.4C-54.9-366.5-130.9-118.2-212.8,7.9c-56.3,86.6-112.5,173.3-168.7,260
          c-83.1,128-166,256.2-249.3,384.1c-12.5,19.3-24.6,38.9-37.7,57.7C-672.7,715.7-670.3,722.6-674.1,728.1z"
          fill={styles.st3}
        />

        {/* Path with class "st4" */}
        <Path
          d="M-674.1,728.1c-3.7-8.9,0.1-15.5,5.1-23.1c27.7-41.5,54.7-83.5,81.8-125.3c15-23.1,29.9-46.4,45-69.5
          c25.5-39.3,51.1-78.6,76.6-117.9c24.4-37.7,48.8-75.3,73.3-113c23.5-36.3,47.1-72.5,70.6-108.8c24.8-38.2,49.6-76.4,74.5-114.6
          c24.4-37.7,48.8-75.4,73.3-113c24.8-38.2,49.7-76.4,74.4-114.6c9.9-15.3,19.8-30.7,29.4-46.3c3-4.9,6.6-7.8,12.3-8
          c14.1,5.8,26.6,14.3,39.2,22.5c8.5,5.5,17.9,9.8,25,17.4c-2.8,2.8-5.9,1.5-8.2-0.3c-8.1-6.3-12.2-1.8-16.4,5
          c-16.1,25.7-32.9,50.9-49.4,76.4c-28,43.4-56.1,86.7-84.2,130c-80,123.2-160,246.5-239.9,369.7C-138.9,5.4-182.3,72.2-225.6,139
          c-80,123.2-160,246.4-239.9,369.7c-43.3,66.8-86.7,133.6-130.1,200.3c-11.3,17.3-22,35-34,51.8c-4.8,6.7-6.5,14.2-8.6,21.7
          c-7.8-8.6-13.5-18.7-19.8-28.3C-663.6,745.7-670.9,738.1-674.1,728.1z"
          fill={styles.st4}
        />

        {/* Path with class "st5" */}
        <Path
          d="M177.8-711.9c-3.9-0.3-6.2,0.8-8.7,4.7c-14.8,23.7-30.1,47.1-45.3,70.5C97.6-596.4,71.2-556,44.9-515.5
          c-16.3,25.1-32.5,50.2-48.8,75.3c-24.3,37.4-48.5,74.7-72.8,112.1c-16.3,25.1-32.6,50.2-48.9,75.3
          c-25.7,39.6-51.5,79.2-77.2,118.8c-15.2,23.4-30.3,47-45.5,70.4c-25.3,39.1-50.8,78-76.1,117.1c-24.4,37.7-48.8,75.4-73.3,113
          c-23.7,36.5-47.5,73.1-71.2,109.6c-15.9,24.5-31.8,49.1-47.8,73.7c-26.1,40.2-52.2,80.3-78.3,120.4c-15,23.2-30,46.4-45,69.5
          c-23.5,36.3-46.7,72.8-70.8,108.7c-4,6-0.3,10.5-1.3,15.5c-7-7.7-11.2-17.2-15.8-26.3c-6.7-13.3-15.5-25.4-20.5-39.6
          c3.4-9.9,10.2-17.9,15.8-26.5c41.8-64.6,83.7-129.2,125.6-193.7c80.2-123.5,160.4-247,240.5-370.5
          c36.2-55.9,72.6-111.7,108.9-167.6c78.3-120.7,156.7-241.4,235-362.2C19.3-587,61.2-651.5,103.1-716c4.2-6.4,8.2-12.9,10.9-20.1
          c15.6,2.3,29.5,9.6,44,15.3C164.7-718.1,172-716.6,177.8-711.9z"
          fill={styles.st5}
        />

        {/* Path with class "st6" */}
        <Path
          d="M929.5-51.8c-23.3-0.1-46.6-0.2-69.9-0.2c-109.2,0-218.4,0.1-327.5,0.1c-13.5,0-12.3,1.3-12.3-12.3
          c0-72.2,0-144.5,0-216.7c0-3.7,0.3-7.3,0.4-11c1.4-0.5,2.5-0.1,3.4,1.2c2.6,4.2,2.4,8.9,2.4,13.6c0.1,38.9,0,77.9,0.1,116.8
          c0,4.7-1.3,9.2-0.9,13.9c1.8,24.5,0.4,48.9,0.8,73.4c0.2,15.1,0.1,15,15.6,15.2c10.9,0.1,21.8-0.8,32.7,0.7
          c42-1.4,84.1-0.7,126.1-0.4c38.9,1.1,77.9,0.2,116.9,0.5c5.9,0,8.9-3.5,11.7-7.9c25.5-39.9,51.5-79.4,77.2-119.2
          c27.7-42.8,55.4-85.6,83.2-128.4c63.9-98.4,127.7-196.8,191.6-295.2c27.2-41.7,54-83.3,81.2-124.9c3.5-5.4,6.6-12.2,12.3-8
          c14.6,1.7,28.5,6.7,42.9,9.5c21.4,4.9,41.9,12.3,62.4,20c41.5,15.5,81.4,34.5,120,56.1c2,1.1,4.4,1.7,5.6,3.9
          c-3.8,3.8-7.4,1.3-10.9-0.5c-12.1-6.2-24-12.7-36.1-19c-25.7-12.7-52-24-78.9-33.7c-5.4-1.9-8.6-0.7-11.6,4.1
          c-46.5,72.2-93.4,144.2-140.1,216.3c-27.2,41.9-54.3,83.8-81.5,125.7c-63.6,98-127.3,196-190.8,294.1c-0.9,1.4-2,2.7-2.7,4.2
          C950.4-51.1,941.2-48.7,929.5-51.8z"
          fill={styles.st6}
        />
      </G>
    </G>

    {/* Add more SVG elements here as you provide them */}
  </Svg>
);

export default CustomSvg;
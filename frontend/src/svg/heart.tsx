import React from 'react';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { colors } from "@/constants/tokens";

const Heart: React.FC<{ size?: number }> = ({ size = 40 }) => (
    <Svg width={size} height={size} viewBox="0 0 32 29.6">
      <Defs>
        <SvgLinearGradient id="grad" x1="0.6" y1="0" x2="1.4" y2="1">
          <Stop offset="0" stopColor={colors.secondary} />
          <Stop offset="1" stopColor={colors.primary} />
        </SvgLinearGradient>
      </Defs>
      <Path
        d="
          M16,28
          C12,28,0,18,0,8
          C0,3.6,3.6,0,8,0
          C11,0,14,2,16,5
          C18,2,21,0,24,0
          C28.4,0,32,3.6,32,8
          C32,18,20,28,16,28
          Z
        "
        fill="url(#grad)"
      />
    </Svg>
  );

export default Heart;


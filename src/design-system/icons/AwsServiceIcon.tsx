import {Img, staticFile} from "remotion";
import {colors, fontFamilies, spacing} from "../tokens";
import {awsServiceRegistry, type AwsServiceName} from "./registry";

export type AwsServiceIconProps = {name: AwsServiceName; size?: number; showLabel?: boolean};

export const AwsServiceIcon = ({name, size = 64, showLabel = false}: AwsServiceIconProps) => {
  const service = awsServiceRegistry[name];
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.sm}}>
      <Img src={staticFile(`assets/aws/${service.file}`)} style={{width: size, height: size, objectFit: "contain"}} />
      {showLabel ? <div style={{fontFamily: fontFamilies.sans, fontSize: 13, color: colors.textMuted}}>{service.label}</div> : null}
    </div>
  );
};

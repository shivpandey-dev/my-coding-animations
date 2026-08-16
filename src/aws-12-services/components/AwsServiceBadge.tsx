import {spring, useCurrentFrame, useVideoConfig} from "remotion";
import {colors, mono} from "../theme";

export const AwsServiceBadge: React.FC<{label:string; delay?:number; active?:boolean}> = ({label,delay=0,active=false}) => {
  const frame=useCurrentFrame(); const {fps}=useVideoConfig();
  const s=spring({frame:frame-delay,fps,config:{damping:18,stiffness:150}});
  return <div style={{scale:s, padding:"13px 18px", borderRadius:14, fontFamily:mono, fontWeight:700, fontSize:22, color:active?colors.bg:colors.text, background:active?colors.orange:colors.surface2, border:`1px solid ${active?colors.orange:"rgba(148,163,184,.22)"}`}}>{label}</div>;
};

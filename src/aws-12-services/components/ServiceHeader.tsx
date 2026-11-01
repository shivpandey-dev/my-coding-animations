import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {clamp, colors, mono} from "../theme";

export const ServiceHeader: React.FC<{number:string; title:string; descriptor:string; compact?:boolean}> = ({number,title,descriptor,compact=false}) => {
  const frame=useCurrentFrame(); const {fps}=useVideoConfig();
  const enter=spring({frame,fps,config:{damping:17,stiffness:125}});
  return <div style={{position:"absolute", left:100, right:100, top:compact?140:150, opacity:interpolate(frame,[0,8],[0,1],clamp), translate:`0 ${interpolate(enter,[0,1],[50,0])}px`}}>
    <div style={{fontFamily:mono,fontSize:32,fontWeight:800,letterSpacing:4,color:colors.orange}}>{number}</div>
    <div style={{fontSize:compact?76:88,lineHeight:.98,fontWeight:900,letterSpacing:-3,marginTop:14,maxWidth:900}}>{title}</div>
    <div style={{fontFamily:mono,fontSize:30,fontWeight:700,letterSpacing:5,color:colors.muted,marginTop:24}}>{descriptor}</div>
  </div>;
};

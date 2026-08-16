import type {ReactNode} from "react";
import {spring, useCurrentFrame, useVideoConfig} from "remotion";
import {colors, mono} from "../theme";

export const ArchitectureNode: React.FC<{x:number;y:number;width?:number;height?:number;label:string;subLabel?:string;delay?:number;accent?:string;children?:ReactNode}> = ({x,y,width=230,height=150,label,subLabel,delay=0,accent=colors.orange,children}) => {
  const frame=useCurrentFrame(); const {fps}=useVideoConfig(); const s=spring({frame:frame-delay,fps,config:{damping:16,stiffness:130}});
  return <div style={{position:"absolute",left:x,top:y,width,height,scale:s,background:colors.surface,border:`2px solid ${accent}88`,borderRadius:26,boxShadow:`0 0 40px ${accent}12`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,zIndex:3}}>
    {children}<div style={{fontSize:30,fontWeight:850}}>{label}</div>{subLabel&&<div style={{fontFamily:mono,fontSize:17,letterSpacing:2,color:colors.muted}}>{subLabel}</div>}
  </div>;
};

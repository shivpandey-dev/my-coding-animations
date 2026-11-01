import {interpolate} from "remotion";
import {clamp, colors} from "../theme";

export const TrafficPacket: React.FC<{from:{x:number;y:number};to:{x:number;y:number};progress:number;color?:string;size?:number}> = ({from,to,progress,color=colors.orange,size=12}) => <div style={{position:"absolute",zIndex:5,left:interpolate(progress,[0,1],[from.x,to.x],clamp)-size/2,top:interpolate(progress,[0,1],[from.y,to.y],clamp)-size/2,width:size,height:size,borderRadius:"50%",background:color,boxShadow:`0 0 18px ${color}`}}/>;

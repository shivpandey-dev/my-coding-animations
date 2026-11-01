import {colors, mono} from "../theme";

export type ConnectionLineProps={startX:number;startY:number;endX:number;endY:number;progress:number;label?:string;dashed?:boolean;color?:string};
export const ConnectionLine: React.FC<ConnectionLineProps> = ({startX,startY,endX,endY,progress,label,dashed=false,color=colors.orange}) => {
  const length=Math.hypot(endX-startX,endY-startY); const p=Math.max(0,Math.min(1,progress));
  return <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",overflow:"visible",zIndex:1}}>
    <line x1={startX} y1={startY} x2={endX} y2={endY} stroke={color} strokeWidth={3} strokeLinecap="round" strokeDasharray={dashed?"12 12":length} strokeDashoffset={dashed?0:length*(1-p)} opacity={.8}/>
    {label&&p>.65&&<text x={(startX+endX)/2} y={(startY+endY)/2-14} fill={colors.muted} fontFamily={mono} fontSize={18} textAnchor="middle">{label}</text>}
  </svg>;
};

import {ArchitectureNode} from "./ArchitectureNode";
import {colors} from "../theme";
export const ServerNode: React.FC<{x:number;y:number;delay?:number;label?:string;active?:boolean}> = ({x,y,delay,label="EC2",active=true}) => <ArchitectureNode x={x} y={y} width={210} height={150} label={label} subLabel={active?"● RUNNING":"○ BOOTING"} delay={delay} accent={active?colors.green:colors.orange}><div style={{display:"flex",gap:8}}>{[0,1,2].map(i=><i key={i} style={{width:38,height:6,borderRadius:5,background:active?colors.green:colors.muted}}/>)}</div></ArchitectureNode>;

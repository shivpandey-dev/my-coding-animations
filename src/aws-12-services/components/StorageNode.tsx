import {ArchitectureNode} from "./ArchitectureNode";
import {colors} from "../theme";
export const StorageNode: React.FC<{x:number;y:number;delay?:number}> = ({x,y,delay}) => <ArchitectureNode x={x} y={y} label="S3" subLabel="OBJECT STORAGE" delay={delay}><div style={{width:76,height:58,border:`4px solid ${colors.orange}`,borderTop:"none",borderRadius:"0 0 14px 14px"}}/></ArchitectureNode>;

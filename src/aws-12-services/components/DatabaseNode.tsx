import {ArchitectureNode} from "./ArchitectureNode";
import {colors} from "../theme";
export const DatabaseNode: React.FC<{x:number;y:number;delay?:number}> = ({x,y,delay}) => <ArchitectureNode x={x} y={y} label="RDS" subLabel="MANAGED DATABASE" delay={delay} accent={colors.blue}><div style={{width:70,height:42,borderRadius:"50%",border:`4px solid ${colors.blue}`,boxShadow:`inset 0 -22px 0 ${colors.blue}18`}}/></ArchitectureNode>;

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Cloud,
  Database,
  File,
  Folder,
  Globe,
  Lock,
  Monitor,
  Network,
  Server,
  Terminal,
  Users,
} from "lucide-react";
import {
  siDocker,
  siGithub,
  siJavascript,
  siKubernetes,
  siNodedotjs,
  siReact,
  siTypescript,
} from "simple-icons/icons";

export const techIconRegistry = {
  folder: Folder,
  cloud: Cloud,
  users: Users,
  database: Database,
  server: Server,
  lock: Lock,
  globe: Globe,
  monitor: Monitor,
  file: File,
  terminal: Terminal,
  "arrow-right": ArrowRight,
  "arrow-left": ArrowLeft,
  "arrow-up": ArrowUp,
  "arrow-down": ArrowDown,
  network: Network,
} as const;

export const techLogoRegistry = {
  javascript: siJavascript,
  typescript: siTypescript,
  react: siReact,
  node: siNodedotjs,
  docker: siDocker,
  kubernetes: siKubernetes,
  github: siGithub,
} as const;

export const awsServiceRegistry = {
  iam: {label: "IAM", file: "iam.svg"},
  ec2: {label: "EC2", file: "ec2.svg"},
  vpc: {label: "VPC", file: "vpc.svg"},
  s3: {label: "S3", file: "s3.svg"},
  rds: {label: "RDS", file: "rds.svg"},
  "route-53": {label: "Route 53", file: "route-53.svg"},
  "elastic-load-balancing": {label: "Elastic Load Balancing", file: "elastic-load-balancing.svg"},
  "auto-scaling": {label: "Auto Scaling", file: "auto-scaling.svg"},
  cloudwatch: {label: "CloudWatch", file: "cloudwatch.svg"},
  ecr: {label: "ECR", file: "ecr.svg"},
  eks: {label: "EKS", file: "eks.svg"},
  cloudfront: {label: "CloudFront", file: "cloudfront.svg"},
} as const;

export type TechIconName = keyof typeof techIconRegistry;
export type TechLogoName = keyof typeof techLogoRegistry;
export type AwsServiceName = keyof typeof awsServiceRegistry;

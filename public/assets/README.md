# Render assets

Keep every asset required during a Remotion render in this directory. Load files with `staticFile()`, for example `staticFile("assets/aws/ec2.svg")`; do not fetch runtime assets from remote APIs because network availability and remote revisions make renders non-deterministic.

## Organization

- `aws/`: Official AWS Architecture Icons used by `AwsServiceIcon`.
- `fonts/`: Self-hosted WOFF2 fonts loaded through `@remotion/fonts`.

Create additional folders only when real assets are added. Recommended future groups are `logos/`, `backgrounds/`, `illustrations/`, `audio/`, and `sound-effects/`.

## Formats and naming

- Prefer optimized SVG for vector icons and diagrams.
- Prefer WebP, AVIF, or optimized PNG for raster artwork.
- Prefer WOFF2 for fonts, WAV for short production audio, and high-quality MP3/AAC for longer audio.
- Use descriptive lowercase kebab-case filenames. Keep service names aligned with the typed registries in `src/design-system/icons/registry.ts`.

Optimize SVGs without removing required view boxes or AWS artwork. Strip unnecessary raster metadata, resize images to realistic render dimensions, and test transparent assets against the actual scene background.

## Sources and attribution

| Assets | Source | Version/date | Purpose |
| --- | --- | --- | --- |
| `aws/*.svg` | [AWS Architecture Icons](https://aws.amazon.com/architecture/icons/) | Icon package `07312026`, released July 31, 2026 | IAM, EC2, VPC, S3, RDS, Route 53, Elastic Load Balancing, Auto Scaling, CloudWatch, ECR, EKS, and CloudFront diagrams |
| `fonts/InterVariable.woff2` | [Inter official repository](https://github.com/rsms/inter) | File retrieved August 16, 2026; embedded font version 4.066 | Interface, titles, labels, and explanatory copy |
| `fonts/JetBrainsMono-Variable.woff2` | [JetBrains Mono official repository](https://github.com/JetBrains/JetBrainsMono) | File retrieved August 16, 2026; embedded font version 2.304 | Code and terminal content |

Inter and JetBrains Mono are distributed under the SIL Open Font License 1.1. AWS trademarks and architecture artwork remain subject to the AWS Architecture Icons asset guidelines. Record the source, retrieval date, license, and exact purpose here whenever adding an external asset.

const fs = require('fs');
const path = 'c:/Users/harim/Desktop/MrV/ele/portfolio/my-portfolio/src/portfolio-v2_1.jsx';
let c = fs.readFileSync(path, 'utf8');

c = c.replace(/tag="06 - AI Deep Dive"/g, 'tag="05 — AI Deep Dive"');
c = c.replace(/tag="09 - Certifications"/g, 'tag="06 — Certifications"');
c = c.replace(/tag="07 - Journey"/g, 'tag="07 — Journey"');
c = c.replace(/tag="08 - Analytics"/g, 'tag="08 — Analytics"');
c = c.replace(/tag="10 - Contact"/g, 'tag="09 — Contact"');

// Remove from App
c = c.replace(/<MetricsDashboard \/>\s*\r?\n/g, '');

// Remove METRICS
c = c.replace(/const METRICS = \[\s*[\s\S]*?\];\s*\r?\n/g, '');

// Remove MetricGauge (it ends with <\/Reveal> followed by \) and } )
c = c.replace(/function MetricGauge[\s\S]*?<\/Reveal>\s*\r?\n  \);\s*\r?\n\}\s*\r?\n/g, '');

// Remove MetricsDashboard component
c = c.replace(/function MetricsDashboard[\s\S]*?<\/section>\s*\r?\n  \);\s*\r?\n\}\s*\r?\n/g, '');

// Also remove the "AI METRICS DASHBOARD" comment block
c = c.replace(/\/\* [═]+\s*\r?\n\s*AI METRICS DASHBOARD\s*\r?\n[═]+ \*\/\s*\r?\n/g, '');

fs.writeFileSync(path, c, 'utf8');
console.log('Fixed!');

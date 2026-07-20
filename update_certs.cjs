const fs = require('fs');
const path = 'c:/Users/harim/Desktop/MrV/ele/portfolio/my-portfolio/src/portfolio-v2_1.jsx';
let c = fs.readFileSync(path, 'utf8');

// 1. Add imports at the top
const imports = `import certImg1 from "./Src/ML_Cousera.png";
import certImg2 from "./Src/AI_Google.png";
import certImg3 from "./Src/AI_IBM.png";
import certImg4 from "./Src/Python_DS.png";
import certImg5 from "./Src/Flutter_Capstone.png";
import certImg6 from "./Src/ML_Internship.png";
import certImg7 from "./Src/Venura_Intern.png";
`;
c = c.replace(/import \{ useState/, imports + 'import { useState');

// 2. Add img property to PDF_CERTIFICATES
c = c.replace(/file: "\/pdfs\/Microsoft_AI_ML_cert\.pdf", color: "#06b6d4", icon: "[^"]+" \}/g, 'file: "/pdfs/Microsoft_AI_ML_cert.pdf", color: "#06b6d4", icon: "🧠", img: certImg1 }');
c = c.replace(/file: "\/pdfs\/Google_AI_fund\.pdf", color: "#8b5cf6", icon: "[^"]+" \}/g, 'file: "/pdfs/Google_AI_fund.pdf", color: "#8b5cf6", icon: "🌐", img: certImg2 }');
c = c.replace(/file: "\/pdfs\/IBMDesign20260719-8-kndgqc\.pdf", color: "#10b981", icon: "[^"]+" \}/g, 'file: "/pdfs/IBMDesign20260719-8-kndgqc.pdf", color: "#10b981", icon: "⚙️", img: certImg3 }');
c = c.replace(/file: "\/pdfs\/IBMDesign20260719-8-mrbuto\.pdf", color: "#f59e0b", icon: "[^"]+" \}/g, 'file: "/pdfs/IBMDesign20260719-8-mrbuto.pdf", color: "#f59e0b", icon: "🤖", img: certImg4 }');
c = c.replace(/file: "\/pdfs\/Flutter_Capstone_cert\.pdf", color: "#f43f5e", icon: "[^"]+" \}/g, 'file: "/pdfs/Flutter_Capstone_cert.pdf", color: "#f43f5e", icon: "📱", img: certImg5 }');
c = c.replace(/file: "\/pdfs\/AICTE B7 PD Certificate-632\.pdf", color: "#06b6d4", icon: "[^"]+" \}/g, 'file: "/pdfs/AICTE B7 PD Certificate-632.pdf", color: "#06b6d4", icon: "🎓", img: certImg6 }');
c = c.replace(/file: "\/pdfs\/Internship Certificate\.pdf", color: "#10b981", icon: "[^"]+" \}/g, 'file: "/pdfs/Internship Certificate.pdf", color: "#10b981", icon: "💼", img: certImg7 }');

// 3. Update rendering in PDFStack
const oldCardRegex = /<div style=\{\{ fontSize: 54, marginBottom: 16, filter: isHovered \? `drop-shadow[^<]+<\/div>\s*<div style=\{\{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, color: "#f1f5f9", textAlign: "center", marginBottom: 8, lineHeight: 1\.3 \}\}>\s*\{pdf\.title\}\s*<\/div>/g;

const newCard = `<div style={{ width: "100%", height: 140, marginBottom: 16, borderRadius: 8, overflow: "hidden", border: \`1px solid rgba(255,255,255,0.1)\`, position: "relative", background: "rgba(0,0,0,0.3)" }}>
  {pdf.img ? (
    <img src={pdf.img} alt={pdf.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: isHovered ? 1 : 0.7, transition: "all 0.3s", transform: isHovered ? "scale(1.05)" : "scale(1)" }} />
  ) : (
    <div style={{ fontSize: 54, display: "flex", alignItems: "center", justifyContent: "center", height: "100%", filter: isHovered ? \`drop-shadow(0 0 15px \${pdf.color}80)\` : "none", transition: "all 0.3s" }}>{pdf.icon}</div>
  )}
</div>
<div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: "#f1f5f9", textAlign: "center", marginBottom: 6, lineHeight: 1.3 }}>
  {pdf.title}
</div>`;

c = c.replace(oldCardRegex, newCard);

fs.writeFileSync(path, c, 'utf8');
console.log('Script completed');

const fs = require('fs');
let content = fs.readFileSync('src/app/components/resume-preview.ts', 'utf8');

let lines = content.split('\n');

let classIdx = lines.findIndex(l => l.includes('export class ResumePreviewComponent'));

let lastCaseIdx = -1;
for (let i = classIdx; i >= 0; i--) {
   if (lines[i].includes('@case (')) {
      lastCaseIdx = i;
      break;
   }
}

let caseCloseIdx = -1;
for (let i = classIdx - 1; i > lastCaseIdx; i--) {
   if (lines[i].trim() === '}') {
      caseCloseIdx = i;
      break;
   }
}

// target line 924
if (lines[923].includes('</div>')) {
   lines[923] = lines[923].replace('</div>', '');
}
// target line 1156, 1158
if (lines[1155] && lines[1155].includes('</div>')) lines[1155] = lines[1155].replace('</div>', '');
if (lines[1157] && lines[1157].includes('</div>')) lines[1157] = lines[1157].replace('</div>', '');

let outLines = lines.slice(0, caseCloseIdx + 1);
outLines.push('        }');
outLines.push('      </div>');
outLines.push('    </div>');
outLines.push('  `');
outLines.push('})');
outLines = outLines.concat(lines.slice(classIdx));

fs.writeFileSync('src/app/components/resume-preview.ts', outLines.join('\n'));

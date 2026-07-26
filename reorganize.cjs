const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const componentsDir = path.join(srcDir, 'components');
const pagesDir = path.join(srcDir, 'pages');

const hostAgencyComponentsDir = path.join(componentsDir, 'host-agency');
const diamondAgencyComponentsDir = path.join(componentsDir, 'diamond-agency');
const commonComponentsDir = path.join(componentsDir, 'common');

const hostAgencyPagesDir = path.join(pagesDir, 'host-agency');
const diamondAgencyPagesDir = path.join(pagesDir, 'diamond-agency');
const commonPagesDir = path.join(pagesDir, 'common');

// Create directories
[
  hostAgencyComponentsDir, diamondAgencyComponentsDir, commonComponentsDir,
  hostAgencyPagesDir, diamondAgencyPagesDir, commonPagesDir
].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Helper to move file and log
const moveFile = (oldPath, newPath) => {
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Moved ${path.basename(oldPath)} to ${newPath}`);
  }
};

// 1. Move Components
const components = fs.readdirSync(componentsDir).filter(f => f.endsWith('.jsx'));
const componentMap = {}; // old name -> new relative path from componentsDir

components.forEach(comp => {
  if (comp.startsWith('Agency')) {
    moveFile(path.join(componentsDir, comp), path.join(hostAgencyComponentsDir, comp));
    componentMap[comp] = `host-agency/${comp}`;
  } else if (comp.startsWith('DiamondAgency')) {
    moveFile(path.join(componentsDir, comp), path.join(diamondAgencyComponentsDir, comp));
    componentMap[comp] = `diamond-agency/${comp}`;
  } else {
    moveFile(path.join(componentsDir, comp), path.join(commonComponentsDir, comp));
    componentMap[comp] = `common/${comp}`;
  }
});

// 2. Move Pages
const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));
const pageMap = {}; // old name -> new relative path from pagesDir

pages.forEach(page => {
  if (page === 'AgencyPage.jsx') {
    moveFile(path.join(pagesDir, page), path.join(hostAgencyPagesDir, page));
    pageMap[page] = `host-agency/${page}`;
  } else if (page === 'DiamondAgencyPage.jsx') {
    moveFile(path.join(pagesDir, page), path.join(diamondAgencyPagesDir, page));
    pageMap[page] = `diamond-agency/${page}`;
  } else {
    moveFile(path.join(pagesDir, page), path.join(commonPagesDir, page));
    pageMap[page] = `common/${page}`;
  }
});

// 3. Update App.jsx imports
const appPath = path.join(srcDir, 'App.jsx');
if (fs.existsSync(appPath)) {
  let appContent = fs.readFileSync(appPath, 'utf8');
  Object.keys(pageMap).forEach(page => {
    const pageName = page.replace('.jsx', '');
    const oldImport = new RegExp(`'\\.\\/pages\\/${pageName}'`, 'g');
    appContent = appContent.replace(oldImport, `'./pages/${pageMap[page].replace('.jsx', '')}'`);
  });
  fs.writeFileSync(appPath, appContent);
  console.log('Updated App.jsx');
}

// 4. Update imports in pages
const updatePageImports = (pageFile, newSubdir) => {
  const fullPath = path.join(pagesDir, newSubdir, pageFile);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  Object.keys(componentMap).forEach(comp => {
    const compName = comp.replace('.jsx', '');
    const oldImport = new RegExp(`'\\.\\.\\/components\\/${compName}'`, 'g');
    // Since page is now in pages/subdir, it needs to go up two levels to reach components
    content = content.replace(oldImport, `'../../components/${componentMap[comp].replace('.jsx', '')}'`);
  });
  
  fs.writeFileSync(fullPath, content);
  console.log(`Updated imports in ${pageFile}`);
};

Object.keys(pageMap).forEach(page => {
  updatePageImports(page, path.dirname(pageMap[page]));
});

// 5. Update imports in components if they import other components
const updateComponentImports = (compFile, newSubdir) => {
  const fullPath = path.join(componentsDir, newSubdir, compFile);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let changed = false;
  
  Object.keys(componentMap).forEach(comp => {
    const compName = comp.replace('.jsx', '');
    // Components were in the same dir, so import was './CompName'
    const oldImport = new RegExp(`'\\.\\/${compName}'`, 'g');
    const newPath = `../${componentMap[comp].replace('.jsx', '')}`;
    if (oldImport.test(content)) {
       content = content.replace(oldImport, `'${newPath}'`);
       changed = true;
    }
  });
  
  if (changed) {
    fs.writeFileSync(fullPath, content);
    console.log(`Updated imports in ${compFile}`);
  }
};

Object.keys(componentMap).forEach(comp => {
  updateComponentImports(comp, path.dirname(componentMap[comp]));
});

console.log('Reorganization complete!');

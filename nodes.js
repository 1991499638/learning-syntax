const fs = require('fs');
const path = require('path');

const folderPath = './src/pages/docs'; // 指定文件夹路径
const outPath = './src/routes';

const navigation = []; // 存储导航数据的数组

function readFilesInFolder(folderPath) {
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile() && path.extname(file) === '.md') {
      const fileName = path.basename(file, '.md');
      const fileHref = '/docs/' + fileName;

      navigation.push({
        title: fileName,
        href: fileHref,
      });
    } else if (stats.isDirectory()) {
      readFilesInFolder(filePath); // 递归遍历子文件夹
    }
  });
}

readFilesInFolder(folderPath);

console.log('export const navigation =', JSON.stringify(navigation, null, 2));
// 将数据写入指定的 JSON 文件中  
const jsonFilePath = path.join(outPath, 'links.json');  
fs.writeFileSync(jsonFilePath, JSON.stringify(navigation, null, 2));  
const fs = require('fs');
const path = require('path');

const folderPath = '/path/to/folder'; // 指定文件夹路径

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

import fs from 'fs';

try {
  const data = fs.readFileSync('perfumes.csv', 'utf-8');
  const rows = data.split('\n').filter((row) => row.trim() !== '');

  const headers = rows[0].split(';').map((h) => h.trim().replace(/^"|"$/g, ''));

  const json = rows
    .slice(1)
    .map((row, rowIndex) => {
      const values = row.split(';');

      if (values.length < headers.length) return null;

      const obj = { id: rowIndex };

      headers.forEach((header, i) => {
        let val = values[i] ? values[i].replace(/^"|"$/g, '').trim() : '';

        const isNoteOrAccord = ['Top', 'Middle', 'Base', 'mainaccord'].some((word) =>
          header.includes(word),
        );

        const isTitleOrBrand = ['Perfume', 'Brand'].some((word) => header.includes(word));

        if (isNoteOrAccord) {
          obj[header] = val
            ? val
                .replaceAll('-', ' ')
                .split(',')
                .map((n) => n.trim())
            : [];
        } else if (isTitleOrBrand) {
          obj[header] = val
            ? val
                .split(/[_\s\-]+/)
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ')
                .replace(/\s+/g, ' ') // Убираем двойные пробелы
                .trim()
            : [];
        } else {
          obj[header] = val;
        }
      });
      return obj;
    })
    .filter(Boolean);

  if (!fs.existsSync('./src/data')) {
    fs.mkdirSync('./src/data', { recursive: true });
  }

  fs.writeFileSync('./src/data/perfumes.json', JSON.stringify(json, null, 2));

  console.log(`✅ Успех! Создан файл с ${json.length} ароматами.`);
  console.log(`Пример объекта:`, json[0]);
} catch (err) {
  console.error('❌ Ошибка конвертации:', err.message);
}

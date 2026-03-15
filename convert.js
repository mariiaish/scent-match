import fs from 'fs';

try {
    // Читаем файл (убедись, что файл называется именно perfumes.csv)
    const data = fs.readFileSync('perfumes.csv', 'utf-8');
    const rows = data.split('\n').filter(row => row.trim() !== '');
    
    // Заголовки (теперь делим по ;)
    const headers = rows[0].split(';').map(h => h.trim().replace(/^"|"$/g, ''));

    const json = rows.slice(1).map((row, rowIndex) => {
        // Делим строку по точке с запятой
        const values = row.split(';');
        
        // Если колонок меньше, чем заголовков, пропускаем строку
        if (values.length < headers.length) return null;

        const obj = { id: rowIndex }; // Добавим ID для React ключей
        
        headers.forEach((header, i) => {
            let val = values[i] ? values[i].replace(/^"|"$/g, '').trim() : "";

            // Превращаем ноты и аккорды в массивы (если они не пустые)
            const isNoteOrAccord = ['Top', 'Middle', 'Base', 'mainaccord'].some(word => header.includes(word));
            
            if (isNoteOrAccord) {
                // Если в ячейке несколько нот через запятую, делим их
                obj[header] = val ? val.split(',').map(n => n.trim()) : [];
            } else {
                obj[header] = val;
            }
        });
        return obj;
    }).filter(Boolean);

    // Создаем папку, если её нет
    if (!fs.existsSync('./src/data')) {
        fs.mkdirSync('./src/data', { recursive: true });
    }

    fs.writeFileSync('./src/data/perfumes.json', JSON.stringify(json, null, 2));
    
    console.log(`✅ Успех! Создан файл с ${json.length} ароматами.`);
    console.log(`Пример объекта:`, json[0]);

} catch (err) {
    console.error('❌ Ошибка конвертации:', err.message);
}

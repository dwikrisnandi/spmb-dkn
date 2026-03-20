import fs from 'fs';

const PATH = 'prisma/schema.prisma';
let schema = fs.readFileSync(PATH, 'utf-8');

function toSnakeCase(str) {
    if (str === 'isBanned') return 'is_Banned'; // Special case from previous check
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

const lines = schema.split('\n');
let inModel = false;

const newLines = lines.map(line => {
    if (line.startsWith('model ')) {
        inModel = true;
        return line;
    }
    if (line.startsWith('}')) {
        inModel = false;
        return line;
    }

    if (inModel) {
        // match field definition: whitespace, fieldName, whitespace, type, etc.
        const match = line.match(/^(\s+)([a-zA-Z0-9_]+)(\s+.+)$/);
        if (match) {
            const spaces = match[1];
            const fieldName = match[2];
            const rest = match[3];

            // If it's a relation field definition (e.g. user User), it doesn't need @map at the database column level, 
            // the database column is usually `userId BigInt`. Wait! 
            // If the type is another Model (starts with uppercase and is not String, Int, Boolean, DateTime, BigInt, Float, Bytes, Decimal, Json), it's a relation property, no @map needed!
            const typeMatch = rest.match(/^\s*([A-Za-z]+)(\[\]|\?)?/);
            const isRelationType = typeMatch && !['String', 'Int', 'Boolean', 'DateTime', 'BigInt', 'Float', 'Bytes', 'Decimal', 'Json'].includes(typeMatch[1]);

            if (!isRelationType && /[a-z][A-Z]/.test(fieldName)) {
                // It is camelCase!
                // Don't add if already has @map
                if (!rest.includes('@map(') && !line.includes('@@map')) {
                    const mappedName = toSnakeCase(fieldName);
                    return `${spaces}${fieldName}${rest} @map("${mappedName}")`;
                }
            }
        }
    }
    return line;
});

fs.writeFileSync(PATH, newLines.join('\n'), 'utf-8');
console.log('Schema updated successfully');

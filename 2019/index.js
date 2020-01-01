const num = process.argv[2];

// https://v8.dev/features/dynamic-import
import(`./day${num}/day${num}.js`);
// This file helps prevent caching by including a build timestamp
export const BUILD_TIMESTAMP = new Date().toISOString();
console.log("🔄 Build created at:", BUILD_TIMESTAMP);

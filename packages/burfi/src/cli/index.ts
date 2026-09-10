#!/usr/bin/env bun

const command = process.argv[2];

if (command === "dev") {
  console.log("Starting Burfi development server...");

  // await import("../server.ts")
  await import("../server.js");
} else {
  console.log(`
Burfi CLI

Commands:
  burfi dev
`);
}

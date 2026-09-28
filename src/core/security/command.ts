const BLOCKED_COMMANDS = [
  "format ",
  "format.com",
  "del /s",
  "rd /s",
  "rmdir /s",
  "shutdown",
  "diskpart",
  "reg delete",
];

export function validateCommand(command: string): {
  allowed: boolean;
  reason?: string;
} {
  const normalized = command.trim().toLowerCase();

  for (const blocked of BLOCKED_COMMANDS) {
    if (normalized.includes(blocked)) {
      return {
        allowed: false,
        reason: `Command contains blocked operation: ${blocked}`,
      };
    }
  }

  return {
    allowed: true,
  };
}
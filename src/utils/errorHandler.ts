import { logHandler } from "./logHandler";

/**
 * Standard error handling module to pipe errors to a webhook and
 * format the error for logging.
 *
 * @param {string} context A description of where the error occurred.
 * @param {any} error The error object.
 * @param {boolean} send Whether to send the error to the webhook.
 */
export const errorHandler = (
  context: string,
  error: unknown,
  send?: boolean
): void => {
  const err = error as Error;
  logHandler.log("error", `There was an error in the ${context}:`);
  logHandler.log(
    "error",
    JSON.stringify({ errorMessage: err.message, errorStack: err.stack })
  );
  if (send && process.env.DEBUG_HOOK) {
    fetch(process.env.DEBUG_HOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `There was an error in the ${context}:\n\`\`\`json\n${JSON.stringify(
          { errorMessage: err.message, errorStack: err.stack }
        )}\`\`\``,
      }),
    });
  }
};

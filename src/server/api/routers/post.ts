import {
  Client,
  executeRuntimeScript,
  setupAnonBrowserWithContext,
} from "@anon/sdk-typescript";
import { TRPCError } from "@trpc/server";
import { chromium } from "playwright";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const account = {
  app: "linkedin",
  userId: "user_2kazokpLzUmrRuviSSzGJ07reme",
};

const client = new Client({
  environment: "prod",
  apiKey: env.ANON_API_KEY,
});

async function anon() {
  console.log(
    `Requesting ${account.app} session for appUserId ${account.userId}`,
  );

  const { browserContext } = await setupAnonBrowserWithContext(
    client,
    account,
    { type: "managed", input: { proxy: { isAnonProxyEnabled: true } } },
  );

  await executeRuntimeScript({
    client,
    account,
    target: { browserContext: browserContext },
    initialUrl: "https://linkedin.com",
    run: async (page) => {
      await page.mainFrame().waitForLoadState();
      await page.waitForTimeout(10000);

      const content = await page.content();
      console.log("Page content:", content);
    },
  });
}

export async function dummyFunc() {
  const browser = await chromium.connectOverCDP("whatever");

  return browser;
}

export const postRouter = createTRPCRouter({
  anon: publicProcedure.mutation(async () => {
    try {
      await anon();
    } catch (error) {
      console.error("Error in anon mutation:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to execute anonymous LinkedIn operation",
        cause: error,
      });
    }
  }),
});

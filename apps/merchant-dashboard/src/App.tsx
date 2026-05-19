// Mounts the behavioral commerce recovery pipeline.

import { useEffect, useState } from "react";

import type { RecoveryOpportunity } from "./features/recovery/domain/recovery-opportunity.types";

import { RecoveryOpportunityFeed } from "./features/recovery/components/RecoveryOpportunityFeed";

import {
  bootstrapDemoPipeline,
  simulateShopifySession,
} from "./features/shared/demo-pipeline";

export default function App() {
  const [opportunities, setOpportunities] = useState<
    RecoveryOpportunity[]
  >([]);

  useEffect(() => {
    bootstrapDemoPipeline();

    const results = simulateShopifySession();

    setOpportunities(results);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0B1020",
        color: "#FFFFFF",
        padding: "48px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <section
        style={{
          marginBottom: "48px",
        }}
      >
        <p
          style={{
            color: "#7B61FF",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          PhantomBotAI
        </p>

        <h1
          style={{
            fontSize: "48px",
            marginBottom: "12px",
          }}
        >
          AI Revenue Recovery Agent
        </h1>

        <p
          style={{
            maxWidth: "700px",
            color: "#A1A1AA",
            lineHeight: 1.6,
          }}
        >
          Shopper behavior → behavioral intelligence → recovery
          opportunity → workflow orchestration → recovered revenue.
        </p>
      </section>

      <RecoveryOpportunityFeed
        opportunities={opportunities}
      />
    </main>
  );
}
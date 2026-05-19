// Merchant-facing recovery opportunity feed driven by behavioral signals.

import type { RecoveryOpportunity } from "../domain/recovery-opportunity.types";

type Props = {
  opportunities: RecoveryOpportunity[];
};

export function RecoveryOpportunityFeed({
  opportunities,
}: Props) {
  if (opportunities.length === 0) {
    return (
      <section>
        <h2>No active recovery opportunities.</h2>
      </section>
    );
  }

  return (
    <section>
      <h2
        style={{
          marginBottom: "24px",
          fontSize: "28px",
        }}
      >
        Revenue Recovery Feed
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {opportunities.map((opportunity) => (
          <article
            key={opportunity.id}
            style={{
              background: "#111827",
              border: "1px solid #27272A",
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <h3
              style={{
                fontSize: "22px",
                marginBottom: "12px",
              }}
            >
              {opportunity.title}
            </h3>

            <p
              style={{
                color: "#A1A1AA",
                marginBottom: "16px",
              }}
            >
              {opportunity.description}
            </p>

            <div
              style={{
                display: "flex",
                gap: "16px",
                fontSize: "14px",
                color: "#7B61FF",
              }}
            >
              <span>
                Priority: {opportunity.priority}
              </span>

              <span>
                Status: {opportunity.status}
              </span>

              <span>
                Revenue At Risk: $
                {opportunity.estimatedRevenueAtRisk}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
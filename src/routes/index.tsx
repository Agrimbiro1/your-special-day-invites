import { createFileRoute } from "@tanstack/react-router";
import { WeddingApp } from "@/components/wedding/WeddingApp";

const title = "Aanya & Rohan · Wedding Invitation";
const description =
  "Join Aanya and Rohan in Jaipur on 6th December 2026 — events, venue, RSVP and blessings.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <WeddingApp />;
}

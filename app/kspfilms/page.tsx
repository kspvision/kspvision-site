import { pageMetadata } from "../page-metadata";
import FilmsPage from "./films-page";

export const metadata = pageMetadata("/kspfilms", "KSP Films | Music Video Production in Montréal", "Explore the KSP Films music video catalogue, from recent releases to earlier work. Direction, cinematography and post-production by KSP Vision.");

export default function Page() { return <FilmsPage />; }

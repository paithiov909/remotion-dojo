import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";

(async () => {
	// const { RemotionRoot } = await import('./Root');
	registerRoot(RemotionRoot);
})();

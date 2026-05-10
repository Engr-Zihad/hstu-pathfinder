export function typeText(
  fullText: string,
  setText: (text: string) => void,
  onComplete: () => void
): () => void {
  let i = 0;
  let cancelled = false;
  // Smoother, more "AI typing" feel — small chunks per frame, capped for long replies.
  const charsPerFrame = Math.min(6, Math.max(1, Math.floor(fullText.length / 400)));

  function frame() {
    if (cancelled) return;
    if (i < fullText.length) {
      i = Math.min(i + charsPerFrame, fullText.length);
      setText(fullText.slice(0, i));
      requestAnimationFrame(frame);
    } else {
      onComplete();
    }
  }

  requestAnimationFrame(frame);
  return () => { cancelled = true; };
}

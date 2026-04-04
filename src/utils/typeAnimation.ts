export function typeText(
  fullText: string,
  setText: (text: string) => void,
  onComplete: () => void
): () => void {
  let i = 0;
  let cancelled = false;
  const charsPerFrame = Math.max(2, Math.floor(fullText.length / 150));

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

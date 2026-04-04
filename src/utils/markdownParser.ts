export function parseMarkdown(text: string): string {
  let html = text
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_m, lang, code) => {
      const escaped = escapeHtml(code.trim());
      return `<div class="code-block-wrapper"><div class="code-header"><span class="code-lang">${lang || 'code'}</span><button class="code-copy-btn" onclick="navigator.clipboard.writeText(this.closest('.code-block-wrapper').querySelector('code').textContent).then(()=>{this.textContent='Copied!';setTimeout(()=>this.textContent='Copy',1500)})">Copy</button></div><pre class="code-block"><code>${escaped}</code></pre></div>`;
    })
    // Headers
    .replace(/^### (.+)$/gm, '<h4 class="md-h3">$1</h4>')
    .replace(/^## (.+)$/gm, '<h3 class="md-h2">$1</h3>')
    .replace(/^# (.+)$/gm, '<h2 class="md-h1">$1</h2>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr class="md-hr"/>')
    // Bold & italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="md-inline-code">$1</code>')
    // Links - YouTube special
    .replace(/\[([^\]]+)\]\((https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)[^\)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="md-yt-link">📺 $1</a>')
    // Regular links
    .replace(/\[([^\]]+)\]\(([^\)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="md-link">$1</a>')
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote class="md-blockquote">$1</blockquote>')
    // Unordered lists
    .replace(/^[\-\*] (.+)$/gm, '<li class="md-li">$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li class="md-oli">$1</li>')
    // Line breaks
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');

  // Wrap consecutive li items
  html = html.replace(/((?:<li class="md-li">.*?<\/li><br\/>?)+)/g, '<ul class="md-ul">$1</ul>');
  html = html.replace(/((?:<li class="md-oli">.*?<\/li><br\/>?)+)/g, '<ol class="md-ol">$1</ol>');
  // Clean up br inside lists
  html = html.replace(/<\/li><br\/?>/g, '</li>');

  return html;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

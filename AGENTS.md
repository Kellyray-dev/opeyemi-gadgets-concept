<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Business facts (phone, BN, WhatsApp link builder, Naira formatting) live in src/lib/business.ts and products in src/lib/catalog.ts — single source so pages never hardcode contact info or prices.
- Order basket lives in src/lib/cart.ts (client store + localStorage); checkout never sends data or takes payment — preview only, WhatsApp link opens on tap.
